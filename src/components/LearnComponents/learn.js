const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://example.com');
  
  // Example: Scraping titles of articles
  const titles = await page.evaluate(() => {
    const titleElements = document.querySelectorAll('.article-title');
    const titles = [];
    titleElements.forEach(titleElement => {
      titles.push(titleElement.textContent);
    });
    return titles;
  });

  console.log(titles);

  await browser.close();
})();
