import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    show: false,
    message: '',
    color: 'success',
    type: 'success',
    timeout: 3000
  }),
  actions: {
    showMessage(message, type = 'success', timeout = 3000) {
      this.message = message
      this.color =  "#00ff88"
      this.type = type
      this.timeout = timeout
      this.show = true
    },
    hide() {
      this.show = false
    }
  }
})
