const cluster = require('cluster');

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const express = require('express');
  const app = express();
  app.get('/hello', (req, res) => {
    res.send('Hello');
  });
  const port = 4002;
  app.listen(port)
}

// Listen for dying workers
cluster.on('exit', function (worker) {
  // Replace the dead worker
  console.log('Worker %d died :(', worker.id);
  cluster.fork();
});
