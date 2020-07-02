function asyncGet(done) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', 'big.json', true);
  xmlHttp.send(null);
  xmlHttp.onload = function (e) {
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200) {
        done('Success');
      } else {
        done(xmlHttp.statusText);
      }
    }
  };
}

function syncGet() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', 'big.json', false);
  xmlHttp.send(null);

  console.log(xmlHttp.responseText);
}

function computation(done) {
  let acum = 0;
  let cond = 999999999 * 2;
  for (let i = 0; i < cond; ++i) {
    acum = acum + i;
  }
  done(acum);
  return acum;
}