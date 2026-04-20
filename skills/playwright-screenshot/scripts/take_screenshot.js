const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // Use the pre-installed Playwright browsers in the cache if possible
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  
  try {
    console.log('Navigating to http://localhost:5173/services...');
    await page.goto('http://localhost:5173/services', { waitUntil: 'networkidle' });
    
    // Wait a bit more for animations
    await page.waitForTimeout(2000);
    
    const screenshotPath = path.join(process.cwd(), 'transfers', 'services-relaunch-preview.jpg');
    await page.screenshot({ path: screenshotPath, fullPage: true, type: 'jpeg' });
    console.log(`Screenshot saved to ${screenshotPath}`);
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();
