import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('test value')).resolves.toEqual('test value');
    await expect(resolveValue(456)).resolves.toEqual(456);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Error message')).toThrow('Error message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
     expect(() => throwCustomError()).toThrow(MyAwesomeError);
     expect(() => throwCustomError()).toThrow(
       'This is my awesome custom error!',
     );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
