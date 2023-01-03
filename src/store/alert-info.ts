import { acceptHMRUpdate, defineStore } from 'pinia'
import { parseErrorMessage } from '~/utils/error-message'

export const useAlertInfoStore = defineStore('alertInfo', () => {
  const alertInfo = ref({
    status: false,
    type: 'info',
    message: [''],
  })

  const setAlertInfo = ({
    type,
    message,
    timeout = 3_000,
  }: {
    type: string
    message: string | string[]
    timeout?: number
  }) => {
    const timer = setTimeout(() => {
      // Clear alert info
      clearAlertInfo()

      clearTimeout(timer)
    }, timeout)

    if (typeof message === 'string') {
      alertInfo.value = {
        status: true,
        type,
        message: [message],
      }

      return
    }

    if (typeof message === 'object' && Array.isArray(message)) {
      alertInfo.value = {
        status: true,
        type,
        message,
      }

      return
    }
  }

  const clearAlertInfo = () =>
    (alertInfo.value = { status: false, type: 'info', message: [''] })

  const setErrorMessage = (error: any) =>
    setAlertInfo({
      message: parseErrorMessage(error),
      type: 'failure',
    })

  return {
    alertInfo: readonly(alertInfo),
    setAlertInfo,
    setErrorMessage,
    clearAlertInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAlertInfoStore, import.meta.hot))
