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
}

downloadData();
