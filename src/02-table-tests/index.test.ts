import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 'invalid', b: 2, action: Action.Add, expected: null },
  { a: 2, b: 'invalid', action: Action.Multiply, expected: null },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  { a: 2, b: 3, action: 'unknown', expected: null },
];

describe.each(testCases)(
  'simpleCalculator with action $action',
  ({ a, b, action, expected }) => {
    test(`given ${a} and ${b} - expects ${expected}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  },
);