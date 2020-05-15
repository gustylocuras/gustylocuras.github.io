
  let token = ''

  $.ajax({

   	"url": "https://opentdb.com/api_token.php?command=request"

  }).then((data)=> {
     token = data.token;
     console.log(token);
  });

  $('#start').on('click', (event) => {

    $.ajax({

     	"url": "https://opentdb.com/api.php?amount=10&token=" + token,

    }).then((data)=> {
       console.log(data);

    });
  })
