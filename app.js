
  let token = ''
  let difficulty = ''

  $.ajax({

    "url": "https://opentdb.com/api_token.php?command=request"

  }).then((data)=> {
     token = data.token;
     console.log(token);
  });


  $('.difficulty').on('click', (event) => {
    difficulty = $(event.currentTarget).text().toLowerCase()
    $('#modal').css('display', 'none')

    $.ajax({

     	"url": "https://opentdb.com/api.php?amount=10&token=" + token + "&difficulty=" + difficulty,

    }).then((data)=> {
       console.log(data);
       for(let question of data.results){
         const $questionBox = $('<div>').addClass('question-box').appendTo('.question-container')
         const $category =
                  $('<h4>')
                  .addClass('category')
                  .text(question.category)
                  .appendTo($questionBox)
         const $question =
                  $('<h3>')
                  .addClass('question')
                  .text(question.question.replace(/&quot;/g, "'").replace(/&#039;/g, "'"))
                  .insertAfter($category)
         const $answers =
                  $('<div>')
                  .addClass('answers')
                  .insertAfter($question)
                  if(question.type === 'boolean'){
                    const $correct =
                            $('<div>')
                            .addClass('correct-answer')
                            .text(question.correct_answer)
                            .appendTo($answers)
                    //populate with correct answer data access
                    const $incorrect =
                            $('<div>')
                            .addClass('incorrect-answer')
                            .text(question.incorrect_answers[0])
                            .appendTo($answers)
                    //populate with incorrect answer data access
                  } else if(question.type === 'multiple'){
                    const $correct =
                            $('<div>')
                            .addClass('correct-answer')
                            .text(question.correct_answer)
                            .appendTo($answers)
                    //populate with correct answer data access
                    const $incorrect = () => {
                      for(let incorrectOption of question.incorrect_answers){
                        const $incorrectOption =
                                    $('<div>')
                                    .addClass('incorrect-answer')
                                    .text(incorrectOption)
                                    .appendTo($answers)
                      }
                    }
                    $incorrect()

                  }

       }
       let currentQuestionIndex = 0
       const numOfQuestions = $('.question-container').children().length - 1 //might need to change this for result block

        const switchNext = () => {
          $('.question-container').children().eq(currentQuestionIndex).css('display', 'none')
          if(currentQuestionIndex < numOfQuestions){
            currentQuestionIndex++
          } else {
            currentQuestionIndex = 0
          }
          $('.question-container').children().eq(currentQuestionIndex).css('display', 'block')
        }

       //answers UI's (explore toggle class to animated more complex)
          $('.incorrect-answer').on('click', (event) => {
            $(event.currentTarget)
                    .css('background', 'red')
                    .css('transition-duration', '1s')
                    .css('color', 'white')
            setTimeout(switchNext, 1500)
            // switchNext()


          })
          $('.correct-answer').on('click', (event) => {
            $(event.currentTarget)
                    .css('background', 'green')
                    .css('color', 'white')
                    .css('transition-duration', '1s')
          })


    });
  })
