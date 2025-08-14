<!-- components/Transactions/DepositDialog.vue -->
<template>
  <v-dialog v-model="modelValue" max-width="500">
    <v-card>
      <v-card-title>Depositar USDT</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="amount"
            label="Cantidad"
            type="number"
            step="0.01"
            min="0"
            required
          ></v-text-field>

          <div v-if="!authStore.user.isTestAccount" class="my-4">
            <p class="text-body-2">Envía USDT a esta dirección:</p>
            <v-chip @click="copyAddress" class="ma-2">
              {{ walletAddress }}
              <v-icon end>mdi-content-copy</v-icon>
            </v-chip>
            <v-alert type="info" variant="tonal" class="mt-2">
              Confirma con al menos 3 confirmaciones en la blockchain
            </v-alert>
          </div>

          <div v-else class="my-4">
            <v-alert type="warning" variant="tonal">
              Esta es una cuenta de prueba. El saldo es ficticio.
            </v-alert>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="modelValue = false">Cancelar</v-btn>
            <v-btn color="primary" type="submit" :loading="loading">Confirmar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
/*
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useDisplay } from "vuetify";
import api from "@/services/api.service";

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const authStore = useAuthStore();
//const { mobile } = useDisplay();
const amount = ref("");
const loading = ref(false);
const walletAddress = computed(() => {
  // Generar dirección basada en el usuario
  return `0x${authStore.user._id.toString().padStart(40, "0")}`;
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    await api.depositUSDT(parseFloat(amount.value));
    emit("update:modelValue", false);
    // Aquí deberías actualizar el balance en el dashboard
  } catch (error) {
    console.error("Deposit error:", error);
  } finally {
    loading.value = false;
  }
};

const copyAddress = () => {
  navigator.clipboard.writeText(walletAddress.value);
};
*/
</script>
