declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly [key: string]: string | undefined
      readonly VERSION_OVERRIDE?: string
      readonly TZ?: string
    }
  }
}

export {}
