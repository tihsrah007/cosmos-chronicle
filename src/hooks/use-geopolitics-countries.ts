import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { ApiCountryInfo } from "@/api/types";

export function useGeopoliticsCountries() {
  return useQuery<ApiCountryInfo[]>({
    queryKey: ["domains", "geopolitics", "countries"],
    queryFn: () => fetchApi<ApiCountryInfo[]>("/domains/geopolitics/countries"),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
