<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useAccountStore, type Account } from "@/stores/accountStore";

const accountStore = useAccountStore();
const newAccountText = ref("");

const formData = reactive<Account>({
  id: "",
  label: "",
  accountType: "",
  login: "",
  password: "",
});

const accountTypes = [
  { key: "Локальная", value: "Local" },
  { key: "LDAP", value: "LDAP" },
];

onMounted(() => {
  accountStore.loadFromLocalStorage();
});
</script>

<template>
  <div class="account-app">
    <!-- Adding data -->
    <form
      @submit.prevent="
        accountStore.addAccount(formData);
        newAccountText = '';
      "
    >
      <div class="add-container">
        <span>Учетные записи</span>
        <button type="submit" :disabled="!formData.label.trim()" class="add">
          +
        </button>
      </div>

      <!-- Label -->
      <input
        v-model="formData.label"
        class="new-account"
        placeholder="Метка"
        maxlength="50"
      />

      <!-- Account Type -->
      <select
        id="accountType"
        v-model="formData.accountType"
        class="new-account"
        placeholder="Тип записи"
      >
        <option disabled value="">Тип записи</option>
        <option
          v-for="accountType in accountTypes"
          :key="accountType.key"
          :value="accountType.value"
        >
          {{ accountType.key }}
        </option>
      </select>

      <!-- Login -->
      <input
        v-model="formData.login"
        class="new-account"
        placeholder="Логин"
        maxlength="100"
      />

      <!-- Passsword -->
      <input
        type="password"
        v-model="formData.password"
        class="new-account"
        placeholder="Пароль"
        maxlength="100"
      />
    </form>

    <!-- Displaying Data -->
    <ul class="account-list">
      <li v-for="account in accountStore.getAccounts" :key="account.id">
        <input
          type="text"
          :value="account.label"
          class="input new-account"
          readonly
        />

        <select class="new-account">
          <option>
            {{
              accountTypes.filter((acc) => acc.value === account.accountType)[0]
                ?.key
            }}
          </option>
        </select>

        <input
          type="text"
          :value="account.login"
          class="input new-account"
          readonly
        />

        <input
          type="password"
          :value="account.password"
          class="input new-account"
          readonly
        />

        <button
          @click="accountStore.deleteAccount(account.id as string)"
          class="delete"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.account-app {
  max-width: 95%;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.new-account {
  width: 20%;
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
