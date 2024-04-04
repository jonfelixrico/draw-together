/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VERSION_OVERRIDE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
