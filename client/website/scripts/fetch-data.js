import fs from 'fs';
import path from 'path';

const API_URL = process.env.VITE_API_URL || 'http://127.0.0.1:5000';
const DATA_DIR = path.join(process.cwd(), '..', 'data');

async function downloadData() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  for (const file of ['content.json', 'portfolio.json']) {
    console.log(`Fetching ${file} from API...`);
    try {
      const res = await fetch(`${API_URL}/api/data/${file}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (file === 'content.json' && !data.companyName) data.companyName = "K2MS";
      fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
      console.log(`Saved ${file}`);
    } catch (e) {
      console.error(`Error fetching ${file}:`, e.message);
      console.log(`Using fallback local file if it exists...`);
    }
  }

  // Inject SEO tags into index.html for social bots that don't run JS
  try {
    const contentData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'content.json'), 'utf8'));
    const indexPath = path.join(process.cwd(), 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    
    if (contentData.metaTitle) {
      html = html.replace(/<title>.*?<\/title>/s, `<title>${contentData.metaTitle.replace(/"/g, '&quot;')}</title>`);
      html = html.replace(/<meta property="og:title" content=".*?"\s*\/>/is, `<meta property="og:title" content="${(contentData.metaOgTitle || contentData.metaTitle).replace(/"/g, '&quot;')}" />`);
    }
    if (contentData.metaDescription) {
      html = html.replace(/<meta name="description" content=".*?"\s*\/>/is, `<meta name="description" content="${contentData.metaDescription.replace(/"/g, '&quot;')}" />`);
    }
    if (contentData.metaOgDescription) {
      html = html.replace(/<meta property="og:description" content=".*?"\s*\/>/is, `<meta property="og:description" content="${contentData.metaOgDescription.replace(/"/g, '&quot;')}" />`);
    }
    
    fs.writeFileSync(indexPath, html);
    console.log("Injected SEO meta tags into index.html");
  } catch (e) {
    console.error("Failed to inject SEO tags into index.html:", e.message);
  }
}

downloadData();
