import generateArray from '../../src/libs/generateArray';

describe('generateArray', () => {
  it('should generate an array of specified length with incremented values', () => {
    const result = generateArray(5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an empty array when n is 0', () => {
    const result = generateArray(0);
    expect(result).toEqual([]);
  });
});
