let possibleAttempts = 2;
let maxfailedAttempts = 2;
let numofAttempts = 0;
let failedAttempts = 0;
let progColours = ['Python-Black', 'C++-Pink', 'Javascript-Yellow', 'Go-Blue', 'Dart-Red', 'Perl-Magenta'];





window.onload = function(){
    const initialContent = document.getElementById('initial-content');
    const mainContent = document.getElementById('main-content');
    
    progColours.forEach(item => {
           const listitem = document.createElement('li');
           listitem.textContent = item;
           initialContent.appendChild(listitem);
    });

    initialContent.style.display = 'block';
    

    setTimeout(() => {
        initialContent.style.display = 'none';
        mainContent.style.display = 'block';
    },3000);
}



class Trial{
    constructor(langColor,isPassed){
        this.langColor = langColor;
        
        this.isPassed = isPassed;
    }

    getTrialInfo(){
        return `${this.langColor}   ${this.isPassed}`
    }
}

class Registry{
    constructor(){
        this.trialRegistry = []
        this.success = false;
    }

    createTrial(langColor){
        const isPassed = this.success;
        const trial = new Trial(langColor,isPassed);
        this.trialRegistry.push(trial);
        return trial;

    }

    getAllTrialInfo(){
        /*this.trialRegistry.forEach(trial => {
            document.getElementsByTagName("p")[0].innerHTML =trial.getTrialInfo();
        })*/

           /* for(let trialInfo of this.trialRegistry){
                document.getElementsByTagName("p")[0].innerHTML = this.trialRegistry[trialInfo];
            }*/

                for (let trial of this.trialRegistry) {
                    document.getElementsByTagName("p")[0].innerHTML = `${trial.getTrialInfo()}<br>`; // Append trial info with line break
                } 

    }
}

const registry = new Registry();




document.getElementById("sublet").addEventListener("click", function (e) {
    e.preventDefault();

    let input1 = document.getElementById('progLang').value.trim();

let input2 = document.getElementById('color').value.trim();


  

    let newText1 = 
        input1.
        charAt(0).
        toUpperCase()
        +
        input1.
            slice(1).
            toLowerCase()
        + "-" +
        input2.
            charAt(0).
            toUpperCase()
        +
        input2.
            slice(1).
            toLowerCase();



    let matchFound = false;

    numofAttempts++;
    if (numofAttempts > possibleAttempts) {
        document.getElementsByTagName("p")[1].innerHTML = 'Maximum attempts reached. Try again later.';
        console.log('Maximum attempts reached. Try again later.');
        alert("Game Over: Max attempts reached");
       // registry.getAllTrialInfo();
        //location.reload();
        return;
    }
    

    if (failedAttempts > maxfailedAttempts) {
        document.getElementsByTagName("p")[1].innerHTML = 'YOU HAVE FAILED TOO MANY TIMES';
        alert("Game Over: Max failed attempts reached");
       // registry.getAllTrialInfo();
       // location.reload();
    }

    

   
    for (let progColour of progColours) {

        if (newText1.toLowerCase() == progColour.toLowerCase()) {
            matchFound = true
            document.getElementsByTagName("p")[0].innerHTML = 'Success'
            console.log('Success');
            let index = progColour.indexOf('-')
            let result = progColour.slice(index + 1);
            document.getElementsByTagName("p")[0].style.backgroundColor = result;
            document.getElementsByTagName("p")[0].style.color = 'white';
            document.getElementById('progLang').value = '';
            document.getElementById('color').value = '';

            registry.createTrial(newText1,matchFound);

            alert("Success");
            break;

        }
        else if (newText1.toLowerCase() != progColour.toLowerCase()) {
            matchFound = false;
            document.getElementsByTagName("p")[0].style.backgroundColor = 'red';
            document.getElementsByTagName("p")[0].innerHTML = 'No Match Found';
            document.getElementById('progLang').value = '';
            document.getElementById('color').value = '';
            failedAttempts++;
            registry.createTrial(newText1,matchFound);
            // console.log('No Match Found');
        }
        /*  if(!matchFound){
          
              document.getElementsByTagName("p")[0].innerHTML = 'No Match Found';
          console.log('No Match Found');
          
          }*/
    }

  

   



    console.log(`You have used ${numofAttempts} attempts out of ${possibleAttempts}`);
    console.log(newText1);

    let a = [];
    console.log(a);
 //   document.getElementsByTagName("p")[0].innerHTML = a[0];

});

