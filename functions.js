const {
    getDefinition, 
    getRelatedWords, 
    getExamples, 
    getRandomWord} = require('./getRequests.js');

async function findDefinition(word)
{
    let result = await getDefinition(word);
    if(result) {
        let jsonData = JSON.parse(result);
        return jsonData;
    }
    else
        return  [];
}

async function findSynonym(word)
{
    let result = await getRelatedWords(word);
    if(result) {
        let jsonData = JSON.parse(result);
        //responce contains both antonyms and synonyms. So, choose the synonyms part and send it
        if(jsonData.error)
            return jsonData;
        else if(jsonData[0].relationshipType === 'synonym')
            return jsonData[0].words;
        else if(jsonData.length>1 && jsonData[1].relationshipType === 'synonym')
            return jsonData[1].words;        
    }
    else
        return  [];
}

async function findAntonym(word)
{
    let result = await getRelatedWords(word);
    if(result) {
        let jsonData = JSON.parse(result);
        if(jsonData.error)
            return jsonData;
        //responce contains both antonyms and synonyms. So, choose the antonyms part and send it
        else if(jsonData[0].relationshipType === 'antonym')
            return {'antonyms':jsonData[0].words};
        else if(jsonData.length>1 && jsonData[1].relationshipType === 'antonym')
            return {'antonyms':jsonData[1].words};
        else                                                        //if no antonyms exist, send synonyms
            return {'synonyms':jsonData[0].words};
    }
    else
        return [];
}

async function findExamples(word)
{
    let result = await getExamples(word);
    if(result) {
        let jsonData = JSON.parse(result);
        return jsonData;
    }
    else
        return [];
}

async function findAll(word)
{
    let allData = {};                                           //create an object for word

    let definitions = await findDefinition(word);
    if(definitions.length === 0)
        return [];

    allData['defn'] = [];                                       //put its definitions in 'defn'
    for(let i=0; i<definitions.length;i++)
    {
        allData['defn'].push(definitions[i].text);
    }

    let examples = await findExamples(word);
    allData['ex'] = [];                                        //put its examples in 'defn'
    for(let i=0; i<examples.examples.length;i++)
        allData['ex'].push(examples.examples[i].text);

    let antonyms = await findAntonym(word);
    allData['ant'] = [];
    if(antonyms.antonyms)                                       //if there are any antonyms for the word
        allData['ant'] = antonyms.antonyms;                     //reference to the list of antonyms

    let synonyms = await findSynonym(word);
    allData['syn'] = synonyms;

    return allData;
}

async function giveRandomWord()
{
    let result = await getRandomWord();
    let jsonData = JSON.parse(result);
    return jsonData;
}

module.exports = {  findDefinition, findAll, findAntonym, 
                    findExamples, findSynonym,
                    giveRandomWord  };