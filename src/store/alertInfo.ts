import { acceptHMRUpdate, defineStore } from 'pinia'
import { useState } from '~/composables/state'

export const useAlertInfoStore = defineStore('alertInfo', () => {
  const [alertInfo, setAlertInfo] = useState({
    status: false,
    type: 'info',
    message: '',
  })

  const unwatchAlert = watch(alertInfo, () => {
    if (alertInfo.value.status) {
      const timer = setTimeout(() => {
        // Clear alert info
        setAlertInfo({ status: false, type: 'info', message: '' })

        clearTimeout(timer)
      }, 5_000)
    }
  })

  onUnmounted(unwatchAlert)

  return {
    alertInfo,
    setAlertInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAlertInfoStore, import.meta.hot))
