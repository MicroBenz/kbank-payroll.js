export interface ITransaction {
  name: string
  amount: string | number
  accountNumber: string
}

export interface IConfig {
  companyName: string
  accountNumber: string
  date?: Date
}
