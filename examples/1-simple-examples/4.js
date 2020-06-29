const fs = require('fs');
const start = new Date().getTime();
const data = fs.readFileSync('asyncvsparallelism/big.json', {
  encoding: 'UTF-8'
});

fs.writeFileSync('asyncvsparallelism/big2.json', data)
const end = new Date().getTime();
console.log(`A durat ${end - start} de ms`);
