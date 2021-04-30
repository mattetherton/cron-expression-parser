import processCronExpression from './processor';

const main = (): string => {
    const cronInput = process.argv;
    try {
       return processCronExpression(cronInput);
    } catch(err) {
        return `Error: ${err}`;
    }
}

// for cli output
console.log(main());