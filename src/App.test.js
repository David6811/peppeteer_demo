import puppeteer from 'puppeteer-core';

let browser;
let page;

const startApp = async () => {
  const { exec } = require('child_process');
  const appProcess = exec('npm start');
  await new Promise(resolve => setTimeout(resolve, 3000));
  return appProcess;
};

const InitBrowser = async () => {
  const appProcess = await startApp();
  browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,
    args: ['--no-sandbox', '--disable-gpu'],
    userDataDir: './tmp',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
}

const test = async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:3000/', { timeout: 1000 });

  const username = await page.$('#username');
  if (username) {
    await page.type('#username', 'example@email.com');
    console.log('Set value for the email input field.');
  } else {
    console.error('username input field not found.');
  }

  const usernameValue = await page.$eval('#username', (input) => input.value);
  console.log('username value:', username);

  const passwordInput = await page.$('#password');
  if (passwordInput) {
    await page.type('#password', '888888');
    console.log('Set value for the password input field.');
  } else {
    console.error('password input field not found.');
  }

  const LoginButton = await page.$('button[type="submit"]');

  if (LoginButton) {
    await LoginButton.click();
    console.log('Clicked on the "Login" button.');
  } else {
    console.error('Button not found.');
  }

  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);
}

beforeAll(async () => {
  await InitBrowser();
});

it('works with async', async () => {
  await test();
});

afterAll(async () => {
  await page.waitForTimeout(1000);
  const msgValue = await page.$eval('#msg', (label) => label.textContent);
  console.log('Msg value:', msgValue);

  await browser.close();
});