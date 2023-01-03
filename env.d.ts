/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string

  // Web3 variables
  readonly VITE_AVAX_CONTRACT_ADDRESS: string
  readonly VITE_FUJI_C_CHAIN_ID: string
  readonly VITE_EMPTY_ACCOUNT_VALUE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
