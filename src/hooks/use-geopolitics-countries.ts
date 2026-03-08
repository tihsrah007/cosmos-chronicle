import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { ApiCountryInfo, CountriesResponse } from "@/api/types";

export function useGeopoliticsCountries() {
  return useQuery<ApiCountryInfo[]>({
    queryKey: ["geopolitics", "countries"],
    queryFn: async () => {
      const res = await fetchApi<CountriesResponse>("/geopolitics/countries");
      return res.countries;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
