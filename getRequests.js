require('dotenv').config();

const request = require('request');

let base_url =  'https://fourtytwowords.herokuapp.com/';
let api_key = process.env.API_KEY;

//a generic get request function
function getRequest(url)
{
    let promise = new Promise((resolve, reject) => {               //make a promise and return body
        request(url, (error, response, body) => {
            if(error && error.errno === 'ENOTFOUND')
            {
                console.log('No internet connectivity OR dicitionary cant be reached'); 
            }
            else
            {
                if(body !== '{"error":"word not found"}')
                    resolve(body);
                else
                {
                    body = '';
                    resolve(body);
                }
            }
        });
    });
    return promise;
} 

async function getDefinition(word)
{
    let url =  base_url + 'word/' + word + '/definitions?api_key=' + api_key;
    let result = await getRequest(url);                     //await until definitions are obtained   
    return result;
}

async function getRelatedWords(word)
{
    let url =  base_url + 'word/' + word + '/relatedWords?api_key=' + api_key;
    let result = await getRequest(url);                     //await until related words are obtained
    return result;
}

async function getExamples(word)
{
    let url =  base_url + 'word/' + word + '/examples?api_key=' + api_key;
    let result = await getRequest(url);                     //await until examples are obtained
    return result;
}

async function getRandomWord()
{
    let url =  base_url + 'words/randomWord?api_key=' + api_key;
    let result = await getRequest(url);                     //await until a random word is obtained
    return result;   
}

module.exports = { getDefinition, getRelatedWords, getExamples, getRandomWord};