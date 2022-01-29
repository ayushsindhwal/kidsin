const NodeGeocoder=require('node-geocoder')
const options={
    provider:'google',
    httpAdapter:'https',
    apiKey:'AIzaSyB_dTh5gK_Jw0K-Snt7CG84DarcmxnAOOA',
    formatter:null
}


const geocoder=NodeGeocoder(options)

module.exports=geocoder