var express = require('express');
var moment = require('moment');

var app = express();

app.get('/:input', (req, res) => {
  const input = req.params.input;
  let result = {
    unix: null,
    natural: null,
  };

  if (input.match(/^[0-9]+/g)) {
    let date = moment(Number(input));
    if (date.isValid()) {
      result.unix = date.toDate().getTime();;
      result.natural = date.format('MMMM DD, YYYY');
    } 
  } else {
    let date = moment(input);

    if (date.isValid()) {
      result.unix = date.toDate().getTime();
      result.natural = date.format('MMMM DD, YYYY');
    }
  }

    
  res.json(result);
});

app.listen(process.env.PORT || 3000);
