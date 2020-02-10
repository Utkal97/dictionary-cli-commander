# small-dictionary-cli-42words
#### The dictionary only contains 42 words. Some of the words contained : 'white', 'water'.
A command line tool built with commander js to implement features of a dictionary.
The tool is built using nodejs with modules : 'commanderjs' and 'inquirerjs'.

There are mainly 7 commands that implement dictionary functionalities:
#### 0. GET HELP (the most important)
command : dict help

1. Get definition of a word :<br />
command : dict defn <your_word> (OR) dict definition <your_word>.

2. Get the synonyms of a word :<br />
command : dict syn <your_word> (OR) dict synonym <your_word>.

3. Get the antonyms of a word :<br />
command : dict ant <your_word> (OR) dict antonym <your_word>. <br />
If antonym doesn't exist, a message is shown stating that the given word doesn't contain any antonyms.

4. Get the example cases of a word :<br />
command : dict ex <your_word> (OR) dict example <your_word>. <br />
It displays some example sentences of how the word can be used.

5. Get a random word : <br />
command : dict <br />
It shows a random word and all its information : definitions, synonyms, antonyms and examples.

6. Get all information related to the word : <br />
command : dict <word> <br />
It shows whole information (definitions, synonyms, antonyms and examples) of the word.

7. Play a Guess game : <br />
command : dict play <br />
###### Rules : <br />
- If the correct word is entered, show success message
- Any synonyms of the word(expected answer) should be also be accepted as a correct answer.
- If incorrect word is entered, user has 3 choices:
    - (1) Try again
        user tries again.
    - (2) Hint
        Hints could be:
            1. Display the word randomly jumbled (cat => atc, tac, tca)
            2. Display another definition of the word
            3. Display another antonym of the word
            4. Display another synonym of the word
        After taking hints, user guesses again.
    - (3) Quit
           Displays the Word, Word Full Dict , and quit.
           
## Installation/Setting up :-  <br />
Step 0) You need to have Nodejs, npm installed in your system. <br />
Step 1) Clone the directory. <br />
Step 2) Open the folder in terminal. <br />
Step 3) Type the command 'npm install' to download all required dependencies.    <br />
Step 4) Type the command 'npm link' so as to make the commands work on your command prompt.    <br />
Step 5) Use the commands and experience the small-dictionary API.    <br />
