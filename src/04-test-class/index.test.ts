import { InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 70;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 50;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(balance + 10)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance1 = 70;
    const balance2 = 50;
    const account1 = getBankAccount(balance1);
    const account2 = getBankAccount(balance2);
    expect(() => account1.transfer(balance1 + 10, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 70;
    const account = getBankAccount(balance);
    expect(() => account.transfer(balance - 10, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 777;
    const deposit = 50;
    const account = getBankAccount(balance);
    const initialBalance = account.getBalance();
    expect(account.deposit(deposit).getBalance()).toBe(
      initialBalance + deposit,
    );
  });

  test('should withdraw money', () => {
    const balance = 600;
    const withdraw = 5;
    const account = getBankAccount(balance);
    const initialBalance = account.getBalance();

    expect(account.withdraw(withdraw).getBalance()).toBe(
      initialBalance - withdraw,
    );
  });

  test('should transfer money', () => {
    const balance1 = 100;
    const balance2 = 50;
    const transfer = 50;

    const account1 = getBankAccount(balance1);
    const account2 = getBankAccount(balance2);
    const initialBalance1 = account1.getBalance();
    const initialBalance2 = account2.getBalance();

    expect(account1.transfer(50, account2).getBalance()).toBe(
      initialBalance1 - transfer,
    );

    expect(account2.getBalance()).toBe(initialBalance2 + transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(10).mockReturnValueOnce(1);
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');

    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchBalance = 50;
    const balance = 100;
    const account = getBankAccount(balance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(fetchBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(fetchBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 100;
    const account = getBankAccount(balance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
