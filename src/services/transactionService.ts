import { Transaction, Statistics } from "../types/transaction";
import { isAfter, subSeconds } from "date-fns";

let transactions: Transaction[] = [];

export const addTransaction = (transaction: Transaction): boolean => {
  const transactionDate = new Date(transaction.dataHora);
  const now = new Date();

  if (
    transaction.valor < 0 ||
    isAfter(transactionDate, now) ||
    !transaction.valor ||
    !transaction.dataHora
  ) {
    return false;
  }

  transactions.push(transaction);
  return true;
};

export const clearTransactions = (): void => {
  transactions = [];
};
