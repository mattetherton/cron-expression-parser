import parserExecutor from '../src/parser';

describe('Parser', () => {
    describe('When parsing any (*) expressions', () => {
        it('Should return all values in range for expression *', () => {
            const result = parserExecutor('*', 'month');
            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        })
    });

    describe('When passing interval (/) expressions', () => {
        it('Should return all values in range for expression */15', () => {
            const result = parserExecutor('*/15', 'minute');
            expect(result).toEqual([0, 15, 30, 45])
        });

        it('Should return all values in range for expression 5-10/15', () => {
            const result = parserExecutor('5-15/15', 'minute');
            expect(result).toEqual([15])
        });

        it('Should throw an error for an invalid interval expression', () => {
            expect(() => parserExecutor('/', 'minute')).toThrowError();
            expect(() => parserExecutor('//', 'minute')).toThrowError();
            expect(() => parserExecutor('*/*', 'minute')).toThrowError();
        });
    });

    describe('When parsing ranges (-) expressions', () => {
        it('Should return all values in range for expression 1-5', () => {
            const result = parserExecutor('1-5', 'dayOfWeek');
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        it('Should throw an error for an invalid range expression', () => {
            expect(() => parserExecutor('5-', 'dayOfWeek')).toThrowError();
            expect(() => parserExecutor('-5', 'dayOfWeek')).toThrowError();
            expect(() => parserExecutor('-', 'dayOfWeek')).toThrowError();
        });

        it('Should throw an error for a range out of bounds', () => {
            expect(() => parserExecutor('5-50', 'dayOfWeek')).toThrowError();
        });
    });

    describe('When passing expression numbers as type string', () => {
        it('Should return a number', () => {
            const result = parserExecutor('0', 'hour');
            expect(typeof result).toBe('number')
        });
    });
});