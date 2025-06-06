<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAccountStore, type Account } from "@/stores/accountStore";

const accountStore = useAccountStore();
const newAccountText = ref("");

onMounted(() => {
  accountStore.loadFromLocalStorage();
});
</script>

<template>
  <div class="account-app">
    <form
      @submit.prevent="
        accountStore.addAccount(newAccountText);
        newAccountText = '';
      "
    >
      <div class="add-container">
        <span>Учетные записи</span>
        <button type="submit" :disabled="!newAccountText.trim()" class="add">
          +
        </button>
      </div>

      <input v-model="newAccountText" class="new-account" />
    </form>

    <ul class="account-list">
      <li v-for="account in accountStore.getAccounts" :key="account.id">
        <input type="text" :value="account.text" class="input" readonly />
        <input type="text" :value="account.text" class="input" readonly />
        <input type="text" :value="account.text" class="input" readonly />
        <input type="text" :value="account.text" class="input" readonly />
        <button @click="accountStore.deleteAccount(account.id)" class="delete">
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.account-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.new-account {
  width: 70%;
  padding: 10px;
  margin-right: 10px;
  margin-top: 10px;
}

ul.account-list {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 0px;
  border-bottom: 1px solid #eee;
}

.add-container {
  display: flex;
  align-items: center;
}

.add {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #94c383;
  cursor: pointer;
  font-size: 20px;
}

.delete {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #cc9a9a;
  cursor: pointer;
  font-size: 20px;
}

.input {
  margin-right: 10px;
}

button.active {
  border-color: rgba(175, 47, 47, 0.2);
}
</style>
