#!/usr/bin/env node

const program = require('commander');
const {findDefinition, findSynonym, findAntonym,
findAll, findExamples, wordGame, giveRandomWord} = require('./functions.js')

program
    .version('0.0.2')
    .description('A dictionary CLI Tool');

//command : dict defn <word>
program
    .command('defn <word>')
    .alias('definition')
    .description('give the definition of the asked word.')
    .action(async (word)=>{
        word = word.toLowerCase();
        let defn = await findDefinition(word);
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
        let syn = await findSynonym(word);
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
        let ant = await findAntonym(word);
        console.log(ant.antonyms);
        if(ant.antonyms.length === 0)
        {
            console.log(`There are no antonyms for ${word}. Showing its synonyms :-`);
            for(let i=0;i<ant.synonyms.length; i++)
            {
                console.log(`${i+1} : ${ant.synonyms[i]}`);
            }
        }
        else
        {
            console.log(`Antonyms for ${word} :-`);
            for(let i=0;i<ant.antonyms.length; i++)
            {
                console.log(`${i+1} : ${ant.antonyms[i]}`);
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
        let ex = await findExamples(word);
        ex = ex.examples;
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
if(process.argv[2]===undefined)
{
    (async function (){
        let word = await giveRandomWord();
        console.log(`Word of the day is: ${word.word}`);
        goToWord(word.word);
    })();
}

//command : dict <word>
else if(process.argv.length==3 && process.argv[2]!=="play")
{
    goToWord(process.argv[2]);
}

program.parse(process.argv);

async function goToWord(word)
{
    word = word.toLowerCase();
    let all = await findAll(word);
    //console.log(all);
    if(all.defn.length>0)
    {
        console.log(`Definitions for '${word}' :- `);
        for(let i=0;i<all.defn.length;i++)
        {
            console.log(`${i+1} : ${all.defn[i]},`);
        }
    }
    if(all.syn.length>0)
    {
        console.log(`Synonyms for '${word}' :- `);
        for(let i=0;i<all.syn.length;i++)
        {
            console.log(`${i+1} : ${all.syn[i]},`);
        }
    }
    if(all.ant.length>0)
    {
        console.log(`Antonyms for '${word}' :- `);
        for(let i=0;i<all.ant.length;i++)
        {
            console.log(`${i+1} : ${all.ant[i]},`);
        }
    }
    else
    {
        console.log(`There are no antonyms for '${word}'.`);
    }

    if(all.ex.length>0)
    {
        console.log(`Examples for '${word}' :-` );
        for(let i=0;i<all.ex.length;i++)
        {
            console.log(`${i+1} : ${all.ex[i]},`);
        }
    }
}