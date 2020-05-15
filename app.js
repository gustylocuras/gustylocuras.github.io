
  let token = ''
  let difficulty = ''

  $('#easy').on('click', (event) => {
    difficulty = 'easy'
  })
  $.ajax({

   	"url": "https://opentdb.com/api_token.php?command=request"

  }).then((data)=> {
     token = data.token;
     console.log(token);
  });

  $('#start').on('click', (event) => {

    $.ajax({

     	"url": "https://opentdb.com/api.php?amount=10&token=" + token + "&difficulty=" + difficulty,

    }).then((data)=> {
       console.log(data);

    });
  })
