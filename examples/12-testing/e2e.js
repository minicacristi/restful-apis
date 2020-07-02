const assert = require('assert');

async function testRateLimit() {
  try {
    let promises = [];
    // not that good
    const fetch = require('node-fetch');
    for (let i = 0; i < 8; ++i) {
      promises.push(fetch('http://localhost:4001'));
    } 
    await Promise.all(promises);
    
    const resLastPermitted = await fetch('http://localhost:4001');
    assert(resLastPermitted.status !== 429);
    
    const resFirstDenied = await fetch('http://localhost:4001');
    assert(resFirstDenied.status === 429);
  } catch (err) {
    console.error(err.message);
  }
}

testRateLimit();