import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5174/agoura', { waitUntil: 'networkidle0' });

  // Take a screenshot of the whole page
  await page.screenshot({ path: 'desktop_view.png', fullPage: true });

  // Get the link
  const linkStyles = await page.evaluate(() => {
    const link = document.querySelector('a[href="/menu"]');
    if (!link) return 'Link not found';
    
    // Fallback if multiple matching
    const links = Array.from(document.querySelectorAll('a[href="/menu"]'));
    const agouraLink = links.find(l => l.textContent.includes('View Menu')) || links[0];
    
    const cs = window.getComputedStyle(agouraLink);
    return {
      text: agouraLink.textContent,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      opacity: cs.opacity,
      visibility: cs.visibility,
      display: cs.display,
      class: agouraLink.className
    };
  });
  console.log("Desktop Link Style:", linkStyles);

  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:5174/agoura', { waitUntil: 'networkidle0' });
  const mobileLinkStyles = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href="/menu"]'));
    const agouraLink = links.find(l => l.textContent.includes('View Menu')) || links[0];
    if (!agouraLink) return null;
    const cs = window.getComputedStyle(agouraLink);
    return {
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      opacity: cs.opacity,
      visibility: cs.visibility,
      display: cs.display
    };
  });
  console.log("Mobile Link Style:", mobileLinkStyles);

  await browser.close();
})();
