const aws = require('aws-sdk')
const path = require('path')

// config AWS

aws.config.update({
    accessKeyId: "AKIAUYFLC3BVS4EQBA57",
    secretAccessKey: "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",
    region: "ap-south-1"
});

let s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.upload = async (file, fileName) => {
    // TODO: to increase caching of static assets (add max-age and immutable, remove no-cache)
    // TODO: consider using timestamps in all the file names to resolve fle replacement issue <Sabiha Khan>
    try {
        let uploadParams = {
            "ACL": "public-read",
            "ContentType": file.mimetype,
            Bucket: "content-aarti-bhajan",
            Key: file.folder + fileName,
            Body: file.buffer
        };
        return new Promise(function (resolve, reject) {
            s3.upload(uploadParams, function (err, data) {
                if (err !== null) {
                    reject(err);
                } else resolve(data);
            });
        })
    } catch(error) {
        throw new Error('error in uploadToS3')
    }

}
