// Uncomment the code below and write your tests
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import path from 'node:path';
import fs from 'fs';
import fsPromise from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timerCB = jest.fn(() => {
      console.log('Hi from callBack !!!!!!!!!!!!!!!!!!!!!');
    });
    const delay = 2000;
    doStuffByTimeout(timerCB, delay);

    expect(timerCB).not.toBeCalled();
    jest.runAllTimers(); // Fast-forward the timers
    expect(timerCB).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(timerCB, delay);
  });

  test('should call callback only after timeout', () => {
    const timerCB = jest.fn(() => {
      console.log('Hi from callBack 2 !!!!!!!!!!!!!!!!!!!!!');
    });
    const delay = 1000;
    doStuffByTimeout(timerCB, delay);
    expect(timerCB).not.toBeCalled();

    jest.advanceTimersByTime(delay);
    expect(timerCB).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const timerCB = jest.fn(() => {
      console.log('Hi from setInterval !!!!!!!!!!!!!!!!!!!!!');
    });
    const delay = 1000;
    doStuffByInterval(timerCB, delay);
    expect(timerCB).not.toBeCalled();

    jest.advanceTimersByTime(delay);
    expect(timerCB).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(timerCB, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const timerCB = jest.fn();
    const delay = 1500;
    doStuffByInterval(timerCB, delay);
    expect(timerCB).not.toBeCalled();

    const timesCheck = 10;
    for (let i = 1; i <= timesCheck; i++) {
      jest.advanceTimersByTime(delay);
      expect(timerCB).toHaveBeenCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const fakePath = './folder/file.txt';

    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(fakePath);

    expect(joinSpy).toBeCalled();
    expect(joinSpy).toBeCalledWith(__dirname, fakePath);
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    existsSyncSpy.mockReturnValue(false);
    const result = await readFileAsynchronously('anyString');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    existsSyncSpy.mockReturnValue(true);

    const readFileSpy = jest.spyOn(fsPromise, 'readFile');
    const mockContentFile = 'some content value';
    readFileSpy.mockResolvedValue(mockContentFile);

    const result = await readFileAsynchronously('anyString');
    expect(result).toBe(mockContentFile);
  });
});
