<template>
  <v-container
    fluid
    class="login-container fill-height d-flex align-center justify-center"
  >
    <div class="login-overlay"></div>
    <v-row dense class="mt-32 mt-md-0">
      <v-col cols="12">
        <div class="text-center mb-0 mb-md-6">
          <v-img
            :src="logo"
            contain
            max-height="100"
            class="max-height-md-400 max-height-lg-600"
          />
        </div>
      </v-col>
      <v-col cols="12">
        <v-container fluid class="d-flex align-center justify-center">
          <v-card class="register-card" elevation="24">
            <v-card-text>
              <v-form @submit.prevent="handleSubmit">
                <v-row dense>
                  <v-col cols="6">
                    <v-text-field
                      v-model="firstName"
                      label="Nombre"
                      variant="outlined"
                      color="success"
                      prepend-inner-icon="mdi-account"
                      :rules="nameRules"
                      class="mb-2 green-input"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="lastName"
                      label="Apellido"
                      variant="outlined"
                      color="success"
                      prepend-inner-icon="mdi-account"
                      :rules="nameRules"
                      class="mb-2 green-input"
                    />
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="email"
                  label="Email"
                  variant="outlined"
                  color="success"
                  prepend-inner-icon="mdi-email"
                  :rules="emailRules"
                  class="mb-2 green-input"
                  required
                />
                <v-row dense>
                  <v-col cols="6">
                    <v-text-field
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      label="Contraseña"
                      variant="outlined"
                      color="success"
                      prepend-inner-icon="mdi-lock"
                      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showPassword = !showPassword"
                      :rules="passwordRules"
                      class="mb-2 green-input"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="confirmPassword"
                      :type="showPassword ? 'text' : 'password'"
                      label="Confirmar Contraseña"
                      variant="outlined"
                      color="success"
                      prepend-inner-icon="mdi-lock"
                      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showPassword = !showPassword"
                      :rules="confirmPasswordRules"
                      class="mb-2 green-input"
                    />
                  </v-col>
                </v-row>
                <v-btn
                  type="submit"
                  color="#00ff88"
                  :loading="loading"
                  block
                  class="font-orbitron"
                >
                  Registrarse
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.svg";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isTestAccount = ref(true);
const loading = ref(false);
const error = ref("");
const success = ref(false);

const nameRules = [
  (v) => !!v || "Este campo es requerido",
  (v) => (v && v.length >= 2) || "Debe tener al menos 2 caracteres",
];

const emailRules = [
  (v) => !!v || "Email es requerido",
  (v) => /.+@.+\..+/.test(v) || "Email debe ser válido",
];

const passwordRules = [
  (v) => !!v || "Contraseña es requerida",
  (v) => (v && v.length >= 8) || "Debe tener al menos 8 caracteres",
  (v) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) ||
    "Debe contener mayúsculas, minúsculas, números y caracteres especiales",
];

const confirmPasswordRules = [
  ...passwordRules,
  (v) => v === password.value || "Las contraseñas no coinciden",
];

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = "";

    await authStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      isTestAccount: isTestAccount.value,
    });

    success.value = true;

    // Auto-login después de registro
    await authStore.login(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    error.value = err.response?.data?.message || "Error en el registro";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

.login-container {
  background: url("@/assets/bg1.webp") center center / cover no-repeat;
  position: relative;
  padding: 2rem;
  background-color: #000;
  background-size: cover;
  background-position: center center;
}

.login-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.register-card {
  width: 100%;
  max-width: 800px;
  z-index: 1;
  background-color: rgba(0, 20, 10, 0.9);
  border: 1px solid #00ff88;
  box-shadow: 0 0 30px rgba(0, 255, 150, 0.3);
  font-family: "Orbitron", sans-serif;
}

.logo-image {
  filter: drop-shadow(0 0 10px rgba(0, 255, 150, 0.6));
}

.mt-32 {
  margin-top: 200px;
}

.max-height-lg-600 {
  @media (min-width: 960px) {
    max-height: 200px !important;
  }
}

.green-text {
  color: #00ff88 !important;
}

/* Estilos para los inputs verdes desde el inicio */
.green-input :deep(.v-field) {
  border-color: #00ff88 !important;
  background-color: rgba(0, 30, 15, 0.8) !important;
}

.green-input :deep(.v-field--variant-outlined) {
  border-color: #00ff88 !important;
}

.green-input :deep(.v-field--variant-outlined .v-field__outline) {
  border-color: #00ff88 !important;
}

.green-input :deep(.v-field--variant-outlined .v-field__outline::before) {
  border-color: #00ff88 !important;
}

.green-input :deep(.v-field--variant-outlined .v-field__outline::after) {
  border-color: #00ff88 !important;
}

/* Label color */
.green-input :deep(.v-label) {
  color: #00ff88 !important;
}

/* Input text color */
.green-input :deep(.v-field__input) {
  color: #ffffff !important;
}

/* Icon colors */
.green-input :deep(.v-field__prepend-inner) {
  color: #00ff88 !important;
}

.green-input :deep(.v-field__append-inner) {
  color: #00ff88 !important;
}

/* Placeholder text */
.green-input :deep(.v-field__input::placeholder) {
  color: rgba(0, 255, 136, 0.7) !important;
}

/* Hover effect */
.green-input :deep(.v-field:hover) {
  border-color: #00ff88 !important;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3) !important;
}

.green-input :deep(.v-field:hover .v-field__outline) {
  border-color: #00ff88 !important;
}

/* Focus effect */
.green-input :deep(.v-field--focused) {
  border-color: #00ff88 !important;
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.5) !important;
}

.green-input :deep(.v-field--focused .v-field__outline) {
  border-color: #00ff88 !important;
}

/* Error state override */
.green-input :deep(.v-field--error) {
  border-color: #ff4444 !important;
}

.green-input :deep(.v-field--error .v-field__outline) {
  border-color: #ff4444 !important;
}

.green-input :deep(.v-field--error .v-label) {
  color: #ff4444 !important;
}

/* Glow effect constant */
.green-input :deep(.v-field) {
  box-shadow: 0 0 8px rgba(0, 255, 136, 0.2) !important;
  transition: all 0.3s ease !important;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif !important;
}
</style>
