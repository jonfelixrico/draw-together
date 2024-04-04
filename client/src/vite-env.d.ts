/// <reference types="vite/client" />

interface ImportMetaEnv {
  // NOTE: need to prefix env vars with VITE_ if we want it to be accessible in the client source code
  readonly VITE_VERSION_OVERRIDE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
