const puppeteer = require('puppeteer');
const fs = require('fs-extra');

// (async function() {
//     try{
        
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();

//         await page.setContent('<h1>hello</h1>');
//         await page.emulateMediaType('screen');
//         await page.pdf({
//             path : 'mypdf.pdf',
//             format:'A4',
//             printBackground : true
//         });

//         console.log('done');
//         await browser.close();
//         process.exit();

//     }catch(err){
//         console.log(err);
//     }
// } )()

//const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Load HTML file
//   await page.goto('C:/Users/prasanth/Desktop/Prasanth/CRUD/output.html', { waitUntil: 'networkidle0' });

//   // Configure PDF options
//   const pdfOptions = {
//     path: 'output.pdf',
//     format: 'A4',
    
//   };

//   // Generate PDF with custom options
//   await page.pdf(pdfOptions);

//   await browser.close();
// })();



(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    
    await page.goto('C:/Users/prasanth/Desktop/HTML/starter/management.html' , { waitUntil: 'networkidle0' });

   
    await page.screenshot({ path: 'screenshot_1.png'});
    await page.pdf({ path: 'output_1.pdf' , format:'A4'});

    await browser.close();
})();
