<template>
  <v-card>
    <v-card-title>Vincular cuenta de Riot</v-card-title>
    <v-card-text>
      <v-text-field v-model="summonerName" label="Nombre de invocador" />

      <v-alert v-if="verificationCode" type="info">
        Crea una partida personalizada con el nombre:
        <strong>{{ verificationCode }}</strong>
      </v-alert>

      <v-btn @click="generateCode" color="primary"> Generar código </v-btn>

      <v-btn @click="verifyAccount" :disabled="!verificationCode" color="success">
        Verificar
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      summonerName: "",
      verificationCode: "",
    };
  },
  methods: {
    generateCode() {
      this.verificationCode =
        "VERIF-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    },
    async verifyAccount() {
      try {
        const response = await this.$axios.post("http://localhost:3000/api/verify-riot", {
          summonerName: this.summonerName,
          verificationCode: this.verificationCode,
        });
        if (response.data.success) {
          this.$toast.success("¡Cuenta verificada con éxito!");
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || "Error al verificar");
      }
    },
  },
};
</script>
