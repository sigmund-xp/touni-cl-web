<template>
  <v-container
    fluid
    class="login-container fill-height d-flex align-center justify-center"
    :class="{ 'pa-4': $vuetify.display.mobile }"
  >
    <div class="d-flex flex-column align-center">
      <v-row class="mb-4">
        <v-img
          :src="logo"
          contain
          :max-height="$vuetify.display.mobile ? '100px' : '200px'"
          width="auto"
        />
      </v-row>
      <v-row>
        <v-card
          class="login-card"
          :elevation="$vuetify.display.mobile ? 12 : 24"
          width="auto"
        >
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                color="success"
                prepend-inner-icon="mdi-email"
                :rules="emailRules"
                class="mt-1 mb-4 green-input"
                :density="$vuetify.display.mobile ? 'compact' : 'default'"
              />
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
                class="mb-4 green-input"
                :density="$vuetify.display.mobile ? 'compact' : 'default'"
              />
              <v-btn
                block
                color="#00ff88"
                type="submit"
                :loading="loading"
                class="font-orbitron"
                :size="$vuetify.display.mobile ? 'small' : 'default'"
              >
                <v-icon start>mdi-login</v-icon>
                Iniciar sesión
              </v-btn>
              <v-row>
                <v-col class="pl-7 pr-7">
                  <v-btn
                    block
                    variant="outlined"
                    color="#00ff88"
                    to="/register"
                    class="mt-4"
                    :class="$vuetify.display.mobile ? 'x-small-font' : 'small-font'"
                    :size="$vuetify.display.mobile ? 'small' : 'default'"
                  >
                    ¿No tienes cuenta? Regístrate
                  </v-btn>
                </v-col>
              </v-row>
              <v-alert v-if="error" type="error" class="mt-4">
                {{ error }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.svg";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const error = ref("");

const emailRules = [
  (v) => !!v || "Email es requerido",
  (v) => /.+@.+\..+/.test(v) || "Email debe ser válido",
];

const passwordRules = [
  (v) => !!v || "Contraseña es requerida",
  (v) => (v && v.length >= 8) || "Contraseña debe tener al menos 8 caracteres",
];

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = "";

    await authStore.login(email.value, password.value);

    if (authStore.user.isVerified) {
      router.push("/dashboard");
    } else {
      router.push("/verify");
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Error al iniciar sesión";
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

.login-card {
  width: 100%;
  background-color: rgba(0, 20, 10, 0.9);
  border: 1px solid #00ff88;
  box-shadow: 0 0 30px rgba(0, 255, 150, 0.3);
  font-family: "Orbitron", sans-serif;
  max-width: 400px;
}

.x-small-font {
  font-size: 8px !important;
}

.small-font {
  font-size: 10px !important;
}

.logo-image {
  max-height: 100%;
}

.mt-32 {
  margin-top: 200px;
}
</style>
