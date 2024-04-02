const express = require('express');
const { writeExcelFile, readExcelFile, xlsxWriteFile, xlsxReadFile } = require('../Controllers/Excel_functions/Readwrite.controller');
const router = express.Router();

router.post('/write-excel' , writeExcelFile);
router.get('/read-excel' ,  readExcelFile);
router.post('/xlsxWrite-excel' , xlsxWriteFile);
router.get('/xlsxRead-excel' , xlsxReadFile);

module.exports = router;