const {getDefinition, getRelatedWords, getExamples, getRandomWord} = require('./getRequests.js');

async function findDefinition(word)
{
    console.log(`definitions for the ${word} are :-`);
    let result = await getDefinition(word);
    let jsonData = JSON.parse(result);
    return jsonData;
}

async function findSynonym(word)
{
    console.log(`synonym of ${word} is :`);
    let result = await getRelatedWords(word);
    let jsonData = JSON.parse(result);

    if(jsonData[0].relationshipType === 'synonym')
        return jsonData[0].words;
    else if(jsonData.length>1 && jsonData[1].relationshipType === 'synonym')
        return jsonData[1].words;
}

async function findAntonym(word)
{
    let result = await getRelatedWords(word);
    let jsonData = JSON.parse(result);

    if(jsonData[0].relationshipType === 'antonym')
        return {'antonyms':jsonData[0].words};
    else if(jsonData.length>1 && jsonData[1].relationshipType === 'antonym')
        return {'antonyms':jsonData[1].words};
    else
        return {'synonyms':jsonData[0].words, 'antonyms':[]};
    
}

async function findExamples(word)
{
    console.log(`examples for ${word} is :`);
    let result = await getExamples(word);
    let jsonData = JSON.parse(result);
    return jsonData;
}

async function findAll(word)
{
    let allData = {};
    let definitions = await findDefinition(word);
    allData['defn'] = definitions;

    let examples = await findExamples(word);
    allData['ex'] = examples;

    let antonyms = await findAntonym(word);
    allData['ant'] = antonyms;

    let synonyms = await findSynonym(word);
    allData['syn'] = synonyms;

    console.log(allData);
    return allData;
}

async function giveRandomWord()
{
    console.log("Word of the day :");
    let result = await getRandomWord();
    let jsonData = JSON.parse(result);
    console.log(jsonData);
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