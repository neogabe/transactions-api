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

export const getStatistics = (): Statistics => {
  const now = new Date();
  const oneMinuteAgo = subSeconds(now, 60);

  const recentTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.dataHora);
    return transactionDate >= oneMinuteAgo && transactionDate <= now;
  });

  if (recentTransactions.length === 0) {
    return {
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    };
  }

  const values = recentTransactions.map((transaction) => transaction.valor);
  const count = values.length;
  const sum = values.reduce((acc, curr) => acc + curr, 0);

  return {
    count,
    sum,
    avg: sum / count,
    min: Math.min(...values),
    max: Math.max(...values),
  };
};
