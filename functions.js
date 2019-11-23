const {getDefinition, getRelatedWords, getExamples, getRandomWord} = require('./getRequests.js');

function findDefinition(word)
{
    console.log(`definition of ${word} is :`);
    let result = getDefinition(word);
    console.log("Final result :" + result);
    return word;
}

function findSynonym(word)
{
    console.log(`synonym of ${word} is :`);
    getRelatedWords(word);
    return word;
}

function findAntonym(word)
{
    console.log(`antonym of ${word} is :`);
    //if no antonym:
        //print there are no synonyms
        //call findSynonym
    getRelatedWords(word);
    return word;
}

function findExamples(word)
{
    console.log(`examples for ${word} is :`);
    getExamples(word);
    return word;
}

function findAll(word)
{
    console.log(`result for ${word} is :`);
    return word;
}

function giveRandomWord()
{
    console.log("Word of the day :");
    getRandomWord();
    return "";
}

function wordGame()
{
    console.log("Lets play a game :");
    word = giveRandomWord();
}


module.exports = { findDefinition, findAll, findAntonym, 
                    findExamples, findSynonym, wordGame,
                    giveRandomWord};