const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/lop6/tieng-anh/reading-easy-grade3-p1');
  
  // wait for questions to load
  await page.waitForSelector('.re-option, .re-tf-btn');
  
  // click options to complete the quiz
  const options = await page.$$('.re-option, .re-tf-btn');
  for (const opt of options) {
    try {
      await opt.click();
    } catch (e) {}
  }
  
  // Submit
  await page.click('#btn-reading-submit-header');
  
  // wait for result
  await page.waitForSelector('.re-result');
  
  // check what is at x=500, y=30 (should be GlobalHeader)
  const elementHandles = await page.evaluate(() => {
    const el = document.elementFromPoint(window.innerWidth / 2, 30);
    return el ? el.outerHTML.substring(0, 150) : null;
  });
  console.log("Element at header:", elementHandles);
  
  // check all fixed/absolute elements with high z-index
  const blockers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*'))
      .filter(el => {
        const style = window.getComputedStyle(el);
        return (style.position === 'fixed' || style.position === 'absolute') && 
               parseInt(style.zIndex) >= 50 &&
               style.pointerEvents !== 'none';
      })
      .map(el => `${el.tagName}.${el.className} (z-index: ${window.getComputedStyle(el).zIndex})`);
  });
  console.log("Potential blockers:", blockers);
  
  await browser.close();
})();
