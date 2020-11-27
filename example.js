const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const checkers = [
  {
    name: "Sitemap",
    errorMessage: "er is geen sitemap",
    handle: function(baseUrl) {
        (async () => {
          const browser = await puppeteer.launch()
          const page = await browser.newPage()
          await page.goto(baseUrl+'/robots.txt');
          const body = await page.evaluate(() => document.body.innerHTML);
          await browser.close();

          expect(body).to.contain('sitemap');
          return true;
      })();
    }
  }
];

const baseUrl = 'https://jeroeng.dev/';
// const baseUrl = 'https://bakken.nl/';
checkers.forEach(checker => {
  console.log('Running checker: ' + checker.name);

  var promise = new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…

    if (/* everything turned out fine */) {
      resolve("Stuff worked!");
    }
    else {
      reject(Error("It broke"));
    }
  });

  await checker.handle(baseUrl)
  .then(console.log(checker.name+': OK'))
  .catch((error) => console.log(error));
});