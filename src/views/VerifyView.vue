<template>
  <v-app class="touni-app">
    <!-- Toolbar -->
    <v-toolbar height="auto" class="text-white gold-border" color="transparent">
      <v-col cols="5" class="pb-0">
        <v-img :src="logo" height="150" contain class="ml-2 img-logo" />
      </v-col>
      <v-spacer />
      <v-col cols="7" class="pb-0">
        <v-row justify="end" class="ma-0 pa-0">
          <v-btn
            icon="mdi-logout"
            color="black"
            variant="flat"
            class="top-button touni-text-color"
            @click.prevent="logout"
          />
        </v-row>
      </v-col>
    </v-toolbar>
    <!-- Main content -->
    <v-main class="touni-background flex-grow-1 overflow-auto">
      <v-container fluid class="pa-4 h-100">
        <v-row class="h-100" justify="center">
          <v-col cols="8">
            <v-card class="glass-card d-flex flex-column">
              <v-card-title class="touni-text-color text-center touni-h2"
                >Vincular cuenta de Riot Games</v-card-title
              >
              <v-card-text class="text-center touni-h6">
                Para poder utilizar tu cuenta, primero debés vincular y verificar tu
                cuenta de Riot Games. Este paso es obligatorio para validar tu identidad y
                acceder a todas las funcionalidades de la plataforma.
              </v-card-text>
              <v-card-text class="justify-center mb-4">
                <v-row justify="center">
                  <v-col cols="9">
                    <v-row class="ma-0" no-gutters align="center">
                      <v-col cols="6" class="pr-2">
                        <v-text-field
                          label="Usuario de Riot Games"
                          v-model="riotUsername"
                          prepend-inner-icon="mdi-account"
                          outlined
                          dense
                          hide-details="auto"
                          class="green-input"
                        />
                      </v-col>
                      <v-col cols="3" class="pr-4">
                        <v-text-field
                          label="Tag"
                          v-model="riotTagLine"
                          prepend-inner-icon="mdi-pound"
                          outlined
                          dense
                          hide-details="auto"
                          class="green-input"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          :loading="loading"
                          :disabled="mostrarAcciones"
                          :class="[
                            'font-orbitron',
                            mostrarAcciones ? 'touni-btn-disabled' : 'touni-btn',
                          ]"
                          @click="registrarCuenta"
                        >
                          <v-icon start>mdi-account-plus</v-icon>
                          Registrar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text class="text-left touni-h6" v-show="mostrarAcciones">
                <v-row justify="center" class="mr-4 ml-4">
                  <v-col cols="10" class="pl-2 pr-4">
                    Cambia el icono de invocador por el que aparece en la imagen y luego
                    haz clic en Verificar.
                  </v-col>
                  <v-col cols="2" class="pr-2 text-center">
                    <v-avatar
                      :image="newIconPng"
                      rounded="0"
                      class="avatar-xxl borde-dorado-negro"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center mb-4" v-show="mostrarAcciones">
                <v-btn
                  :loading="validating"
                  class="font-orbitron touni-btn"
                  @click="verificar"
                >
                  <v-icon start>mdi-shield-check</v-icon>
                  Verificar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- Footer -->
    <v-footer class="touni-footer" style="position: fixed; bottom: 0; width: 100%">
      <v-container
        fluid
        class="d-flex justify-space-between align-center touni-text-color"
      >
        <div class="d-flex align-center">
          <v-icon size="x-large">mdi-clock-outline</v-icon>
          <span class="ml-2 mr-12">{{ currentTime }}</span>
          <v-icon size="x-large">mdi-account-group</v-icon>
          <span class="ml-2">{{ playersOnline }} online</span>
        </div>
        <div class="d-flex gap-4 align-right">
          <v-btn class="mr-2" variant="outlined" icon>
            <svg
              viewBox="-5 -5 35 35"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
            >
              <path
                d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
              />
            </svg>
          </v-btn>
          <v-btn class="mr-2" variant="outlined" icon>
            <svg
              viewBox="-3 -3 30 30"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
            >
              <path
                d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
              />
            </svg>
          </v-btn>
          <v-btn class="mr-2" variant="outlined" icon="mdi-twitch" />
          <v-btn class="mr-2" variant="outlined" icon="mdi-youtube" />
          <v-btn variant="outlined" icon="mdi-instagram" />
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { useAlertStore } from "@/stores/alert.store.js";
import logo from "../assets/logo.svg";

const authStore = useAuthStore();
const router = useRouter();
const alert = useAlertStore();

const mostrarAcciones = ref(false);
const loading = ref(false);
const validating = ref(false);
const riotUsername = ref("");
const riotTagLine = ref("");
const newIconPng = ref("");

const logout = async () => {
  await authStore.logout();
  router.push("/");
};

const registrarCuenta = async () => {
  try {
    loading.value = true;

    const result = await authStore.registerRiot(riotUsername.value, riotTagLine.value);

    if (result.status == 0) {
      newIconPng.value = `icons/${result.newIcon}.png`;
      mostrarAcciones.value = true;
    } else if (result.status == 401) {
      alert.showMessage(
        "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión para continuar.",
        "error"
      );
      logout();
    } else {
      alert.showMessage(result.message, "error");
    }
  } finally {
    loading.value = false;
  }
};

const verificar = async () => {
  try {
    validating.value = true;

    const result = await authStore.validateRiot();
    if (result.status == 0) {
      if (result.validated) {
        router.push("/dashboard");
      } else {
        alert.showMessage(
          "Verifica haber elegido el icono correcto y reintenta",
          "warning"
        );
      }
    } else if (result.status == 401) {
      alert.showMessage(
        "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión para continuar.",
        "error"
      );
      logout();
    } else {
      alert.showMessage(result.message, "error");
    }
  } catch (err) {
    alert.showMessage(err.response?.data?.message || "Error al iniciar sesión", "error");
  } finally {
    validating.value = false;
  }
};

const currentTime = ref(
  new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
);
const playersOnline = ref(257);

onMounted(async () => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, 60000);
});
</script>

<style scoped></style>
