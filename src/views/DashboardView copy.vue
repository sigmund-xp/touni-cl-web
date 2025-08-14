mmbatti FWfxrPSW3rgR31HO
<template>
  <v-app theme="dark">
    <!-- Fondo -->
    <v-container fluid class="dashboard-background fill-height pa-0">
      <div class="overlay"></div>

      <!-- TOOLBAR -->
      <v-app-bar color="transparent" flat class="dashboard-toolbar">
        <v-toolbar-title class="text-green font-orbitron">
          <v-icon start class="mr-2">mdi-currency-usd</v-icon>
          Wallet: {{ wallet }} USDT
        </v-toolbar-title>

        <v-spacer />

        <v-btn variant="text" class="toolbar-btn">Partidas</v-btn>
        <v-btn variant="text" class="toolbar-btn">Ranking</v-btn>
        <v-btn variant="text" class="toolbar-btn">Saldo</v-btn>

        <v-avatar size="36" class="ml-4">
          <v-img :src="userAvatar" />
        </v-avatar>
        <span class="ml-2 text-green">{{ username }}</span>
      </v-app-bar>

      <!-- CONTENIDO PRINCIPAL -->
      <v-container class="dashboard-content">
        <v-row>
          <!-- Columna Izquierda -->
          <v-col cols="12" md="4">
            <v-card class="glass-card mb-4">
              <v-card-title class="text-green">Featured Tournament</v-card-title>
              <v-img :src="featuredImage" height="160px" cover></v-img>
              <v-card-text>
                <p class="text-white text-h6 font-orbitron">10 USDT ENTRY</p>
                <p class="text-green text-h6 font-orbitron">1.500 USDT PRIZE-POOL</p>
              </v-card-text>
            </v-card>

            <v-card class="glass-card">
              <v-card-text class="text-center">
                <v-icon size="36" color="green">mdi-plus-circle-outline</v-icon>
                <p class="text-white font-orbitron text-h6">DEPOSIT</p>
                <v-avatar size="64" class="mx-auto my-2">
                  <v-img :src="userAvatar" />
                </v-avatar>
                <p class="text-green">{{ username }}</p>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Columna Derecha -->
          <v-col cols="12" md="8">
            <v-card class="glass-card">
              <v-card-title class="text-green">Torneos Activos</v-card-title>
              <v-data-table
                :headers="headers"
                :items="tournaments"
                class="elevation-1"
                hide-default-footer
                density="compact"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script setup>
import userAvatar from "@/assets/avatar.png";
import featuredImage from "@/assets/featured.jpg";

const username = "SummonerName";
const wallet = 1232;

const headers = [
  { title: "DATE", key: "date" },
  { title: "BUY-IN", key: "buyin" },
  { title: "TYPES", key: "types" },
  { title: "PRIZE", key: "prize" },
  { title: "STATUS", key: "status" },
];

const tournaments = [
  {
    date: "Jun 15 20.00",
    buyin: "5 $",
    types: "⚔️",
    prize: "500 USDT",
    status: "REGISTRATION",
  },
  {
    date: "Jun 15 Trehut",
    buyin: "5 $",
    types: "🛡️",
    prize: "1.000 USDT",
    status: "IN PROGRESS",
  },
  {
    date: "Jun 15 Hydra Cup",
    buyin: "5 $",
    types: "👾",
    prize: "2.000 USDT",
    status: "FINALIZED",
  },
  {
    date: "Jun 15 Tundra Cup",
    buyin: "5 $",
    types: "🔥",
    prize: "1.500 USDT",
    status: "INITIATED",
  },
];
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

.dashboard-background {
  background: url("@/assets/touni-bg.png") center center / cover no-repeat;
  position: relative;
  font-family: "Orbitron", sans-serif;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(3px);
  z-index: 0;
}

.dashboard-toolbar {
  z-index: 2;
  position: relative;
}

.dashboard-content {
  z-index: 2;
  position: relative;
  padding-top: 100px;
}

.glass-card {
  background: rgba(0, 30, 15, 0.85);
  border: 1px solid #00ff88;
  box-shadow: 0 0 15px rgba(0, 255, 150, 0.2);
  backdrop-filter: blur(6px);
  color: white;
}

.toolbar-btn {
  color: #00ff88 !important;
  font-family: "Orbitron", sans-serif;
  font-weight: bold;
}
</style>
