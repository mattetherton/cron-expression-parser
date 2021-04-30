import parserExecutor from './parser';

const formatParser = (result: number | number[]): string => {
    if (Array.isArray(result) && result.length > 0) {
        return result.join(' ');
    }
    return result.toString();
};

const processCronExpression = (args: string[]): string => {
    const cronInput = args[2]; // process.argv[2] is the cli input

    if (typeof cronInput !== 'string') {
        throw 'input must be a string';
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek, cmd] = cronInput.split(' ');
    if (!minute || !hour || !dayOfMonth || !month || !dayOfWeek || !cmd) {
        throw 'Must provide 6 parameters';
    }

    return `
        minute: ${formatParser(parserExecutor(minute, 'minute'))}
        hour: ${formatParser(parserExecutor(hour, 'hour'))}
        day of month: ${formatParser(parserExecutor(dayOfMonth, 'dayOfMonth'))}
        month: ${formatParser(parserExecutor(month, 'month'))}
        day of week ${formatParser(parserExecutor(dayOfWeek, 'dayOfWeek'))}
        command: ${cmd}
    `;
}

export default processCronExpression;
