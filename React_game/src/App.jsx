import { useState, useEffect } from 'react';
import successSound from "../public/success.mp3";
import failureSound from "../public/failure.mp3";

function App() {
    const successAudio = new Audio(successSound); // Create audio objects
    const failureAudio = new Audio(failureSound);

    const possibleAttempts = 20;
    const maxFailedAttempts = 5;
    
    const [numOfAttempts, setNumOfAttempts] = useState(0); // State for number of attempts
    const [failedAttempts, setFailedAttempts] = useState(0); // State for failed attempts
    const [language, setLanguage] = useState("");
    const [color, setColor] = useState("");
    const [visible, setVisible] = useState(false);
    const [mainContentVisible, setMainContentVisible] = useState(false);
    const [contentOne, setContentOne] = useState('Hello Welcome');
    const [contentOnebg, setContentOnebg] = useState('white');
    const [contentOnecolor, setContentOnecolor] = useState('white');
    const [prevTrials, setPrevTrials] = useState([]);
    const [trialHistory, setTrialHistory] = useState([]);

    const progColours = [
      "Python-Black",
      "Java-Blue",
      "JavaScript-Yellow",
      "C++-Pink",
      "C-Green",
      "Ruby-Red",
      "Swift-Orange",
      "Go-LightBlue",
      "Dart-Cyan",
      "PHP-Purple",
      "Perl-Magenta",
      "Rust-Brown",
      "Kotlin-Purple",
      "Scala-Scarlet",
      "TypeScript-Navy",
      "R-Gray",
      "Shell-DarkGreen",
      "Haskell-DarkPurple",
      "Elixir-Violet",
      "MATLAB-Gold",
    ];
    
    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setMainContentVisible(true);
        }, 4000);
        return () => clearTimeout(timer); // Fixed cleanup
    }, []);

    function handleLanguageChange(e) {
        setLanguage(e.target.value);
    }

    function handleColorChange(e) {
        setColor(e.target.value);
    }

    class Trial {
        constructor(langColor, isPassed, attemptNumber) {
            this.langColor = langColor;
            this.isPassed = isPassed;
            this.attemptNumber = attemptNumber;
        }

        getTrialInfo() {
            return {
                attemptNumber: this.attemptNumber,
                langColor: this.langColor,
                isPassed: this.isPassed,
            };
        }
    }

    class Registry {
        constructor(setTrialHistory) {
            this.setTrialHistory = setTrialHistory;
        }

        createTrial(langColor, isPassed, attemptNumber) {
            const trial = {
                langColor,
                isPassed,
                attemptNumber,
            };
            this.setTrialHistory((prevTrials) => [...prevTrials, trial]);
        }
    }

    const registry = new Registry(setTrialHistory);

    function handleClickEvent(e) {
        e.preventDefault();

        // Increment attempts state
        setNumOfAttempts(prev => prev + 1);

        let newText1 = 
            language.charAt(0).toUpperCase() + language.slice(1).toLowerCase() + 
            "-" + color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();

        let matchFound = false;

        // Check if the max attempts are reached
        if (numOfAttempts >= possibleAttempts) {
            setContentOne("Maximum attempts reached. Game over.");
            alert("Game Over: Max attempts reached");
            window.location.reload(); // Reload the page to reset the game
            return;
        }

        if (prevTrials.includes(newText1.toLowerCase())) {
            setContentOne('You already tried this combination.');
            setFailedAttempts(prev => prev + 1); // Increment failed attempts state
            setContentOnebg('orange');
            registry.createTrial(newText1, false, trialHistory.length + 1);
            failureAudio.play();
            return;
        }

        // Check if the max failed attempts are reached
        if (failedAttempts >= maxFailedAttempts) {
            setContentOne("YOU HAVE FAILED TOO MANY TIMES. Game over.");
            alert("Game Over: Max failed attempts reached");
            window.location.reload(); // Reload the page to reset the game
            return;
        }

        // Iterate over progColours and check if the combination matches
        for (let progColour of progColours) {
            if (newText1.toLowerCase() === progColour.toLowerCase()) {
                matchFound = true;
                setContentOne('Success');
                console.log('Success');
                let index = progColour.indexOf('-');
                let result = progColour.slice(index + 1);
                setContentOnebg(result);
                setContentOnecolor('white');
                setLanguage('');
                setColor('');
                registry.createTrial(newText1, true, trialHistory.length + 1);
                successAudio.play();
                break;  // Exit loop on success
            }
        }

        // Handle the case where no match is found
        if (!matchFound) {
            setContentOnebg('red');
            setContentOne('No Match Found');
            setFailedAttempts(prev => prev + 1); // Increment failed attempts state
            registry.createTrial(newText1, false, trialHistory.length + 1);
            failureAudio.play();
        }

        // Add to prevTrials and increment attempts
        setPrevTrials(prev => [...prev, newText1.toLowerCase()]);
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 500 }}>
                <form>
                    <h1> GUESS THE LANGUAGE AND ITS COLOUR</h1>

                    <div>{visible && progColours.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}</div>

                    {mainContentVisible && (
                        <div>
                            <p style={{ backgroundColor: contentOnebg, color: contentOnecolor }}>{contentOne}</p>
                            <p></p>
                            <div>
                                <span>Language:</span>
                                <input onChange={handleLanguageChange} value={language} />
                                <p></p>
                                <span>Color:</span>
                                <input onChange={handleColorChange} value={color} />
                                <p></p>
                                <button onClick={handleClickEvent}>Click me</button>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>Trial History:</h2>
                        <table border="1" style={{ width: "100%", textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Attempt Number</th>
                                    <th>Programming Language and Color</th>
                                    <th>Success</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trialHistory.map((trial, index) => (
                                    <tr key={index}>
                                        <td>{trial.attemptNumber}</td>
                                        <td
                                            style={{
                                                backgroundColor: trial.langColor.includes("-")
                                                    ? trial.langColor.split("-")[1].toLowerCase()
                                                    : "transparent",
                                                color: "white",
                                            }}
                                        >
                                            {trial.langColor}
                                        </td>
                                        <td
                                            style={{
                                                backgroundColor: trial.isPassed ? "green" : "red",
                                                color: "white",
                                            }}
                                        >
                                            {trial.isPassed ? "✔" : "✘"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </form>
                <hr />
            </div>
        </>
    );
}

export default App;
