import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useBattleStore = defineStore('battleStore', () => {
  const battleName = ref('')

  return {
    battleName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattleStore, import.meta.hot))
