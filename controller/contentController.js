const contentModel = require("../models/contentModel.js")
const axios = require("axios");
const secrets = require("../secret.js")
const jwt = require("jsonwebtoken");


const uploadBhajan = async function (req,res)  { 
     
    let {title} = req.body
    console.log(title)
    if (!title) {
        res.status(400).send({
            status : false,
            message : "Invalid title"
        });
        return;
    }

    const newContent = new contentModel (
        {
           title
        }
    );

    await newContent.save()

    res.status(201).send({
        status : true,
        message : "Content Created"
    });

 }



module.exports.uploadBhajan = uploadBhajan





