import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  const svgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('svg')).map(svg => {
      return {
        outerHTML: svg.outerHTML,
        tabIndexProp: svg.tabIndex,
        hasTabIndexAttr: svg.hasAttribute('tabindex'),
        tabIndexAttrValue: svg.getAttribute('tabindex')
      };
    });
  });

  console.log(JSON.stringify(svgs, null, 2));

  await browser.close();
})();
