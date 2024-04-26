const pdfkit = require('pdfkit');
const puppeteer = require('puppeteer');
const fs = require('fs');

const generatePDF = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('C:/Users/prasanth/Desktop/HTML/starter/management.html' , { waitUntil: 'networkidle0'})

    page.screenshot()
}