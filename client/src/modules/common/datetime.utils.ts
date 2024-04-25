const EPOCH_SUBTRACT = Date.parse('01 Jan 2024 00:00:00 UTC')

/**
 * Shortens the millis by using a more recent epoch
 * @param millis
 */
export function shortenMillis(millis: number) {
  const shortened = millis - EPOCH_SUBTRACT
  return Math.max(0, shortened)
}
