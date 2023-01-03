import 'vue-router'

declare interface Window {
  ethereum?: import('ethers').providers.ExternalProvider & {
    chainId: string
    on: (event: string, callback: (...args: any[]) => void) => void
  }
}

// with vite-plugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    layoutTitle?: string[]
    layoutDescription?: string
    requiresAuth?: boolean
    requiresActiveBattle?: boolean
  }
}
