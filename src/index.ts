import express from "express";
import dotenv from "dotenv";
import { Transaction } from "./types/transaction";
import {
  addTransaction,
  clearTransactions,
} from "./services/transactionService";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/transacao", (req: express.Request, res: express.Response) => {
  try {
    const transaction: Transaction = req.body;

    if (!transaction.valor || !transaction.dataHora) {
      res.sendStatus(400);
      return;
    }

    const success = addTransaction(transaction);
    if (!success) {
      res.sendStatus(422);
      return;
    }

    res.sendStatus(201);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
});

app.delete("/transacao", (req: express.Request, res: express.Response) => {
  try {
    clearTransactions();
    res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao limpar transações:", error);
    res.sendStatus(400);
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `O servidor está rodando em http://localhost:${process.env.PORT}`
  );
});
