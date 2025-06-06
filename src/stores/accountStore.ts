import { Account } from "@/types/Account";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount(account: Account) {
      this.accounts.push({
        id: Date.now().toString(),
        label: account.label.trim(),
        accountType: account.accountType,
        login: account.login,
        password: account.password,
      });

      this.saveToLocalStorage();
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((account) => account.id !== id);
      this.saveToLocalStorage();
    },
    // Load accounts from localStorage
    loadFromLocalStorage() {
      const savedAccounts = localStorage.getItem("account-records");
      if (savedAccounts) {
        try {
          this.accounts = JSON.parse(savedAccounts);
        } catch (e) {
          console.error("Error loading account records from localStorage", e);
        }
      }
    },

    // Save accounts to localStorage
    saveToLocalStorage() {
      localStorage.setItem("account-records", JSON.stringify(this.accounts));
    },
  },
  getters: {
    getAccounts(): Account[] {
      return this.accounts;
    },
  },
});
export { Account };
