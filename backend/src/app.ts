//import "dotenv/config";
// import dotenv from 'dotenv';
// dotenv.config();

//require('dotenv').config()
import express from 'express';
//const express = require('express');

const app = express();

//app.use(express.json());

app.get("/",(req, res)=> {
    res.send("hello server!!");
});

export default app;
//export = app