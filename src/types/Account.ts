import { AccountType } from "./AccountType";

export interface Account {
  id?: string | undefined;
  label: string;
  accountType?: AccountType;
  login?: string;
  password?: string;
}