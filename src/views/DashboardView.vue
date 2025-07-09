<template>
  <v-app class="touni-app">
    <!-- Toolbar -->
    <v-toolbar height="auto" class="text-white gold-border" color="transparent">
      <v-col cols="5">
        <v-img :src="logo" height="170" contain class="ml-2 img-logo" />
      </v-col>
      <v-spacer />
      <v-col cols="7">
        <div>
          <v-row align="center" class="glass-card rounded mr-2">
            <v-col cols="4">
              <v-avatar size="56" class="mx-auto ml-4">
                <v-img :src="avatar" />
              </v-avatar>
              SummonerName
            </v-col>
            <v-col cols="5" class="touni-text-color">Saldo $ 4,56 | 524,20 USDT</v-col>
            <v-col cols="3" class="touni-text-color">
              <v-btn block color="#00ff88" class="font-orbitron">
                <v-icon start>mdi-logout</v-icon>
                Cerrar sessión
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn
                color="black"
                variant="flat"
                icon="mdi-wallet"
                class="top-button touni-text-color mr-4"
              />
              <v-btn
                icon="mdi-account"
                color="black"
                variant="flat"
                class="top-button touni-text-color mr-4"
              />
              <v-btn
                icon="mdi-currency-usd"
                color="black"
                variant="flat"
                class="top-button touni-text-color mr-4"
              />
              <v-btn
                icon="mdi-gamepad-variant"
                color="black"
                variant="flat"
                class="top-button touni-text-color mr-4"
              />
              <v-btn
                icon="mdi-trophy"
                color="black"
                variant="flat"
                class="top-button touni-text-color mr-4"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-toolbar>
    <!-- Main content -->
    <v-main class="touni-background flex-grow-1 overflow-auto">
      <v-container fluid class="pa-4 h-100">
        <v-row class="h-100">
          <!-- Left card: Featured Tournament -->
          <v-col cols="12" md="3">
            <v-card class="glass-card mb-4">
              <v-img :src="tournament"></v-img>
              <v-card-text>
                <h3 class="touni-text-color font-weight-normal">10 USDT Entrada</h3>
                <p class="touni-text-color text-h6 touni-text">1.500 USDT PRIZE-POOL</p>
              </v-card-text>
            </v-card>

            <!-- Deposit and Account -->
            <v-card class="glass-card d-flex align-center pa-4">
              <div class="text-center w-50">
                <v-avatar size="100" class="mx-auto mb-2">
                  <v-img :src="coin" />
                  <!--              <v-icon size="48" color="green">mdi-cash-plus</v-icon -->
                </v-avatar>
                <p class="touni-text-color">Deposit</p>
              </div>
              <div class="text-center w-50">
                <v-avatar size="100" class="mx-auto mb-2">
                  <v-img :src="avatar" />
                </v-avatar>
                <p class="touni-text-color">SummonerName</p>
              </div>
            </v-card>
          </v-col>

          <!-- Right card: Match table -->
          <v-col cols="12" md="9">
            <v-card class="glass-card d-flex flex-column" style="height: 100%">
              <v-card-title class="touni-text-color">Torneos Destacados</v-card-title>
              <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1 flex-grow-1"
                hide-default-footer
                dense
                style="height: 100%"
              >
                <template #[`item.estado`]="{ item }">
                  <v-btn
                    v-if="item.estado === 'R'"
                    color="#00ff88"
                    variant="outlined"
                    size="small"
                  >
                    Registrar
                  </v-btn>

                  <v-btn
                    v-else-if="item.estado === 'U'"
                    color="red"
                    variant="outlined"
                    size="small"
                  >
                    Desregistrarse
                  </v-btn>
                  <v-btn v-else color="#00ff88" variant="outlined" size="small">
                    En curso
                  </v-btn>
                </template>
              </v-data-table>
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
import logo from "../assets/logo.png";
import coin from "../assets/coin.png";
import avatar from "../assets/avatar.png";
import tournament from "../assets/tournament.png";

const headers = [
  { title: "Fecha", value: "date" },
  { title: "Nombre", value: "name" },
  { title: "Entrada", value: "buyin" },
  { title: "Tipo", value: "types" },
  { title: "Prize", value: "prize" },
  { title: "", value: "estado" },
];

const items = [
  {
    date: "Jun 15 - 20:00",
    name: "Trehut 20 hs.",
    buyin: "5 USDT",
    types: "👾",
    prize: "500 USDT",
    estado: "R",
  },
  {
    date: "Jun 15 - 21:00",
    name: "Trehut 21 Hs.",
    buyin: "5 USDT",
    types: "🌿",
    prize: "1.000 USDT",
    estado: "U",
  },
  {
    date: "Jun 15 - 22:30",
    name: "Hydra Cup",
    buyin: "5 USDT",
    types: "🤖",
    prize: "2.000 USDT",
    estado: "REGISTRATIRON",
  },
];

// Grieta del Invocador (5v5):
// ARAM (All Random All Mid):
// Teamfight Tactics (TFT)
const currentTime = ref(
  new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
);
const playersOnline = ref(257);

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, 60000);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

/* Estilos base y layout principal */
.touni-app {
  font-family: "Orbitron", sans-serif;
  color: #00ff88;
  background: url("@/assets/bg2.png") center center / cover no-repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* Componente toolbar */
.touni-toolbar {
  background-color: #001f10;
  border-bottom: 1px solid #00ff88;
  box-shadow: 0 2px 10px rgba(0, 255, 100, 0.1);
}

/* Componente main content */
.touni-background {
  background: transparent;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 64px;
}

.v-container {
  height: 100%;
}

.v-row {
  height: 100%;
}

/* Componente footer */
.touni-footer {
  background: rgba(0, 30, 10, 0.85);
  backdrop-filter: blur(6px);
  border-top: 1px solid #00ff88;
  height: 64px;
  z-index: 100;
  flex: unset;
  padding: unset;
  position: fixed;
  bottom: 0;
  width: 100%;
}

/* Componentes de tarjetas */
.glass-card {
  background: rgba(0, 30, 10, 0.4);
  backdrop-filter: blur(6px);
  border: 1px solid #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 150, 0.2);
  color: #00ff88;
}

.rounded {
  border-radius: 50px !important;
}

/* Componentes de imágenes */
.img-logo :deep(.v-img__img) {
  width: unset;
}

/* Componentes de botones */
.top-button {
  align-self: flex-start;
  margin-top: 10px;
  border: 1px solid #00ff88;
}

/* Tipografía y textos */
.touni-text-color {
  color: #00ff88 !important;
}

.touni-text {
  font-family: "Orbitron", sans-serif;
  font-weight: normal;
  color: #00ff88;
}

.font-weight-normal {
  font-weight: normal;
}

/* Tablas */
.v-data-table {
  flex: 1;
  background: transparent !important;
  color: #00ff88;
}

.v-data-table ::v-deep .v-data-table__wrapper {
  height: 100%;
}

/* Responsive - Media queries */
@media (max-width: 768px) {
  .touni-footer {
    height: auto;
    padding: 8px 0;
  }
  .touni-background {
    padding-bottom: 100px;
  }
}
</style>
