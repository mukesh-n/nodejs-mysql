const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'flipkart',
    port:3307
});

mysqlConnection.connect((err) =>{
    if(!err)
    console.log('DB connection succeded.');
    else
    console.log('DB connection failed \n Error: '+ JSON.stringify(err, undefined, 2));
});

app.listen(5000, () => console.log('Express server is running at port no: 5000'));

app.get('/flipkart',(req,res)=> {
    mysqlConnection.query('SELECT * FROM customers',(err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.get('/flipkart/:id',(req,res)=> {
    mysqlConnection.query('SELECT * FROM customers WHERE customer_id = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});