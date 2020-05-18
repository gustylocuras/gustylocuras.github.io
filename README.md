Welcome to tribal

Tribal is a trivia game that implements:
  1. AJAX request to https://opentdb.com/, a free open trivia database.
  2. Javascript logic and JQuery DOM manipulation
  3. CSS styling and animations
  4. HTML basic structure
  
 On page load:
 The user is welcomed to Tribal and is given the option to select the difficulty of the questions (easy, medium, hard)
 Once the option is selected, the modal goes away and the game starts with the first question being displayed.
 
 [welcome image](frontpage.png)
 
 The code:
 1. Creates a global variable to shuffle the answers before displaying them.
 2. Runs a start() function that:
    - empties previous questions within the question container (in case of reset)
    - declares a token variable used to pass the session token to the data request (first empty and then assigned by the            first AJAX request)
    - declares a difficulty variable, first empty, then assigned by on'click' in the welcome modal.
    - the same on'click' runs the second AJAX request with difficulty and token provided (this request gets 10 questions)
    - request 
    
   [video demo](videodemo.gif)


# gustylocuras.github.io
First commit
