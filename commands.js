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
    .action((word)=>{
        findDefinition(word);
    });

//command : dict syn <word>
program
    .command('syn <word>')
    .alias('synonym')
    .description('give the synonym of the asked word.')
    .action((word)=>{
        findSynonym(word);
    });

//command : dict ant <word>
program
    .command('ant <word>')
    .alias('antonym')
    .description('give the antonyms of the asked word.If they don\'t exist, give synonyms')
    .action((word)=>{
        findAntonym(word);
    });

//command : dict ex <word>
program
    .command('ex <word>')
    .alias('example')
    .description('give the examples of use for the asked word.')
    .action((word)=>{
        findExamples(word);
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
    findAll("word");
}

program.parse(process.argv);