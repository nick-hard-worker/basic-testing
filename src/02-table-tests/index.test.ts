// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCasesWithIntegers = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 5, b: 8, action: Action.Subtract, expected: -3 },
  { a: -3, b: -10, action: Action.Subtract, expected: 7 },
  { a: 5, b: 7, action: Action.Multiply, expected: 35 },
  { a: -3, b: -2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: -10, b: 2, action: Action.Divide, expected: -5 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: -10, b: 2, action: Action.Exponentiate, expected: 100 },
];
const testCasesWithFloat = [
  { a: 6.4, b: 0.6, action: Action.Subtract, expected: 5.8 },
  { a: 3, b: -0.2, action: Action.Multiply, expected: -0.6 },
  { a: 3, b: -0.2, action: Action.Add, expected: 2.8 },
  { a: 20, b: -0.2, action: Action.Divide, expected: -100 },
  { a: -10, b: -2, action: Action.Exponentiate, expected: 0.01 },
];

const testCasesWithInvalidArgs = [
  { a: 6.4, b: 0.6, action: 'someAction' },
  { a: 3, b: '5', action: Action.Multiply },
  { a: null, b: -0.2, action: Action.Add },
  { a: 20, b: undefined, action: Action.Divide },
  { a: true, b: -2, action: Action.Exponentiate },
];

describe.each(testCasesWithIntegers)(
  `test simpleCalculator with set of data`,
  ({ a, b, action, expected }) => {
    test(`should calculate two numbers with action ${action}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);

describe.each(testCasesWithFloat)(
  `test simpleCalculator with set of float numbers`,
  ({ a, b, action, expected }) => {
    test(`should calculate two numbers with action ${action}`, () => {
      expect(simpleCalculator({ a, b, action })).toBeCloseTo(expected, 8);
    });
  },
);

describe.each(testCasesWithInvalidArgs)(
  `should return null for invalid arguments or action`,
  ({ a, b, action }) => {
    test(`should calculate two numbers with action ${action}`, () => {
      expect(simpleCalculator({ a, b, action })).toBeNull;
    });
  },
);
