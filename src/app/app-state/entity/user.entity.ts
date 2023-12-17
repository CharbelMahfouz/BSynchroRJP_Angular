export class User {
id:number;
balance: number;
name:string;
surname:string;
transactions : [Transaction]
}

export class Transaction {
  createdDate:Date;
  oldBalance : number;
  newBalance:number;
  transactionAmount:number;
} 
