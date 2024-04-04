declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly [key: string]: string | undefined
      readonly BUILD_VERSION?: string
      readonly TZ?: string
    }
  }
}

export {}
