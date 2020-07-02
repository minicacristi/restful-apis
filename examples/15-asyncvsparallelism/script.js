function singleAsync() {
  asyncGet(function(res) {
    console.log(res);
  })
  console.log('Single Async')
}

function singleSync() {
  syncGet();
  console.log('Download finished!');
  console.log('Single Sync')
}

function parallelAsync() {
  console.log('Parallel Async')
  let asyncWorker = new Worker('worker_async.js');
  asyncWorker.onmessage = function(event){
    console.log(event.data);
  };
}

function asyncComputation () {
  console.log('Async Computation')
  computation(function(acum) {
    console.log(acum)
  });
}

function parallelSync() {
  console.log('Parallel Sync')
  let computationWorker = new Worker('worker_computation.js');
  let received = false;

  computationWorker.onmessage = function(event){
    console.log(event.data);
    received = true;
  };
}


function spinner() {
  let spinnerEl = document.getElementById('spinner');
  spinnerEl.innerText = spinnerEl.innerText === '/' ? "\\" : '/'
  setTimeout(spinner, 100);
}
spinner();