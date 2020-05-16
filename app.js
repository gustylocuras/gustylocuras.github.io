
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

       }



    });
  })
