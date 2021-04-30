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

const parserExecutor = (expression: string, expressionRange: CronExpressionRange): number | number[] => {
    if (expression === SpecialCharacters.any) {
        return parseAny(expression, expressionRange)
    }

    return Number(expression); // no parsing required i.e 0 for hour.
}

export default parserExecutor;
