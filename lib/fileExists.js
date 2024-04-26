const { readFile } = require('fs/promises');
const path = require('path')

/* 

  Using readFile is a nice, easy way to check if a file exists. I'm using the asynchronous version 
  so that it's easier to send back the data result than it would be with a callback function. 

  The catch block at the end of the readFile prevents readFile from throwing an error that would crash 
  the server if the file doesn't exist.
*/

async function checkFile(filename){
  const data = await readFile(filename, 'utf-8').catch( (err) => console.log('file not found'));
  return data ? true : false
}


module.exports = { checkFile }
