export const useAlertInfo = () => {
  const [alertInfo, setAlertInfo] = useState({
    status: false,
    type: 'info',
    message: ''
  })

  watch(alertInfo, () => {
    if (alertInfo.value.status) {
      const timer = setTimeout(() => {
        // Clear aler info
        setAlertInfo({ status: false, type: 'info', message: '' })
        
        clearTimeout(timer)
      }, 5_000)
    }
  })

  return [
    alertInfo,
    setAlertInfo,
  ] as [typeof alertInfo, typeof setAlertInfo]
}
