const puppeteer = require("puppeteer");

const codeObj = require('./code');

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "sppjzzixqcqyzsuoyq@cwmxc.com";
const password = "?)SD9~]y>VzeV";
let page;

(async () => {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            args: ["--start-maximized"],
            defaultViewport: null
        })
        let newTab = await browserInstance.newPage();
        await newTab.goto(loginLink);
        await newTab.type(`input[id = "input-1"]`, email, {delay: 50})
        await newTab.type(`input[id = "input-2"]`, password, {delay: 50})
        await newTab.click('button[data-analytics = "LoginPassword"]', {delay: 50});
        await waitAndClick('div[data-automation = "algorithms"]', newTab);
        await waitAndClick( 'input[value = "warmup"]', newTab);
        // await newTab.waitForTimeout(3000);
        let questionsArr = await newTab.$$('div.challenge-submit-btn', {delay: 50});
        await questionSolver(newTab, questionsArr[0], codeObj.answers[0]);
    } catch (error) {
        console.log(error);
    }
})();


async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector);
    let selectorClicked = await cPage.click(selector);
    return selectorClicked;
    // return new Promise((resolve, reject) => {
    //     let waitForModlePromise = cPage.waitForSelector(selector);
    //     waitForModlePromise.then(() => {
    //         let clickModle = cPage.click(selector);
    //         return clickModle;
    //     }).then(() => {
    //         resolve();
    //     }).catch((err) => {
    //         reject();
    //     })
    // })
}

async function questionSolver(page, question, answer){
    let questionClicked = await question.click();
    await waitAndClick('.hr-monaco-editor-wrapper', page);
    await waitAndClick('input[class="checkbox-input"]', page);
    await page.waitForSelector('#input-1', page);
    await page.type('#input-1', answer, {delay: 10});
    await page.keyboard.down('Control');
    await page.keyboard.press('A', {delay: 100});
    await page.keyboard.press('X', {delay: 100});
    await waitAndClick('.hr-monaco-editor-wrapper', page);
    await page.keyboard.press('A', {delay: 100});
    await page.keyboard.press('V', {delay: 100});
    await page.keyboard.up('Control');
    await page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
}