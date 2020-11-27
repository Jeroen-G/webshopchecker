const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const baseUrl = 'https://jeroeng.dev/';
// const baseUrl = 'https://bakken.nl/';

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(baseUrl+'/robots.txt');
    const body = await page.evaluate(() => document.body.innerHTML);
    await browser.close();

    try {
        expect(body).to.contain('sitemap');
        console.log('yay');
    } catch (error) {
        console.log('meh');
    }
})();