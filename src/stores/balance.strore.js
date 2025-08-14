import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBalanceStore = defineStore('balance', () => {
  const balance = ref(0.00)
  const setBalance = (newToken) => (balance.value = newToken)

  return { balance, setBalance }
})