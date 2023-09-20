const puppeteer = require("puppeteer");

const codeObj = require('./code');

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "sppjzzixqcqyzsuoyq@cwmxc.com";
const password = "?)SD9~]y>VzeV";
let page;
let browserOpen = puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null
})

browserOpen
.then((browserObj) => {
    browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
})
.then((newTab) => {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
})
.then(() => {
    let emailIsEntered = page.type(`input[id = "input-1"]`, email, {delay: 50})
    return emailIsEntered;
})
.then(() => {
    let passwordIsEntered = page.type(`input[id = "input-2"]`, password, {delay: 50})
    return passwordIsEntered;
})
.then(() => {
    let loginButtonClicked = page.click('button[data-analytics = "LoginPassword"]', {delay: 50})
    return loginButtonClicked;
})
.then(() => {
    let clickOnAlgoPromise = waitAndClick('div[data-automation = "algorithms"]', page);
    return clickOnAlgoPromise;
})
.then(() => {
    let getToWarmup = waitAndClick( 'input[value = "warmup"]', page);
    return getToWarmup;
})
.then(() => {
    let waitFor3Seconds = page.waitForTimeout(3000);
    return waitFor3Seconds;
})
.then(() => {
    let allChallengesPromise = page.$$('div.challenge-submit-btn', {delay: 50});
    return allChallengesPromise;
})
.then((questionsArr) => {
    let questionWillBeSolvedPromise = questionSolver(page, questionsArr[0], codeObj.answers[0]);
    return questionWillBeSolvedPromise;
})


function waitAndClick(selector, cPage){
    return new Promise((resolve, reject) => {
        let waitForModlePromise = cPage.waitForSelector(selector);
        waitForModlePromise.then(() => {
            let clickModle = cPage.click(selector);
            return clickModle;
        }).then(() => {
            resolve();
        }).catch((err) => {
            reject();
        })
    })
}

function questionSolver(page, question, answer){
    return new Promise((resolve, reject) => {
        let QuestionWillBeClickedPromise = question.click();
        QuestionWillBeClickedPromise.then(() => {
            let editorInFocusPromise = waitAndClick('.hr-monaco-editor-wrapper', page);
            return editorInFocusPromise;
        })
        .then(() => {
            return waitAndClick('input[class="checkbox-input"]', page);
        })
        .then(() => {
            return page.waitForSelector('#input-1', page);
        })
        .then(() => {
            return page.type('#input-1', answer, {delay: 10});
        })
        .then(() => {
            let ctrlIsPressedPromise = page.keyboard.down('Control');
            return ctrlIsPressedPromise;
        })
        .then(() => {
            let aIsPressedPromise = page.keyboard.press('A', {delay: 100});
            return aIsPressedPromise;
        })
        .then(() => {
            let xIsPressedPromise = page.keyboard.press('X', {delay: 100});
            return xIsPressedPromise;
        })
        .then(() => {
            let editorInFocusPromise = waitAndClick('.hr-monaco-editor-wrapper', page);
            return editorInFocusPromise;
        })
        .then(() => {
            let aIsPressedPromise = page.keyboard.press('A', {delay: 100});
            return aIsPressedPromise;
        })
        .then(() => {
            let vIsPressedPromise = page.keyboard.press('V', {delay: 100});
            return vIsPressedPromise;
        })
        .then(() => {
            let ctrlIsUnPressedPromise = page.keyboard.up('Control');
            return ctrlIsUnPressedPromise;
        })
        .then(() => {
            let submitIsClickedPromise = page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
            return submitIsClickedPromise;
        })
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject();
        })
    })
}