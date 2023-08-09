// const fs = require('fs')
// fs.writeFileSync('hello.txt', 'I am writing code in Node JS')

async function printSequence() {
    console.log('a');
    console.log('b');
   
    await new Promise((resolve) => setTimeout(() => {
     console.log('c');
     resolve();
    }, 3000));
   
    await new Promise((resolve) => setTimeout(() => {
     console.log('d');
     resolve();
    }, 0));
    
    console.log('e');
   
   }
   
   printSequence();