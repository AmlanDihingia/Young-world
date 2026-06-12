const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log("Navigating to signup page...");
    await page.goto('http://localhost:3000/login?mode=signup', { waitUntil: 'networkidle2' });

    console.log("Step 1: Filling Details...");
    await page.type('input[name="full_name"]', 'Test User');
    await page.type('input[name="email"]', `testuser_${Date.now()}@example.com`);
    await page.type('input[name="password"]', 'password123');
    await page.type('input[name="mobile"]', '1234567890');
    await page.type('input[name="city"]', 'New York');
    await page.type('input[name="country"]', 'USA');
    await page.type('input[name="insta_url"]', 'https://instagram.com/testuser');

    console.log("Clicking Next Step...");
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const nextButton = buttons.find(b => b.textContent.includes('Next Step'));
        if (nextButton) nextButton.click();
    });

    // Wait for step 2 animation
    await new Promise(r => setTimeout(r, 1000));

    console.log("Step 2: Choosing Community...");
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const commButton = buttons.find(b => b.textContent.includes('Join as a Community'));
        if (commButton) commButton.click();
    });

    await new Promise(r => setTimeout(r, 1000));

    await page.type('input[name="community_type"]', 'Tech Club');
    await page.type('input[name="community_insta"]', 'https://instagram.com/techclub');
    await page.type('input[name="community_role"]', 'Founder');
    await page.type('textarea[name="story"]', 'We build cool stuff.');

    console.log("Clicking Next Step...");
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const nextButton = buttons.find(b => b.textContent.includes('Next Step'));
        if (nextButton) nextButton.click();
    });

    // Wait for step 3 animation
    await new Promise(r => setTimeout(r, 1000));

    console.log("Step 3: Completing Registration...");
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 15000 }).catch(e => console.log("Navigation timeout or error:", e.message)),
        page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const submitButton = buttons.find(b => b.textContent.includes('Complete Registration'));
            if (submitButton) submitButton.click();
        })
    ]);

    const finalUrl = page.url();
    console.log("Final URL after submission:", finalUrl);
    
    // Check if error
    const pageText = await page.evaluate(() => document.body.innerText);
    if (finalUrl.includes('error=')) {
        console.error("TEST FAILED. URL contains error.");
    } else if (finalUrl.includes('/dashboard')) {
        console.log("TEST SUCCESSFUL. Redirected to dashboard.");
    } else {
        console.log("Form submitted but landed on:", finalUrl);
    }

    await browser.close();
})();
