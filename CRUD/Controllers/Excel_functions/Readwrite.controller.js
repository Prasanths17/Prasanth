const ExcelJS = require('exceljs');
const xlsx = require ('xlsx');

module.exports.writeExcelFile = async(req,res) => {
    try{
        const jsonData = req.body;
        console.log(jsonData);
        const excelData = [];
        excelData.push(Object.keys(jsonData[0]));
        jsonData.map(items => excelData.push(Object.values(items)));
        console.log(excelData);
        const filePath = 'C:/Users/prasanth/Desktop/Prasanth/CRUD/test.xlsx';
        //await writeExcel(excelData,filePath);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        excelData.forEach(row => {
            worksheet.addRow(row);
        });

        await workbook.xlsx.writeFile(filePath);
        res.status(200).json({ message: 'Excel file written successfully', filePath });
    }catch(err){
        console.error('Error writing Excel file:', err);
        res.status(500).send(err);
    }
}

module.exports.readExcelFile = async (req,res) => {
    try{
        const filePath = 'C:/Users/prasanth/Desktop/Prasanth/CRUD/test.xlsx';
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
        const data = [];
        worksheet.eachRow(row => {
            data.push(row.values);
        });
        res.status(200).send(data);
    }catch(err){
        console.error('Error reading Excel file:' , err);
        res.status(500).send(err);
    }
}
// async function writeExcel(data, filePath) {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Sheet1');

//     data.forEach(row => {
//         worksheet.addRow(row);
//     });

//     await workbook.xlsx.writeFile(filePath);
// }

module.exports.xlsxWriteFile = async (req,res) => {
    try{
        const jsonData = req.body;
        console.log(jsonData); 
        const excelData = [];
        excelData.push(Object.keys(jsonData[0]));
        jsonData.map(items => excelData.push(Object.values(items)));
        console.log(excelData);
        const filePath = 'C:/Users/prasanth/Desktop/Prasanth/CRUD/test.xlsx';
        const worksheet = xlsx.utils.aoa_to_sheet(excelData);
        const workbook = xlsx.utils.book_new();
        await xlsx.utils.book_append_sheet(workbook,worksheet,'Sheet1');
        xlsx.writeFile(workbook,filePath);
        res.status(200).json({ message: 'Excel file written successfully', filePath });
    }catch(err){
        console.error('Error writing Excel file:', err);
        res.status(500).send(err);
    }
}

module.exports.xlsxReadFile = async (req,res) => {
    try{
        const filePath = 'C:/Users/prasanth/Desktop/Prasanth/CRUD/test.xlsx';
        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        res.status(200).json(data);
    }catch(err){
        console.error('Error writing Excel file:', err);
        res.status(500).send(err);
    }
}