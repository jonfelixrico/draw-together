import { useMemo } from "react";
import { getApiClient } from "../services/api-client";

export function useApiClient () {
  return useMemo(() => getApiClient(), [])
}
