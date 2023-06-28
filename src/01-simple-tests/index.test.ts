// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let result = simpleCalculator({ a: 5, b: 8, action: Action.Add });
    expect(result).toBe(13);
    result = simpleCalculator({ a: -3, b: -10, action: Action.Add });
    expect(result).toBe(-13);
    result = simpleCalculator({ a: 6.4, b: 0.6, action: Action.Add });
    expect(result).toBeCloseTo(7);
  });

  test('should subtract two numbers', () => {
    let result = simpleCalculator({ a: 5, b: 8, action: Action.Subtract });
    expect(result).toBe(-3);
    result = simpleCalculator({ a: -3, b: -10, action: Action.Subtract });
    expect(result).toBe(7);
    result = simpleCalculator({ a: 6.4, b: 0.6, action: Action.Subtract });
    expect(result).toBeCloseTo(5.8);
  });

  test('should multiply two numbers', () => {
    let result = simpleCalculator({ a: 5, b: 8, action: Action.Multiply });
    expect(result).toBe(40);
    result = simpleCalculator({ a: -3, b: -10, action: Action.Multiply });
    expect(result).toBe(30);
    result = simpleCalculator({ a: 6.4, b: 0.6, action: Action.Multiply });
    expect(result).toBeCloseTo(3.84, 8);
  });

  test('should divide two numbers', () => {
    let result = simpleCalculator({ a: 8, b: 2, action: Action.Divide });
    expect(result).toBe(4);
    result = simpleCalculator({ a: -5, b: -2, action: Action.Divide });
    expect(result).toBeCloseTo(2.5, 8);
    result = simpleCalculator({ a: 6.4, b: -0.2, action: Action.Divide });
    expect(result).toBeCloseTo(-32, 8);
  });

  test('should exponentiate two numbers', () => {
    let result = simpleCalculator({ a: 8, b: 2, action: Action.Exponentiate });
    expect(result).toBe(64);
    result = simpleCalculator({ a: -5, b: -2, action: Action.Exponentiate });
    expect(result).toBeCloseTo(0.04, 8);
    result = simpleCalculator({ a: 6.4, b: -0.2, action: Action.Exponentiate });
    expect(result).toBeCloseTo(0.69, 3);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 8, b: 2, action: 'someAction' });
    expect(result).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    let result = simpleCalculator({ a: '8', b: 2, action: Action.Add });
    expect(result).toBeNull;
    result = simpleCalculator({ a: 8, b: 'digit', action: Action.Multiply });
    expect(result).toBeNull;
    result = simpleCalculator({ a: null, b: 3, action: Action.Multiply });
    expect(result).toBeNull;
    result = simpleCalculator({ a: undefined, b: 3, action: Action.Substract });
    expect(result).toBeNull;
  });
});
