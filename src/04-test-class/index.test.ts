// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  const initBalance = 234;
  const clientBankAccount = getBankAccount(initBalance);
  const transferBankAccount = getBankAccount(initBalance);

  test('should create account with initial balance', () => {
    expect(clientBankAccount).toBeInstanceOf(BankAccount);
    expect(clientBankAccount.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      clientBankAccount.withdraw(initBalance + 10);
    } catch (err) {
      expect(err).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      clientBankAccount.transfer(initBalance + 10, transferBankAccount);
    } catch (err) {
      expect(err).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      clientBankAccount.transfer(initBalance + 10, clientBankAccount);
    } catch (err) {
      expect(err).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    const depositAmount = 100;
    const startBalance = clientBankAccount.getBalance();
    clientBankAccount.deposit(depositAmount);
    expect(clientBankAccount.getBalance()).toBe(startBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 50;
    const startBalance = clientBankAccount.getBalance();
    clientBankAccount.withdraw(withdrawAmount);
    expect(clientBankAccount.getBalance()).toBe(startBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const transferAmount = 20;
    const startClientBalance = clientBankAccount.getBalance();
    const startTransferBalance = transferBankAccount.getBalance();

    clientBankAccount.transfer(transferAmount, transferBankAccount);
    expect(clientBankAccount.getBalance()).toBe(
      startClientBalance - transferAmount,
    );
    expect(transferBankAccount.getBalance()).toBe(
      startTransferBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fBalance = await clientBankAccount.fetchBalance();
    if (fBalance) expect(typeof fBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fBalance = await clientBankAccount.fetchBalance();
    const startClientBalance = clientBankAccount.getBalance();
    if (fBalance) {
      clientBankAccount.deposit(fBalance);
      expect(clientBankAccount.getBalance()).toBe(
        startClientBalance + fBalance,
      );
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await clientBankAccount.synchronizeBalance();
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
