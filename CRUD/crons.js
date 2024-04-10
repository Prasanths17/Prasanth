const cron = require('node-cron');
const axios = require('axios');
const exceljs = require('exceljs');
const shell = require('shelljs');
const fs = require ('fs');
const moment = require('moment');
require('dotenv').config();
const mysql = require('mysql2/promise'); 
const nodemailer = require('nodemailer');


module.exports.task = cron.schedule('1 * * * * *' , async () => {
    try{
        const res = await axios.get('http://localhost:3000/employeeInfo/1');
        console.log("API called successfully :" , res.data)
    
    }catch(err){
        console.error(err.message);
    }
})

module.exports.crons_EXCEL_task = cron.schedule('*/10 * * * * *' , async () => {
    try{
        const userData = [
            {name: "Dheena" , Address : "Chidhambaram" , job_title : "Data Analyst" , salary : 40000},
            {name: "Arun" , Address : "Neyveli" , job_title : "Site Engineer" , salary : 25000},
            {name: "Vicky" , Address : "Tuticorin" , job_title : "Web Developer" , salary : 30000},
            {name: "Ragul" , Address : "chennai" , job_title : "Senior java developer" , salary : 40000},
        ]
        for(const user of userData){
            const res = await axios.post('http://localhost:3000/employeeInfo' , user);
            //console.log(res.body);
            console.log(`user ${user.name} details successfully inserted`);

            const workbook = new exceljs.Workbook();
            await workbook.xlsx.readFile('cron.xlsx');
            const worksheet =  workbook.getWorksheet('Sheet1');
            //const updatingUser = worksheet.eachRow(row => row.getCell(1).value === user.name);
            //console.log(updatingUser);

            let userExistsInExcel = false;
            worksheet.eachRow((row) => {
                if (row.getCell(1).value === user.name) {
                    userExistsInExcel = true;
                    return false; // Exit the loop if the user is found
                }
            });


            if(!userExistsInExcel){
                const newRow = worksheet.addRow([user.name,user.Address,user.job_title,user.salary]);
                console.log(`User ${user.name} is added to the excel`);
            }else{
                console.log(`User ${user.name} is already exist in excel`)
            }

            await workbook.xlsx.writeFile('cron.xlsx');
        }
        
    }catch(err){
        console.log(err.message);
    }
})


module.exports.db_backup_mysqldump = cron.schedule('1 * * * * *', function() {
    console.log('---------------------');
    console.log('Running Cron Job');
    
    const databaseName = process.env.DB_NAME; 
    const username = process.env.DB_USER; 
    const password = process.env.DB_PASSWORD; 
    
    if (!databaseName || !username || !password) {
      console.error('Database credentials not provided.Check .env');
      return;
    }
    
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss'); 
    
    const backupFileName = `data_dump_${timestamp}.sql`;
    
    const command = `"C:/Program Files/MySQL/MySQL Server 8.0/bin/mysqldump" -u ${username} -p${password} ${databaseName} > ${backupFileName}`; 
    
    const commandResult = shell.exec(command); 
    
    if (commandResult.code !== 0) {
      console.error(`Error occurred while backing up database: ${commandResult.stderr}`);
      return;
    }
    
    console.log(`Database backup complete. Backup file: ${backupFileName}`);
  });


module.exports.db_backup = cron.schedule('10 0 * * * *' , async () => {
    try{
        console.log("-------------------------------");
        console.log('Running the cron job');

        const databaseName = process.env.DB_NAME;
        const user_name = process.env.DB_USER;
        const password = process.env.DB_PASSWORD;

        if(!databaseName || !user_name || !password){
            console.error('The DATABASE credentials were not provided , pls check the .env file');
        }

        const timestamp = moment().format('YYYY-MM-DD-HH-mm-ss');

        const backupFileName = `data_dump_${timestamp}.sql`;

        const connection = await mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"Prasanths@2001",
            database: "CRUD"
          });
      
          
          const [tables] = await connection.query('SHOW TABLES');
          //console.log(tables);
          
          let sqlDump = '';
          for (const table of tables) {
            const tableName = table.Tables_in_crud;
            const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
            
           
            for (const row of rows) {
              sqlDump += `INSERT INTO ${tableName} VALUES (${Object.values(row).map(value => connection.escape(value)).join(', ')});\n`;
            }
          }
      
         
          fs.writeFileSync(backupFileName, sqlDump);
          
          console.log(`Database backup complete. Backup file: ${backupFileName}`);
          
          
          await connection.end();
    

    }catch(err){
        console.error(err);
    }
})

const sendEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prasanth1709001@gmail.com',
            pass: ''
        }
    })

    
    const mailOption = {
        from : 'prasanth1709001@gmail.com',
        to : 'prass1709001@gmail.com',
        subject : 'Scheduled mail',
        html :
            `<div>
                <h1>Hello all folks</h1>
                
                <table border=1 width="50%" height"50%" style=padding: 10px;">
                <caption>Your holiday details till mid year</caption>
                    <tr style="background-color: #78e5eb;">
                        <th>Months</th>
                        <th>Dates</th>
                    </tr>
                    <tr>
                        <td>Jan</td>
                        <td>2 , 5 ,26</td>
                    </tr>
                    <tr>
                        <td>Feb</td>
                        <td>5 , 9 ,23</td>
                    </tr>
                    <tr>
                        <td>Mar</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Apr</td>
                        <td>22 , 23</td>
                    </tr>
                    <tr>
                        <td>May</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td>Jun</td>
                        <td>-</td>
                    </tr>
                </table> 
            </div>`
            
            
            
    }

    try{
        await transporter.sendMail(mailOption);
        console.log("Mail successfully sended");
    }catch(err){
        console.error(`error in sending mail` , err);
    }
}

module.exports.autoMailSender = cron.schedule('1 * * * * *', async() => {
    sendEmail();
})


