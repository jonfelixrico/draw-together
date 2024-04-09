import manifest from '@manifest'

const VERSION = import.meta.env.VITE_VERSION_OVERRIDE || manifest.version

export function useVersion() {
  return VERSION
}
