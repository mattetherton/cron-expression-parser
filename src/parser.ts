import range from 'lodash.range';

type CronExpressionRange = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek'

enum SpecialCharacters {
    any = '*',
    list = ',',
    range = '-',
    intervals = '/'
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

    if (expression.includes(SpecialCharacters.range)) {
        return parseRanges(expression, expressionRange)
    }


    return Number(expression); // no parsing required i.e 0 for hour.
}

export default parserExecutor;
