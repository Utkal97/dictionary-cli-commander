const inquirer = require('inquirer');

let questions = [
    //question prompt for guessing the word
    {
        type : 'input',
        name : 'guessWord',
        message : 'guess the word',
        validate : function(value) {
            var passvalue = value.match(/^[A-Za-z]+$/);
            if(passvalue)
                return true;
            return 'Please enter alphabets only.'
        }
    },
    //question prompt for choosing what to do after incorrect answer
    {
        type : 'list',
        name : 'nextOption',
        message : 'what would you do now?',
        choices : ['Try Again', 'Hint', 'Quit']
    },
    //question prompt for choosing between hints
    {
        type : 'list',
        name : 'typeOfHint',
        message : 'which type of hint to you want',
        choices : ['Display the word randomly jumbled', 'Display another definition', 'Display another antonym', 'Display another synonym']
    }
]

function wordGuessPrompt()
{
    return new Promise((resolve, reject) => {
        inquirer
        .prompt(questions[0])
        .then((answer) => {
            resolve(answer);
        });
    });
}

function wrongGuessPrompt()
{
    return new Promise((resolve, reject) =>{
        inquirer
        .prompt(questions[1])
        .then((answer) => {
            resolve(answer);
        });
    });
}

function hintPrompt()
{
    return new Promise((resolve, reject) =>{
        inquirer
        .prompt(questions[2])
        .then((answer) => {
            resolve(answer);
        });
    });
}

async function Game(wordData, ans, given)
{  
    //console.log(ans);

    let guess = await wordGuessPrompt();
    console.log(`Your guess : ${guess.guessWord}`);

    //Winning Condition: either guess the Right word OR guess its synonym.
    if(guess.guessWord === ans || wordData['syn'].includes(guess.guessWord))
        console.log("You've WON!!!");

    else
    {
        console.log("Wrong Answer.")
        let choice = await wrongGuessPrompt();              //Choose what to do next
        console.log(`You chose to ${choice.nextOption}`);

        if(choice.nextOption === 'Try Again')               //Keep trying as many times as you want to
            Game(wordData, ans, given);
        
        else if(choice.nextOption === 'Hint')
        {
            let hintType = await hintPrompt();
            hintType = hintType.typeOfHint;
            console.log(`You chose to ${hintType}`);

            if(hintType === 'Display the word randomly jumbled')
            {
                console.log(`The word is jumbled as : ${jumble(ans)}`);
                Game(wordData, ans, given);
            }
            
            else if(hintType === 'Display another definition')
            {
                let anotherOne = wordData.defn[ Math.floor( Math.random() * wordData.defn.length )];
                if(anotherOne !== given)
                {
                    console.log("Another definition is :" + anotherOne);
                    Game(wordData, ans, anotherOne);
                }
                else
                {
                    anotherOne = wordData.defn[ Math.floor( Math.random() * wordData.defn.length )];
                    console.log(anotherOne);
                    Game(wordData, ans, anotherOne);
                }
            }
            else if(hintType === 'Display another antonym')
            {
                let antonym = wordData.ant[Math.floor( Math.random() * wordData.ant.length )];
                console.log("antonym : " + antonym);
                Game(wordData, ans, given);
            }
            else if(hintType === 'Display another synonym')
            {
                let synonym = wordData.syn[Math.floor( Math.random() * wordData.syn.length )];
                console.log("synonym : " + synonym);
                Game(wordData, ans, given);
            }
        }
    }
}


function jumble(word){
    var jumbled = '';
    word = word.split('');
    while (word.length > 0) {
      jumbled +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return jumbled;
}
module.exports = {Game};