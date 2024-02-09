import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 21, action: Action.Add });
    expect(result).toBe(28);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 456,
      b: 322,
      action: Action.Subtract,
    });
    expect(result).toBe(134);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 47, b: 35, action: Action.Multiply });
    expect(result).toBe(1645);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 48, b: 8, action: Action.Divide });
    expect(result).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(27);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    let result = simpleCalculator({ a: 'invalid', b: 5, action: Action.Add });
    expect(result).toBeNull();

    result = simpleCalculator({ a: 7, b: 'invalid', action: Action.Add });
    expect(result).toBeNull();

    result = simpleCalculator({
      a: 'invalid',
      b: 'invalid',
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
