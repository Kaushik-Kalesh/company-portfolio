import os, json, boto3
from dotenv import load_dotenv
from botocore.config import Config

load_dotenv('server/.env')

s3 = boto3.client('s3',
    endpoint_url=f"https://{os.getenv('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com",
    aws_access_key_id=os.getenv('R2_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('R2_SECRET_ACCESS_KEY'),
    config=Config(signature_version='s3v4')
)
bucket = os.getenv('R2_BUCKET_NAME')

res = s3.get_object(Bucket=bucket, Key='content.json')
content = json.loads(res['Body'].read().decode('utf-8'))

if 'metaTitle' not in content:
    content['metaTitle'] = 'K2MS — Custom Software & Digital Marketing'
if 'metaDescription' not in content:
    content['metaDescription'] = 'K2MS builds custom software solutions and delivers digital marketing that scales your business. From CRMs to AI infrastructure — if you can dream it, we can build it.'
if 'metaOgTitle' not in content:
    content['metaOgTitle'] = 'K2MS — Custom Software & Digital Marketing'
if 'metaOgDescription' not in content:
    content['metaOgDescription'] = 'Custom software solutions & digital marketing that scale your business.'

s3.put_object(Bucket=bucket, Key='content.json', Body=json.dumps(content, indent=2), ContentType='application/json')
print('Updated R2 content.json successfully')
