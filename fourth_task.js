const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = 'body > div.content > form.login-form > div:nth-child(2) > input';
const PASSWORD_SELECTOR = 'body > div.content > form.login-form > div:nth-child(3) > input';
const CTA_SELECTOR = 'body > div.content > form.login-form > div.form-actions > button';
const DATE_SELECTOR = '#dashboard-report-range';
const START_DATE = 'body > div.daterangepicker.dropdown-menu.opensleft.show-calendar > div.calendar.left > div:nth-child(1) > input';
const END_DATE = 'body > div.daterangepicker.dropdown-menu.opensleft.show-calendar > div.calendar.right > div:nth-child(1) > input';
const GET_DATA = '#drp_global > div > button.applyBtn.btn.btn-sm.btn-success';
const SELECT_ALL = '#DataTables_Table_0_length > label > select';

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7306298",
  password: "wJVNMgSBM7",
  database: "sql7306298"
});

con.connect(function(err) {
  if (err) throw err;    
});

async function startBrowser() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function send() {
  const {browser, page} = await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await page.goto(C.url);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
  await page.goto(C.data_url, {waitUntil: 'domcontentloaded'});
  await page.waitFor(2000);
  await page.select(SELECT_ALL,'-1');
  await page.waitFor(2000);
  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('tbody tr td'))
    return tds.map(td => td.innerHTML)
  });

  let a_data = data.slice(103)

  new_array = listToMatrix(a_data, 8)

  var sql = "INSERT INTO affluent (date, commision, sales, leads, clicks, epc, impressions, cr) VALUES ?";

  con.query(sql, [new_array], function(err) {
      if (err) throw err;
      console.log('Success');
      con.end();
  });
}

(async () => {
  await send();
})();

function listToMatrix(list, elementsPerSubArray) {
  var matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
          k++;
          matrix[k] = [];
      }
      if ((i+1) % 8 === 1){
        list[i] = list[i].substring(68,80);
      }

      matrix[k].push(list[i]);
  }

  return matrix;
}
