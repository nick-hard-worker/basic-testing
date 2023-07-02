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
    function withdrawThrowError() {
      clientBankAccount.withdraw(initBalance + 10);
    }
    expect(withdrawThrowError).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    function transferThrowError() {
      clientBankAccount.transfer(initBalance + 10, transferBankAccount);
    }
    expect(transferThrowError).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    function transferThrowError() {
      clientBankAccount.transfer(initBalance - 10, clientBankAccount);
    }
    expect(transferThrowError).toThrow(TransferFailedError);
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
    const mockedFetchBalance = 50;
    jest
      .spyOn(clientBankAccount, 'fetchBalance')
      .mockResolvedValue(mockedFetchBalance);

    await clientBankAccount.synchronizeBalance();
    expect(clientBankAccount.getBalance()).toBe(mockedFetchBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(clientBankAccount, 'fetchBalance').mockResolvedValue(null);

    async function thrownSynchronizationFailedError() {
      await clientBankAccount.synchronizeBalance();
    }
    await expect(thrownSynchronizationFailedError).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
