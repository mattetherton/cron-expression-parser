import parserExecutor from '../src/parser';

describe('Parser', () => {
    describe('When parsing any (*) expressions', () => {
        it('Should return all values in range for expression *', () => {
            const result = parserExecutor('*', 'month');
            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        })
    });

    describe('When passing expression numbers as type string', () => {
        it('Should return a number', () => {
            const result = parserExecutor('0', 'hour');
            expect(typeof result).toBe('number')
        });
    });
});