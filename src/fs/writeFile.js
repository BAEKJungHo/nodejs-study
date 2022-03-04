const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 작성됩니다.')
    .then((data) => {
        return fs.readFile('/writeme.txt');
    })
    .then((data) => { // promise chain
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });