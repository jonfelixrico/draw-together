declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined
      BUILD_VERSION?: string
    }
  }
}

export {}
