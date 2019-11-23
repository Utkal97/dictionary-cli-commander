const https = require('https')

let base_url =  'https://fourtytwowords.herokuapp.com/';
let api_key = 'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164';

function getDefinition(word)
{
    let url =  base_url + 'words/' + word + '/definitions?api_key=' + api_key;
    https.get(url, (resp)=>{
        let data = "";
        // Add every chunk of data.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let myData = JSON.parse(data);
        });

    }).on('error', (err)=>{
        if(err.code === 'ENOTFOUND')
        {
            console.log(`Unable to reach '${err.hostname}'.`);
            console.log(' Looks like your internet connection is not present.');
        }
        else
            console.error(err);
    });
}

async function getRelatedWords(word)
{
    let url =  base_url + 'word/' + word + '/relatedWords?api_key=' + api_key;
    https.get(url, (resp)=>{
        let data = "";
        // Add every chunk of data.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let myData = JSON.parse(data);
            console.log(myData, typeof(myData));
        });

    }).on('error', (err)=>{
        if(err.code === 'ENOTFOUND')
        {
            console.log(`Unable to reach '${err.hostname}'.`);
            console.log(' Looks like your internet connection is not present.');
        }
        else
            console.error(err);
    });
}

async function getExamples(word)
{
    let url =  base_url + 'word/' + word + '/examples?api_key=' + api_key;
    https.get(url, (resp)=>{
        let data = "";
        // Add every chunk of data.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let myData = JSON.parse(data);
            console.log(myData, typeof(myData));
        });

    }).on('error', (err)=>{
        if(err.code === 'ENOTFOUND')
        {
            console.log(`Unable to reach '${err.hostname}'.`);
            console.log(' Looks like your internet connection is not present.');
        }
        else
            console.error(err);
    });
}

async function getRandomWord()
{
    let url =  base_url + 'words/randomWord?api_key=' + api_key;
    https.get(url, (resp)=>{
        let data = "";
        // Add every chunk of data.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let myData = JSON.parse(data);
            console.log(myData, typeof(myData));
        });

    }).on('error', (err)=>{
        if(err.code === 'ENOTFOUND')
        {
            console.log(`Unable to reach '${err.hostname}'.`);
            console.log(' Looks like your internet connection is not present.');
        }
        else
            console.error(err);
    });
}

module.exports = { getDefinition, getRelatedWords, getExamples, getRandomWord};