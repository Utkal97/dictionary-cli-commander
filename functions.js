const {getDefinition, getRelatedWords, getExamples, getRandomWord} = require('./getRequests.js');

async function findDefinition(word)
{
    let result = await getDefinition(word);
    let jsonData = JSON.parse(result);
    return jsonData;
}

async function findSynonym(word)
{
    let result = await getRelatedWords(word);
    let jsonData = JSON.parse(result);

    //responce contains both antonyms and synonyms. So, choose the synonyms part and send it
    if(jsonData[0].relationshipType === 'synonym')
        return jsonData[0].words;
    else if(jsonData.length>1 && jsonData[1].relationshipType === 'synonym')
        return jsonData[1].words;
}

async function findAntonym(word)
{
    let result = await getRelatedWords(word);
    let jsonData = JSON.parse(result);

    //responce contains both antonyms and synonyms. So, choose the antonyms part and send it
    if(jsonData[0].relationshipType === 'antonym')
        return {'antonyms':jsonData[0].words};
    else if(jsonData.length>1 && jsonData[1].relationshipType === 'antonym')
        return {'antonyms':jsonData[1].words};
    else                                                        //if no antonyms exist, send synonyms
        return {'synonyms':jsonData[0].words, 'antonyms':[]};
    
}

async function findExamples(word)
{
    let result = await getExamples(word);
    let jsonData = JSON.parse(result);
    return jsonData;
}

async function findAll(word)
{
    let allData = {};                                           //create an object for word

    let definitions = await findDefinition(word);
    allData['defn'] = [];                                       //put its definitions in 'defn'
    for(let i=0; i<definitions.length;i++)
    {
        allData['defn'].push(definitions[i].text);
    }

    let examples = await findExamples(word);
    allData['ex'] = [];                                        //put its examples in 'defn'
    for(let i=0; i<examples.examples.length;i++)
    {
        allData['ex'].push(examples.examples[i].text);
    }

    let antonyms = await findAntonym(word);
    allData['ant'] = [];                                       //put its antonyms in 'defn'
    if(antonyms.antonyms.length>0)
        allData['ant'] = antonyms.antonyms;

    let synonyms = await findSynonym(word);
    allData['syn'] = synonyms;                                 //put its synonyms in 'defn'

    return allData;
}

async function giveRandomWord()
{
    let result = await getRandomWord();
    let jsonData = JSON.parse(result);
    return jsonData;
}

function wordGame()
{
    console.log("Lets play a game :");
    word = giveRandomWord();
}

module.exports = { findDefinition, findAll, findAntonym, 
                    findExamples, findSynonym, wordGame,
                    giveRandomWord};