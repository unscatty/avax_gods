export type WalletError = {
  reason: string
  method: string
  transaction: {
    from: string
    to: string
    data: string
    accessList: unknown
  }
  error: {
    code: number
    message: string
    data: {
      code: number
      message: string
      data: string
    }
  }
  code: string
  version: string
}

export const parseErrorMessage = (error: WalletError) => {
  if (error.error?.code === -32603) {
    return error.reason?.slice('execution reverted: '.length)
  }

  if (error.reason) {
    return error.reason
  }

  return 'Unknow error'
}
