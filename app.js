
let answerShuffle = []


const start = function (){
  $('.question-container').empty()

  let token = ''
  let difficulty = ''
  let scoreBoard = 0

  $.ajax({

    "url": "https://opentdb.com/api_token.php?command=request"

  }).then((data)=> {
     token = data.token;
     console.log(token);
  });



  $('#modal').css('display', 'block')


  $('.difficulty').on('click', (event) => {
    difficulty = $(event.currentTarget).text().toLowerCase()
    $('.difficulty').off()
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
                  .text(question.question.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "and"))
                  .insertAfter($category)
         const $answers =
                  $('<div>')
                  .addClass('answers')
                  .insertAfter($question)
                  if(question.type === 'boolean'){
                    const $correct =
                            $('<div>')
                            .addClass('correct-answer')
                            .text(question.correct_answer.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "and"))
                            answerShuffle.push($correct)

                    const $incorrect =
                            $('<div>')
                            .addClass('incorrect-answer')
                            .text(question.incorrect_answers[0].replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "and"))
                            answerShuffle.push($incorrect)
                            for(let i = 2; i > 0; i--){
                              let $answer = answerShuffle.splice(Math.floor(Math.random()*answerShuffle.length), 1)
                              $answer[0].appendTo($answers)
                            }
                            answerShuffle = []

                  } else if(question.type === 'multiple'){
                    const $correct =
                            $('<div>')
                            .addClass('correct-answer')
                            .text(question.correct_answer.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "and"))
                            answerShuffle.push($correct)

                    const $incorrect = () => {
                      for(let incorrectOption of question.incorrect_answers){
                        const $incorrectOption =
                                    $('<div>')
                                    .addClass('incorrect-answer')
                                    .text(incorrectOption.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "and"))
                                    answerShuffle.push($incorrectOption)

                      }
                    }
                    $incorrect()
                    console.log(answerShuffle.length);
                    for( let i = 4; i > 0 ; i--){
                      let $answer = answerShuffle.splice(Math.floor(Math.random()*answerShuffle.length), 1)
                      $answer[0].appendTo($answers)
                    }
                  } answerShuffle = []

       }
       const $results = $('<div>').addClass('question-box').attr('id', 'results')
       const $score = $('<h2>').addClass('score-board')
       const $restart = $('<div>').addClass('restart').text('RESTART')
       $results.append($score)
       $results.append($restart)
       $restart.on('click', start)
       $('.question-container').append($results)
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
            scoreBoard++
            $score.text(`Your score is: ${scoreBoard*10}%`)
            setTimeout(switchNext, 1500)
          })




    });
  })
}
start()
