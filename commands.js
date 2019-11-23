#!/usr/bin/env node

const program = require('commander');
const {findDefinition, findSynonym, findAntonym,
findAll, findExamples, wordGame, giveRandomWord} = require('./functions.js')

program
    .version('0.0.3')
    .description('A dictionary CLI Tool');

//command : dict defn <word>
program
    .command('defn <word>')
    .alias('definition')
    .description('give the definition of the asked word.')
    .action(async (word)=>{
        word = word.toLowerCase();
        let defn = await findDefinition(word);              //await until definitions are obtained
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
        let syn = await findSynonym(word);              //await until synonyms are obtained
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
        let ant = await findAntonym(word);          //await until antonyms are obtained
        
        if(antonyms.antonyms.length > 0)            //Check if there are antonyms for given word
        {
            console.log(`Antonyms for ${word} :-`);
            for(let i=0;i<ant.antonyms.length; i++)
            {
                console.log(`${i+1} : ${ant.antonyms[i]}`);
            }
        }
        else if(ant.antonyms.length === 0)         //If no antonyms for given word, show synonyms    
        {
            console.log(`There are no antonyms for ${word}. Showing its synonyms :-`);
            for(let i=0;i<ant.synonyms.length; i++)
            {
                console.log(`${i+1} : ${ant.synonyms[i]}`);
            }
        }
    });

//command : dict ex <word>
program
    .command('ex <word>')
    .alias('example')
    .description('give the examples of use for the asked word.')
    .action(async (word) => {
        word = word.toLowerCase();
        let ex = await findExamples(word);              //await until we get responce for examples of word
        ex = ex.examples;                               //response is an object of structure: {examples:{required}}
        console.log(`Example sentences for the ${word} are :-`);
        for(let i=0;i<ex.length;i++)
        {
            console.log(`${i+1} : ${ex[i].text}`);
        }
    });

//command : dict play
program
    .command('play')
    .description('play a game.')
    .action(()=>{
        wordGame();
    });

//command : dict
if(process.argv[2]===undefined)             //process.argv contains arguments passed through command. Check if we have only typed 'dict'
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
    goToWord(process.argv[2]);                  //process.argv contains arguments given in command.
}

program.parse(process.argv);

async function goToWord(word)
{
    word = word.toLowerCase();
    let all = await findAll(word);

    if(all.defn.length>0)                               //print definitions if present
    {
        console.log(`Definitions for '${word}' :- `);
        for(let i=0;i<all.defn.length;i++)
        {
            console.log(`${i+1} : ${all.defn[i]},`);
        }
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