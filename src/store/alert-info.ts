import { acceptHMRUpdate, defineStore } from 'pinia'
import { useState } from '~/composables/state'
import { parseErrorMessage } from '~/utils/error-message'

export const useAlertInfoStore = defineStore('alertInfo', () => {
  const [alertInfo, setAlertInfo] = useState({
    status: false,
    type: 'info',
    message: '',
  })

  const clearAlertInfo = () =>
    setAlertInfo({ status: false, type: 'info', message: '' })

  const setErrorMessage = (error: any) =>
    setAlertInfo({
      status: true,
      message: parseErrorMessage(error),
      type: 'failure',
    })

  watch(alertInfo, () => {
    if (alertInfo.value.status) {
      const timer = setTimeout(() => {
        // Clear alert info
        clearAlertInfo()

        clearTimeout(timer)
      }, 5_000)
    }
  })

  return {
    alertInfo,
    setAlertInfo,
    setErrorMessage,
    clearAlertInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAlertInfoStore, import.meta.hot))
