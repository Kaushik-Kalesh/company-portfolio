import os
import json
import requests
from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import boto3
from botocore.config import Config
from werkzeug.utils import secure_filename
import time

load_dotenv()

app = Flask(__name__)
CORS(app)

# R2 Configuration
R2_ACCOUNT_ID = os.getenv('R2_ACCOUNT_ID')
R2_ACCESS_KEY_ID = os.getenv('R2_ACCESS_KEY_ID')
R2_SECRET_ACCESS_KEY = os.getenv('R2_SECRET_ACCESS_KEY')
R2_BUCKET_NAME = os.getenv('R2_BUCKET_NAME')
R2_PUBLIC_URL = os.getenv('R2_PUBLIC_URL') # e.g., https://pub-xxxx.r2.dev
VERCEL_WEBHOOK_URL = os.getenv('VERCEL_WEBHOOK_URL')

s3 = None
if R2_ACCOUNT_ID and R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY:
    s3 = boto3.client('s3',
        endpoint_url=f'https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com',
        aws_access_key_id=R2_ACCESS_KEY_ID,
        aws_secret_access_key=R2_SECRET_ACCESS_KEY,
        config=Config(signature_version='s3v4')
    )

def trigger_vercel():
    if VERCEL_WEBHOOK_URL:
        urls = VERCEL_WEBHOOK_URL.split(',')
        for url in urls:
            try:
                requests.post(url.strip(), timeout=5)
                print(f"Triggered Vercel rebuild for {url.strip()}")
            except Exception as e:
                print(f"Failed to trigger Vercel webhook {url.strip()}: {e}")

@app.route('/images/<path:filename>')
def serve_image(filename):
    if not s3:
        return jsonify({'error': 'R2 not configured'}), 500
    
    if R2_PUBLIC_URL:
        return redirect(f"{R2_PUBLIC_URL}/images/{filename}")
        
    try:
        response = s3.get_object(Bucket=R2_BUCKET_NAME, Key=f"images/{filename}")
        return response['Body'].read(), 200, {'Content-Type': response['ContentType']}
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/api/images', methods=['GET'])
def list_images():
    if not s3:
        return jsonify({'error': 'R2 not configured'}), 500
            
    try:
        response = s3.list_objects_v2(Bucket=R2_BUCKET_NAME, Prefix='images/')
        images = []
        if 'Contents' in response:
            for item in response['Contents']:
                if item['Key'] != 'images/':
                    images.append(item['Key'].replace('images/', ''))
        return jsonify({'images': images})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    if not s3:
        return jsonify({'error': 'R2 not configured'}), 500
        
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file:
        filename = secure_filename(file.filename)
        base, ext = os.path.splitext(filename)
        unique_filename = f"{base}_{int(time.time())}{ext}"
        
        try:
            s3.upload_fileobj(
                file,
                R2_BUCKET_NAME,
                f"images/{unique_filename}",
                ExtraArgs={'ContentType': file.content_type}
            )
            return jsonify({'success': True, 'filename': unique_filename})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/api/data/<filename>', methods=['GET'])
def get_data(filename):
    if filename not in ['content.json', 'portfolio.json']:
        return jsonify({'error': 'Invalid file'}), 400
        
    if not s3:
        return jsonify({'error': 'R2 not configured'}), 500
            
    try:
        response = s3.get_object(Bucket=R2_BUCKET_NAME, Key=filename)
        data = json.loads(response['Body'].read().decode('utf-8'))
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    data = request.json
    email = data.get('email')
    reason = data.get('reason')
    remarks = data.get('remarks')
    
    resend_api_key = os.getenv('RESEND_API_KEY')
    to_email = os.getenv('GMAIL_USER', 'kaushikkalesh@gmail.com')
    
    if not resend_api_key:
        return jsonify({'error': 'RESEND_API_KEY missing on server.'}), 500
        
    try:
        html_body = f"""
        <p><strong>From:</strong> {email}</p>
        <p><strong>Reason:</strong> {reason}</p>
        <p><strong>Remarks:</strong></p>
        <p style="white-space: pre-wrap;">{remarks}</p>
        """
        
        payload = {
            "from": "K2MS CRM <onboarding@resend.dev>",
            "to": [to_email],
            "reply_to": email,
            "subject": f"New K2MS Contact Request",
            "html": html_body
        }
        
        headers = {
            "Authorization": f"Bearer {resend_api_key}",
            "Content-Type": "application/json"
        }
        
        res = requests.post("https://api.resend.com/emails", json=payload, headers=headers)
        
        if res.ok:
            return jsonify({'success': True}), 200
        else:
            raise Exception(f"Resend API Error: {res.text}")
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/content', methods=['POST'])
def save_content():
    if not s3:
        return jsonify({'error': 'R2 not configured'}), 500
            
    try:
        data = json.dumps(request.json, indent=2)
        s3.put_object(Bucket=R2_BUCKET_NAME, Key='content.json', Body=data, ContentType='application/json')
        trigger_vercel()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/portfolio', methods=['POST'])
def save_portfolio():
    if not s3:
        return jsonify({'error': 'R2 not configured'}), 500
            
    try:
        data = json.dumps(request.json, indent=2)
        s3.put_object(Bucket=R2_BUCKET_NAME, Key='portfolio.json', Body=data, ContentType='application/json')
        trigger_vercel()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/save-all', methods=['POST'])
def save_all():
    if not s3:
        return jsonify({'error': 'R2 not configured'}), 500
            
    try:
        content_data = request.json.get('content')
        portfolio_data = request.json.get('portfolio')
        
        if content_data is not None:
            s3.put_object(Bucket=R2_BUCKET_NAME, Key='content.json', Body=json.dumps(content_data, indent=2), ContentType='application/json')
            
        if portfolio_data is not None:
            s3.put_object(Bucket=R2_BUCKET_NAME, Key='portfolio.json', Body=json.dumps(portfolio_data, indent=2), ContentType='application/json')
            
        trigger_vercel()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
