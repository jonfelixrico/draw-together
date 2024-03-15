import { useMemo } from "react";
import { getApiClient } from "@/services/api-client";

/**
 * Use this over `getApiClient` inside of components.
 * We prefer to use this over `getApiClient` because using the latter
 * will keep on calling `getApiClient` needlessly during re-render.
 * @returns 
 */
export function useApiClient () {
  return useMemo(() => getApiClient(), [])
}
