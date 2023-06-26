// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const someValue = 'someStringValue';
    const result = await resolveValue(someValue);
    expect(result).toBe(someValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Some error message';
    try {
      throwError(msg);
    } catch (err: unknown) {
      const knownErr = err as Error;
      expect(knownErr).toBeInstanceOf(Error);
      expect(knownErr.message).toBe(msg);
    }
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMsg = 'Oops!';
    try {
      throwError();
    } catch (err: unknown) {
      const knownErr = err as Error;
      expect(knownErr).toBeInstanceOf(Error);
      expect(knownErr.message).toBe(defaultMsg);
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (err) {
      const knownErr = err as MyAwesomeError;
      expect(knownErr).toBeInstanceOf(MyAwesomeError);
      expect(knownErr).toBeInstanceOf(Error);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    rejectCustomError().catch((err) => {
      expect(err).toBeInstanceOf(MyAwesomeError);
      expect(err).toBeInstanceOf(Error);
    });
  });
});
