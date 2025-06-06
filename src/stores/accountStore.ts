import { defineStore } from "pinia";

export interface Account {
  id: number;
  text: string;
}

export const useAccountStore = defineStore("account", {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount(text: string) {
      if (!text.trim()) return;

      this.accounts.push({
        id: Date.now(),
        text: text.trim(),
      });

      this.saveToLocalStorage();
    },
    deleteAccount(id: number) {
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
