import request from "supertest";
import express from "express";
import { Transaction } from "../types/transaction";
import {
  addTransaction,
  clearTransactions,
  getStatistics,
} from "../services/transactionService";

const app = express();
app.use(express.json());

// Rotas
app.post("/transacao", (req, res) => {
  const transaction: Transaction = req.body;
  const success = addTransaction(transaction);
  if (!success) {
    return res.sendStatus(422);
  }
  res.sendStatus(201);
});

app.delete("/transacao", (req, res) => {
  clearTransactions();
  res.sendStatus(200);
});

app.get("/estatistica", (req, res) => {
  const statistics = getStatistics();
  res.json(statistics);
});

// Testes
describe("API de Transações", () => {
  beforeEach(() => {
    clearTransactions();
  });

  it("Deve criar uma transação", async () => {
    const response = await request(app).post("/transacao").send({
      valor: 100,
      dataHora: new Date().toISOString(),
    });

    expect(response.status).toBe(201);
  });

  it("Deve criar uma transação", async () => {
    const response = await request(app).post("/transacao").send({
      valor: 100,
      dataHora: new Date().toISOString(),
    });

    expect(response.status).toBe(201);
  });

  it("Não deve criar uma transação com valor negativo", async () => {
    const response = await request(app).post("/transacao").send({
      valor: -100,
      dataHora: new Date().toISOString(),
    });

    expect(response.status).toBe(422);
  });

  it("Deve limpar as transações", async () => {
    await request(app).post("/transacao").send({
      valor: 100,
      dataHora: new Date().toISOString(),
    });
    const response = await request(app).delete("/transacao");
    expect(response.status).toBe(200);
  });

  it("Deve retornar estatísticas", async () => {
    await request(app).post("/transacao").send({
      valor: 100,
      dataHora: new Date().toISOString(),
    });
    const response = await request(app).get("/estatistica");
    expect(response.status).toBe(200);
  });
});
