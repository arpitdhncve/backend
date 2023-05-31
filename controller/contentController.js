const contentModel = require("../models/contentModel.js")
const axios = require("axios");
const secrets = require("../secret.js")
const jwt = require("jsonwebtoken");
const s3Upload = require("./s3service")


const uploadBhajan = async function (req,res)  { 
     
    let {title} = req.body
    //bhajanAudio
    let file = req.files[0]
    //bhajanLogo
    let file1 = req.files[1]

    console.log(title)
    if (!title || req.files.length != 2) {
        res.status(400).send({
            status : false,
            message : "Invalid Content"
        });
        return;
    }
    
    let x = await s3Upload.upload(file,file.originalname)
    let y = await s3Upload.upload(file1,file1.originalname)
    let bhajanAudio = x.Location
    let bhajanImage = y.Location
    
    const newContent = new contentModel (
        {
           title,
           bhajanAudio,
           bhajanImage
        }
    );

    await newContent.save()

    res.status(201).send({
        status : true,
        message : "Content Created"
    });

 }


 const getBhajan = async function(req,res) {
    
    const query = {"isDeleted" : false}
    const allBhajan = await contentModel.find(query)
    
    res.status(201).send({
        status : true,
        message : "bhajan fetched success",
        data : allBhajan
    })
 }



module.exports.uploadBhajan = uploadBhajan
module.exports.getBhajan = getBhajan






