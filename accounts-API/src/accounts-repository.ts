import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export type Expense = {
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

const EXPENSES_TABLE = "expenses";

export class AccountsRepository {
  private configuration = {
    host: "fake-database",
    user: "root",
    password: "root",
    database: "test"
  };

  public getExpenses = async (): Promise<Expense[]> => {
    const sql = "SELECT * FROM expenses";
    const connection = await mysql.createConnection(this.configuration);
    const [rows] = await connection.query<RowDataPacket[]>(sql);
    const expenses: Expense[] = (rows as mysql.RowDataPacket[]).map((row) => ({
      id: row["id"],
      creationTimestamp: new Date(row["creation_timestamp"]).getTime(),
      bankAccount: row["bank_account"],
      accountingDate: new Date(row["accounting_date"]),
      valueDate: new Date(row["value_date"]),
      ogDescription: row["og_description"],
      amount: row["amount"],
      balance: row["balance"],
      description: row["description"]
    }));
    await connection.end();

    return expenses;
  };

  public addExpense = async (expense: Expense): Promise<Expense | Error> => {
    const sql = `INSERT INTO ${EXPENSES_TABLE} (
      bank_account, 
      accounting_date, 
      value_date, 
      og_description, 
      amount, 
      balance, 
      description) VALUES (
        '${expense.bankAccount}', 
        '${dateToMysql(expense.accountingDate)}', 
        '${dateToMysql(expense.valueDate)}', 
        '${expense.ogDescription}', 
        ${expense.amount}, 
        ${expense.balance}, 
        '${expense.description}'
        )`;
    const connection = await mysql.createConnection(this.configuration);
    await connection.query<ResultSetHeader>(sql);

    return expense;
  };
}

const dateToMysql = (date: Date): string => {
  return date.toISOString().replace("T", " ").replace("Z", "");
};
