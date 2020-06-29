const fs = require('fs');
const start = new Date().getTime();

const rs = fs.createReadStream('asyncvsparallelism/big.json');

const ws = fs.createWriteStream('asyncvsparallelism/big2.json');

rs.pipe(ws);
const end = new Date().getTime();
console.log(`A durat ${end - start} de ms`);
