<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useAccountStore, type Account } from "@/stores/accountStore";

const accountStore = useAccountStore();

const formData = reactive<Account>({
  id: "",
  label: "",
  accountType: "",
  login: "",
  password: "",
});

const validationData = reactive({
  accountType: false,
  login: false,
  password: false,
});

const accountTypes = [
  { key: "Локальная", value: "Local" },
  { key: "LDAP", value: "LDAP" },
];

onMounted(() => {
  accountStore.loadFromLocalStorage();
});

const cleanForm = () => {
  formData.id = "";
  formData.label = "";
  formData.accountType = "";
  formData.login = "";
  formData.password = "";
};

const checkForm = () => {
  checkFields();
  if (formData.accountType && formData.login && formData.password) return true;
};

const submitForm = () => {
  if (!checkForm()) return;
  accountStore.addAccount(formData);
  cleanForm();
};

const checkFields = () => {
  validationData.login = formData.login?.trim() === "";
  validationData.accountType = formData.accountType?.trim() === "";
  validationData.password = formData.password?.trim() === "";
};

const validateLogin = () =>
  (validationData.login = formData.login?.trim() === "");

const validateAccountType = () =>
  (validationData.accountType = formData.accountType?.trim() === "");

const validatePassword = () =>
  (validationData.password = formData.password?.trim() === "");
</script>

<template>
  <div class="account-app">
    <!-- Adding data -->
    <form @submit.prevent="submitForm">
      <div class="add-container">
        <span>Учетные записи</span>
        <button type="submit" class="add">+</button>
      </div>

      <p>
        <b
          >Для указания нескольких меток для одной пары логин/пароль используйте
          разделитель;</b
        >
      </p>

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
        :class="{ 'error-border': validationData.accountType }"
        @blur="validateAccountType"
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
        :class="{ 'error-border': validationData.login }"
        @blur="validateLogin"
      />

      <!-- Passsword -->
      <input
        type="password"
        v-model="formData.password"
        class="new-account"
        placeholder="Пароль"
        maxlength="100"
        :class="{ 'error-border': validationData.password }"
        @blur="validatePassword"
      />
    </form>

    <div class="border-line"></div>

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
          v-if="account.accountType !== 'LDAP'"
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

.error-border {
  border: 2px solid red;
}

.border-line {
  border: 1px solid #e2e2e2;
  margin-top: 30px;
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
