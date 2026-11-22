#!/usr/bin/env node

/**
 * Autonomous Gemini Pro Image Generation Bot for NESFIC-D-27 ShishuDrishti
 * Uses Chrome DevTools Protocol (CDP) & Puppeteer on port 9222
 * Google Pro Account: kalyanjit@gmail.com
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('/Users/kalyan/Downloads/2026/Sep2026/Data Centers and Way Head/node_modules/puppeteer-core');

const BASE_DIR = path.resolve(__dirname, '..');
const PROMPTS_FILE = path.join(BASE_DIR, 'scripts', 'image_prompts.json');
const ASSETS_DIR = path.join(BASE_DIR, 'assets', 'proposal_images');

const args = process.argv.slice(2);
let port = 9222;
let filterId = null;
let forceOverwrite = false;

args.forEach(arg => {
  if (arg.startsWith('--port=')) {
    port = parseInt(arg.replace('--port=', '').trim(), 10);
  } else if (arg.startsWith('--id=')) {
    filterId = arg.replace('--id=', '').trim();
  } else if (arg === '--force') {
    forceOverwrite = true;
  }
});

if (!fs.existsSync(PROMPTS_FILE)) {
  console.error(`❌ Error: Prompts file not found at ${PROMPTS_FILE}`);
  process.exit(1);
}

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const allPrompts = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
const queue = allPrompts.filter(item => {
  if (filterId && item.id !== filterId) return false;
  const targetJpg = path.join(ASSETS_DIR, item.filename);
  if (fs.existsSync(targetJpg) && !forceOverwrite && !filterId) {
    return false;
  }
  return true;
});

console.log('\n=============================================================');
console.log('🤖 SHISHUDRISHTI GEMINI PRO 16:9 INFOGRAPHIC BOT');
console.log('=============================================================');
console.log(`🔌 Target Chrome Port      : ${port}`);
console.log(`📁 Target Assets Directory : ${ASSETS_DIR}`);
console.log(`📋 Total Prompts in Queue  : ${queue.length} of ${allPrompts.length}`);
if (filterId) console.log(`🔍 Filter ID               : ${filterId}`);
console.log('=============================================================\n');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  let browser;
  try {
    console.log(`⏳ Connecting to Chrome on http://127.0.0.1:${port}...`);
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${port}`,
      defaultViewport: null
    });
    console.log(`✅ Connected successfully to Google Chrome (Google Pro Account)!`);
  } catch (err) {
    console.error(`\n❌ Could not connect to Google Chrome on port ${port}: ${err.message}`);
    process.exit(1);
  }

  const pages = await browser.pages();
  let geminiPage = pages.find(p => p.url().includes('gemini.google.com'));

  if (!geminiPage) {
    console.log(`🌐 Opening a new tab navigating to https://gemini.google.com/app...`);
    geminiPage = await browser.newPage();
    await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
  } else {
    console.log(`🌐 Found active Gemini tab: ${geminiPage.url()}`);
    await geminiPage.bringToFront();
  }

  console.log(`⏳ Verifying Gemini chat interface...`);
  await geminiPage.waitForSelector('rich-textarea, div[contenteditable="true"], textarea', { timeout: 30000 })
    .catch(() => console.log('⚠️ Ensure you are active in Gemini.'));

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const targetJpg = path.join(ASSETS_DIR, item.filename);
    const targetPng = path.join(ASSETS_DIR, item.filename.replace('.jpg', '.png'));

    console.log(`\n-------------------------------------------------------------`);
    console.log(`[${i + 1}/${queue.length}] 🎨 Generating Figure ${item.id.toUpperCase()}: ${item.title}`);
    console.log(`   📄 Output File : ${item.filename}`);
    console.log(`-------------------------------------------------------------`);

    let promptSent = false;
    let attempts = 0;

    while (attempts < 2 && !promptSent) {
      attempts++;
      try {
        await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
        await sleep(2500);
        await geminiPage.waitForSelector('rich-textarea, div[contenteditable="true"], textarea', { timeout: 20000 }).catch(() => {});

        // Record existing image URLs in DOM before sending prompt
        const existingImageUrls = await geminiPage.evaluate(() => {
          return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean);
        });

        const promptFull = `Generate a high-quality 16:9 widescreen technological architectural infographic image: ${item.prompt}`;

        await geminiPage.evaluate((text) => {
          const input = document.querySelector('rich-textarea p, rich-textarea div[contenteditable="true"], div[contenteditable="true"] p, div[contenteditable="true"], textarea');
          if (input) {
            input.focus();
            input.innerText = text;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, promptFull);

        await sleep(1000);

        const clicked = await geminiPage.evaluate(() => {
          const sendBtn = document.querySelector('button[aria-label="Send message"], button.send-button, mat-icon[data-mat-icon-name="send"]')?.closest('button');
          if (sendBtn && !sendBtn.disabled) {
            sendBtn.click();
            return true;
          }
          return false;
        });

        if (!clicked) {
          await geminiPage.keyboard.press('Enter');
        }

        console.log(`   📤 Prompt submitted. Waiting for Imagen 3 generation...`);
        promptSent = true;

        let imageBuffer = null;
        let waitAttempts = 0;

        while (!imageBuffer && waitAttempts < 35) {
          await sleep(3000);
          waitAttempts++;

          const newImageData = await geminiPage.evaluate((existingUrls) => {
            const allImages = Array.from(document.querySelectorAll('img'));
            const candidates = allImages.filter(img => 
              img.src && 
              !existingUrls.includes(img.src) &&
              (img.src.includes('googleusercontent.com') || img.src.startsWith('blob:') || img.src.startsWith('data:image')) &&
              img.naturalWidth > 350
            );

            if (candidates.length > 0) {
              const latest = candidates[candidates.length - 1];
              return { src: latest.src, width: latest.naturalWidth, height: latest.naturalHeight };
            }
            return null;
          }, existingImageUrls);

          if (newImageData) {
            console.log(`   🖼️ Image detected in chat (${newImageData.width}x${newImageData.height})! Extracting full-res canvas bytes...`);

            const base64Data = await geminiPage.evaluate((imgSrc) => {
              const img = Array.from(document.querySelectorAll('img')).find(i => i.src === imgSrc);
              if (!img || !img.complete || img.naturalWidth === 0) return null;
              try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                return dataUrl.split(',')[1];
              } catch (e) {
                return null;
              }
            }, newImageData.src);

            if (base64Data) {
              imageBuffer = Buffer.from(base64Data, 'base64');
            }
          }
        }

        if (imageBuffer) {
          fs.writeFileSync(targetJpg, imageBuffer);
          fs.writeFileSync(targetPng, imageBuffer);
          const stats = fs.statSync(targetJpg);
          console.log(`   ✅ Successfully saved: ${item.filename} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
          successCount++;
        } else {
          console.error(`   ⚠️ Timed out waiting for ${item.filename} (75s). Keeping current vector version.`);
          failureCount++;
        }

      } catch (err) {
        console.error(`   ⚠️ Error during processing: ${err.message}`);
        if (attempts >= 2) failureCount++;
      }
    }

    if (i < queue.length - 1) {
      console.log(`   ⏳ Cooling down 5s before next image prompt...`);
      await sleep(5000);
    }
  }

  console.log('\n=============================================================');
  console.log(`🎉 RUN COMPLETE: ${successCount} Generated, ${failureCount} Retained`);
  console.log('=============================================================\n');

  browser.disconnect();
}

main().catch(err => {
  console.error(`\n❌ Fatal Error: ${err.message}\n`);
  process.exit(1);
});
