#!/usr/bin/env node

const program = require('commander');
const {findDefinition, findSynonym, findAntonym,
findAll, findExamples, giveRandomWord} = require('./functions.js');
const {Game} = require('./game.js');

program
    .version('0.0.7')
    .description('A dictionary CLI Tool');

//command : dict defn <word>
program
    .command('defn <word>')
    .alias('definition')
    .description('give the definition of the asked word.')
    .action(async (word)=>{
        word = word.toLowerCase();
        let defn = await findDefinition(word);              //await until definitions are obtained
        if(defn.length === 0)
            console.log(`No definitions available for ${word}. There may not be this word in dictionary.`);
        else
            console.log(`Definitions for the ${word} are :-`);
        for(let i=0;i<defn.length;i++)
        {
            console.log(`${i+1} : ${defn[i].text}`);
        }
        
    });

//command : dict syn <word>
program
    .command('syn <word>')
    .alias('synonym')
    .description('give the synonym of the asked word.')
    .action(async (word)=>{
        word = word.toLowerCase();
        let syn = await findSynonym(word);                  //await until synonyms are obtained
        
        if(syn.length === 0)
            console.log(`No synonyms for ${word}. This word may not be in dictionary.`);
        else
            console.log(`Synonyms for the ${word} are :-`);
        for(let i=0; i<syn.length; i++)
        {
            console.log(`${i+1} : ${syn[i]}, `);
        }
    });

//command : dict ant <word>
program
    .command('ant <word>')
    .alias('antonym')
    .description('give the antonyms of the asked word.If they don\'t exist, give synonyms')
    .action(async (word)=>{        
        word = word.toLowerCase();
        let ant = await findAntonym(word);                  //await until antonyms are obtained
        if(ant.hasOwnProperty('synonyms'))
        {
            if(ant.antonyms.length > 0)                    //Check if there are antonyms for given word
            {
                console.log(`Antonyms for ${word} :-`);
                for(let i=0;i<ant.antonyms.length; i++)
                {
                    console.log(`${i+1} : ${ant.antonyms[i]}`);
                }
            }
            else if(ant.antonyms.length === 0)                  //If no antonyms for given word, show synonyms    
            {
                console.log(`There are no antonyms for ${word}. Showing its synonyms :-`);
                for(let i=0;i<ant.synonyms.length; i++)
                {
                    console.log(`${i+1} : ${ant.synonyms[i]}`);
                }
            }
        }
        else
            console.log(`The word ${word} may not be there in dictionary.`);
    });

//command : dict ex <word>
program
    .command('ex <word>')
    .alias('example')
    .description('give the examples of use for the asked word.')
    .action(async (word) => {
        word = word.toLowerCase();
        let ex = await findExamples(word);              //await until we get responce for examples of word
        if(ex.length!== 0)
        {
            ex = ex.examples;                               //response is an object of structure: {examples:{required}}
            
            if(ex.length===0)
                console.log(`No examples for ${word}. This word may not be in dictionary.`);
            else
                console.log(`Example sentences for the ${word} are :-`);

            for(let i=0;i<ex.length;i++)
            {
                console.log(`${i+1} : ${ex[i].text}`);
            }
        }
        else
        {
            console.log(`No examples for ${word}. This word may not be in dictionary.`);
        }
    });

//command : dict play
program
    .command('play')
    .description(`
    - If the correct word is entered, show success message
    - Any synonyms of the word(expected answer) should be also be accepted as a correct answer.
    - If incorrect word is entered, user should be given 3 choices:
        - (1) Try again
            Let the user try again.
        - (2) Hint
            Display a hint, and let the user try again. Hints could be:
                1. Display the word randomly jumbled (cat => atc, tac, tca)
                2. Display another definition of the word
                3. Display another antonym of the word
                4. Display another synonym of the word
        - (3) Quit
    
               Display the Word, Word Full Dict , and quit.`)
    .action(async ()=>{
        let word = await giveRandomWord();
        let wordData = await findAll(word.word);
        let given = {};
        given['defn'] = [];
        given['ant'] = [];
        given['syn'] = [];
        given['defn'].push(wordData.defn[0]);
        console.log("given : " + given['defn'][0]);  
        Game(wordData, word.word, given);
    });

//command : dict
if(process.argv[2]===undefined)                       //process.argv contains arguments passed through command. Check if we have only typed 'dict'
{
    //make a self invoking function to use async/await feature
    (async function (){
        let word = await giveRandomWord();
        console.log(`Word of the day is: ${word.word}`);
        goToWord(word.word);
    })();
}

//command : dict <word>
else if(process.argv.length==3 && process.argv[2]!=="play")   //check if we haven't chosen Play and we want 'dict <word>'
{
    goToWord(process.argv[2]);                                //process.argv contains arguments given in command.
}

program.parse(process.argv);

async function goToWord(word)
{
    word = word.toLowerCase();
    let all = await findAll(word);
    if(all.length === 0)
    {
        console.log(`Word ${word} doesn't exist in dictionary.`);
        return;
    }
    if(all.defn.length>0)                               //print definitions if present
    {
        console.log(`Definitions for '${word}' :- `);
        for(let i=0;i<all.defn.length;i++)
        {
            console.log(`${i+1} : ${all.defn[i]},`);
        }
    }
    else
    {
        console.log(`The word '${word}' doesn't exist in dictionary`);
        return;
    }

    if(all.syn.length>0)                                //print synonyms if present
    {
        console.log(`Synonyms for '${word}' :- `);
        for(let i=0;i<all.syn.length;i++)
        {
            console.log(`${i+1} : ${all.syn[i]},`);
        }
    }

    if(all.ant.length>0)                               //print antonyms if present
    {
        console.log(`Antonyms for '${word}' :- `);
        for(let i=0;i<all.ant.length;i++)
        {
            console.log(`${i+1} : ${all.ant[i]},`);
        }
    }
    else                                                //declare that they are absent
    {
        console.log(`There are no antonyms for '${word}'.`);
    }

    if(all.ex.length>0)                                 //print examples if present
    {
        console.log(`Examples for '${word}' :-` );
        for(let i=0;i<all.ex.length;i++)
        {
            console.log(`${i+1} : ${all.ex[i]},`);
        }
    }
}