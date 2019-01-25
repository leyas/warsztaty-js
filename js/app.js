function first(){
  $.ajax({
      url: 'http://date.jsontest.com',
      type: 'GET',
      dataType: 'json'
  }).done(function (result) {
      console.log(result.data);
      console.log(result.milliseconds_since_epoch);
      console.log(result.time);
  });
}

function second(){
  $.ajax({
      url: 'https://swapi.co/api/people/4/',
      type: 'GET',
      dataType: 'json'
  }).done(function (result) {
      console.log(result);
  });
}

second();
