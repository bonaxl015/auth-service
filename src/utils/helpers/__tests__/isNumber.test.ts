import isNumber from '../isNumber';

describe('isNumber', () => {
  it('should return true when input is a number', () => {
    const integerValue = isNumber(1);
    const floatValue = isNumber(1.2);
    const negativeValue = isNumber(-1);
    const zeroValue = isNumber(0);

    expect(integerValue).toBe(true);
    expect(floatValue).toBe(true);
    expect(negativeValue).toBe(true);
    expect(zeroValue).toBe(true);
  });

  it('should return false when input is not a number', () => {
    const stringValue = isNumber('');
    const booleanValue = isNumber(true);
    const functionValue = isNumber(() => {});
    const objectValue = isNumber({});
    const arrayValue = isNumber([]);
    const nullValue = isNumber(null);
    const undefinedValue = isNumber(undefined);

    expect(stringValue).toBe(false);
    expect(booleanValue).toBe(false);
    expect(functionValue).toBe(false);
    expect(objectValue).toBe(false);
    expect(arrayValue).toBe(false);
    expect(nullValue).toBe(false);
    expect(undefinedValue).toBe(false);
  });
});
