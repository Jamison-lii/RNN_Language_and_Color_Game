README for "Guess the Language and Its Color" Game
Overview
Welcome to the Guess the Language and Its Color game! This is a simple, interactive game where players try to guess the correct programming language and its associated color by entering the correct combination. The game provides feedback after each attempt, informing the player whether their guess is correct or not. The game tracks the number of attempts and failed attempts, with a maximum limit set for both.

This project is built using React.js, making use of state management, hooks, and basic JavaScript logic to simulate a guess-the-language game.

Features
Guessing Game: Players need to guess the correct programming language and its associated color.
Max Attempts and Failures: The game limits the number of attempts and failed guesses to ensure a challenging yet fair experience.
Audio Feedback: Each guess is accompanied by success or failure sounds to enhance user experience.
Trial History: The game maintains a history of previous attempts, displaying the attempt number, language-color combination, and whether the guess was correct or not.
Responsive UI: The game is designed to be simple and user-friendly, with a clean interface to interact with.
How It Works
The player enters a programming language and a color in the respective input fields.
The player clicks the "Click me" button to submit their guess.
The game checks if the combination matches a predefined set of valid programming language-color combinations.
If the guess is correct, the background color changes to reflect the color of the programming language, and a success message is displayed.
If the guess is incorrect or has been tried before, the game will prompt the player with an error message and increment the failed attempts counter.
The game ends if the player reaches the maximum number of attempts or fails the maximum number of times.
Components
App.js: The main React component responsible for rendering the game logic and handling user inputs and interactions.
Trial and Registry Classes: Used to store and manage each trial's data (language-color combination, success or failure, and attempt number).
Sound Feedback: Audio clips for success and failure events, enhancing the game's user experience.

Configuration
possibleAttempts: Set the maximum number of guesses a player can make.
maxFailedAttempts: Set the maximum number of failed attempts a player can have before the game ends.
progColours: The array of valid programming language-color combinations that the player must guess.
Example Programming Language-Color Combinations
Python-Black
Java-Blue
JavaScript-Yellow
C++-Pink
Ruby-Red
Feel free to modify the progColours array to add your own programming language-color combinations!

Contributing
We welcome contributions! If you find any bugs or want to add new features, feel free to fork the repository and submit a pull request.



Enjoy playing the game and testing your knowledge of programming languages and their associated colors!
