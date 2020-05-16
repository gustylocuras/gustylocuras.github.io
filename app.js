
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
                  .text(question.question)
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
                            .text(question.incorrect_answer)
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
                    $incorrect() //debug

                  }

       }



    });
  })
