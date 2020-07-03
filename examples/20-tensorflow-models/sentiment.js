const fetch = require('node-fetch');
const tf = require("@tensorflow/tfjs");
const express = require('express');
const app = express();

const bp = require('body-parser');
app.use(bp.json());

// basic no-op, we need to wait
let predict = (text) => 0.5;

app.post('/analyze', async (req, res) => {
  try {
    const text = req.body.text;
    const prediction = await predict(text);
    res.json({
      prediction
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const predictSetup = (model, metadata) => {
  return async function (text) {
    const trimmed = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    const sequence = trimmed.map(word => {
      const wordIndex = metadata.word_index[word];
      if (typeof wordIndex === 'undefined') {
        return  2; //oov_index
      }

      return wordIndex + metadata.index_from;
    });
    const padSequences = (sequences, metadata) => {
      return sequences.map(seq => {
        if (seq.length > metadata.max_len) {
          seq.splice(0, seq.length - metadata.max_len);
        }
        if (seq.length < metadata.max_len) {
          const pad = [];
          for (let i = 0; i < metadata.max_len - seq.length; ++i) {
            pad.push(0);
          }
          seq = pad.concat(seq);
        }
        return seq;
      });
    }
    const paddedSequence = padSequences([sequence], metadata);
    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    return score;
  }
};

async function setup (port) {
  
  let metadata = await fetch("https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json")
  metadata = await metadata.json()

  const url = `https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json`;
  const model = await tf.loadLayersModel(url);
  predict = predictSetup(model, metadata)

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });
}

const port = 5000;
setup(port)