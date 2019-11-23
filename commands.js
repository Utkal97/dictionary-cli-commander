#!/usr/bin/env node

const program = require('commander');
const {findDefinition, findSynonym, findAntonym,
findAll, findExamples, wordGame, giveRandomWord} = require('./functions.js')

program
    .version('0.0.1')
    .description('A dictionary CLI Tool');

//command : dict defn <word>
program
    .command('defn <word>')
    .alias('definition')
    .description('give the definition of the asked word.')
    .action(async (word)=>{
        word = word.toLowerCase();
        let defn = await findDefinition(word);
        for(let i=0;i<defn.length;i++)
        {
            console.log(`${i} : ${defn[i].text}`);
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
        for(let i=0; i<syn.length; i++)
        {
            console.log(`${i} : ${syn[i]}, `);
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
                console.log(`${i} : ${ant.synonyms[i]}`);
            }
        }
        else
        {
            console.log(`Antonyms for ${word} :-`);
            for(let i=0;i<ant.antonyms.length; i++)
            {
                console.log(`${i} : ${ant.antonyms[i]}`);
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
        for(let i=0;i<ex.length;i++)
        {
            console.log(`${i} : ${ex[i].text}`);
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
    giveRandomWord();
    
}

//command : dict <word>
else if(process.argv.length==3 && process.argv[2]!=="play")
{
    let word = process.argv[2];
    word = word.toLowerCase();
    let all = findAll(word);
    /*
    if(all.defn.length>0)
    {
        console.log(`definitions for ${word} :- `);
        for(let i=0;i<all.defn.length;i++)
        {
            console.log(all.defn);
        }
    }
    if(all.syn.length>0)
    {
        console.log(`synonyms for ${word} :- `);
        for(let i=0;i<all.syn.length;i++)
        {
            console.log(all.syn);
        }
    }
    if(all.ant.length>0)
    {
        console.log(`antonyms for ${word} :- `);
        for(let i=0;i<all.ant.length;i++)
        {
            console.log(all.ant);
        }
    }
    if(all.ex.length>0)
    {
        console.log(`examples for ${word} :-` );
        for(let i=0;i<all.ex.length;i++)
        {
            console.log(all.ex);
        }
    }
    */
}

program.parse(process.argv);