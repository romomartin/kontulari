import mysql from "mysql2/promise";
import { AccountsRepository, Expense } from "./accounts-repository";

describe("Accounts repository", () => {
  beforeEach(async () => {
    await populateFakeDatabase();
  });
  afterEach(async () => {
    await emptyFakeDatabase();
  });

  it("allows getting all expenses from the database", async () => {
    const repository = new AccountsRepository();

    const expenses = await repository.getExpenses();

    expect(expenses).toEqual([
      {
        id: 1,
        creationTimestamp: expect.any(Number),
        bankAccount: "Evo",
        accountingDate: new Date(0),
        valueDate: new Date(0),
        ogDescription: "description",
        amount: 12.56,
        balance: 1246.07,
        description: "my description"
      }
    ]);
  });

  it("allows adding a expense to the database", async () => {
    const repository = new AccountsRepository();
    const expense: Expense = {
      id: 1,
      creationTimestamp: expect.any(Number),
      bankAccount: "Evo",
      accountingDate: new Date(0),
      valueDate: new Date(0),
      ogDescription: "description",
      amount: 12.56,
      balance: 1246.07,
      description: "my description"
    };

    const addedExpense = await repository.addExpense(expense);

    expect(addedExpense).toEqual(expense);
  });
});

const populateFakeDatabase = async () => {
  const connection = await mysql.createConnection({
    host: "fake-database",
    user: "root",
    password: "root",
    database: "test"
  });
  await connection.query(
    `INSERT INTO expenses (bank_account,accounting_date,value_date,
    og_description,amount,balance,description) VALUES (?,?,?,?,?,?,?)`,
    [
      "Evo",
      new Date(0),
      new Date(0),
      "description",
      12.56,
      1246.07,
      "my description"
    ]
  );
  await connection.end();
};

const emptyFakeDatabase = async () => {
  const connection = await mysql.createConnection({
    host: "fake-database",
    user: "root",
    password: "root",
    database: "test"
  });
  await connection.query("DELETE FROM expenses");
  await connection.query("ALTER TABLE expenses AUTO_INCREMENT = 1");
  await connection.end();
};
