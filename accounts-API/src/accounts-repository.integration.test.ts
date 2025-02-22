import mysql from "mysql2/promise";
import { getExpenses } from "./accounts-repository";

describe("Accounts repository", () => {
  beforeEach(async () => {
    await populateFakeDatabase();
  });

  describe("expenses", () => {
    it("allows getting all expenses in the database", async () => {
      const expenses = await getExpenses();

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
