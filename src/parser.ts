import range from 'lodash.range';

type CronExpressionRange = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek'

enum SpecialCharacters {
    any = '*',
    list = ',',
    range = '-',
    interval = '/'
}

type AllowedRanges = {
    [expression in  CronExpressionRange]: {
        min: number,
        max: number
    }
}

const allowedRanges: AllowedRanges = {
    minute: {
        min: 0,
        max: 60,
    },
    hour: {
        min: 0,
        max: 24
    },
    dayOfMonth: {
        min: 1,
        max: 32
    },
    month: {
        min: 1,
        max: 13
    },
    dayOfWeek: {
        min: 1,
        max: 8
    }
}

const parseAny = (_: string, expressionRange: CronExpressionRange): number[] => {
    return range(allowedRanges[expressionRange].min, allowedRanges[expressionRange].max);
};

const parseIntervals = (expression: string, expressionRange: CronExpressionRange): number[] => {
    const [start, end] = expression.split(SpecialCharacters.interval);

    const calculateIntervals = (intervalRange: number[]) => intervalRange.map((i: number) => {
        if (i % Number(end) == 0) {
            return i
        }
    }).filter(i => i !== undefined) as number[];

    if (start === SpecialCharacters.any) {
        if (!Number(end)) {
            throw `Range is not a number in expression: ${expression}`
        }

        const currentRange = range(allowedRanges[expressionRange].min, allowedRanges[expressionRange].max);
        return calculateIntervals(currentRange);
    }

    // specialCharacters.range e.g. 5-15/15
    const parsedRange = parseRanges(start, expressionRange);
    return calculateIntervals(parsedRange)
}

const parseRanges = (expression: string, expressionRange: CronExpressionRange) => {
    const [start, end] = expression.split(SpecialCharacters.range);
    const startAsNum = Number(start), endAsNum = Number(end);

    if (!startAsNum || !endAsNum) {
        throw `Range is not a number in expression: ${expression}`
    }

    if (startAsNum < allowedRanges[expressionRange].min || endAsNum > allowedRanges[expressionRange].max) {
        throw `Invalid range for ${expressionRange}`
    }

    return range(startAsNum, endAsNum + 1);
};

const parserExecutor = (expression: string, expressionRange: CronExpressionRange): number | number[] => {
    if (expression === SpecialCharacters.any) {
        return parseAny(expression, expressionRange)
    }

    if (expression.includes(SpecialCharacters.interval)) { // intervals must go before range
        return parseIntervals(expression, expressionRange)
    }

    if (expression.includes(SpecialCharacters.range)) {
        return parseRanges(expression, expressionRange)
    }
    


    return Number(expression); // no parsing required i.e 0 for hour.
}

export default parserExecutor;
