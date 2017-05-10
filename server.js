var express = require('express');
var moment = require('moment');

var app = express();

app.get('/', (req, res) => {
  const date = Date.now();
  res.set('Content-Type', 'text/plain');
  res.end(`This is a timestamp microservice. Try it by passing a date to the URL like so: https://johncrisostomo-timestamp.herokuapp.com/${Math.trunc(date/1000)}`);
});

app.get('/:input', (req, res) => {
  res.set('Content-Type', 'application/json');

  const input = req.params.input;
  let result = {
    unix: null,
    natural: null,
  };

  if (input.match(/^[0-9]+/g)) {
    let date = moment.unix(new Date(Number(input)));
    if (date.isValid()) {
      preparePayload(result, date);
    } 
  } else {
    let date = moment(new Date(input));

    if (date.isValid()) {
      preparePayload(result, date);
    }
  }
    
  res.json(result);
});

function preparePayload(result, date) {
  result.unix = Math.round(date.toDate().getTime() / 1000);
  result.natural = date.format('MMMM DD, YYYY');
}

app.listen(process.env.PORT || 3000);
