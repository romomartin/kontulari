import mysql from "mysql2/promise";

type Expense = {
  id: number;
  creationTimestamp: number;
  bankAccount: string;
  accountingDate: Date;
  valueDate: Date;
  ogDescription: string;
  amount: number;
  balance: number;
  description: string;
};

export const getExpenses = async (): Promise<Expense[]> => {
  const connection = await mysql.createConnection({
    host: "fake-database",
    user: "root",
    password: "root",
    database: "test"
  });
  const [rows] = await connection.query("SELECT * FROM expenses");
  const expenses: Expense[] = (rows as mysql.RowDataPacket[]).map((row) => {
    return {
      id: row["id"],
      creationTimestamp: new Date(row["creation_timestamp"]).getTime(),
      bankAccount: row["bank_account"],
      accountingDate: new Date(row["accounting_date"]),
      valueDate: new Date(row["value_date"]),
      ogDescription: row["og_description"],
      amount: row["amount"],
      balance: row["balance"],
      description: row["description"]
    };
  });
  await connection.end();

  return expenses;
};
