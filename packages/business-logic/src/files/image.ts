import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    },
    region: ''
})

const uploadImage = () => {
    s3.getSignedUrl('putObject', {
        Bucket: '',
        ContentType: ''
    })
}
