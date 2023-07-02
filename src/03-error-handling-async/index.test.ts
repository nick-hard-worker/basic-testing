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
    const thrownErr = function () {
      throwError(msg);
    };
    expect(thrownErr).toThrow(Error);
    expect(thrownErr).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMsg = 'Oops!';
    const thrownErr = function () {
      throwError();
    };
    expect(thrownErr).toThrow(Error);
    expect(thrownErr).toThrow(defaultMsg);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const thrownErr = function () {
      throwCustomError();
    };
    expect(thrownErr).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const thrownErr = async function () {
      await rejectCustomError();
    };
    await expect(thrownErr).rejects.toThrow(MyAwesomeError);
  });
});
