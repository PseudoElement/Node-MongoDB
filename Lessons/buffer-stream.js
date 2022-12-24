const fs = require('fs');
const zlib = require('zlib');
const readStream = fs.createReadStream('./folder/newDoc.txt');
const writeStream = fs.createWriteStream('./folder/writtenDoc.txt');
const compressStream = zlib.createGzip();
// readStream.on('data', chunk=>{
//     writeStream.write(`\n----Start---\n`);
//     writeStream.write(chunk);
//     writeStream.write(`\n---End---\n`)
// });
const handleError = ()=>{//Удаление потока в случае ошибки
    console.log('Error');
    readStream.destroy();
    writeStream.end('Finished with error...');
}
readStream
.on('error', handleError)
.pipe(compressStream)//comress data in  file
.pipe(writeStream)//write text from newDoc in writtenDoc with chunks
.on('error', handleError)