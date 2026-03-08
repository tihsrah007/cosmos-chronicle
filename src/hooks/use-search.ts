import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { ApiSearchResult, SearchResponse } from "@/api/types";

export function useGlobalSearch(query: string) {
  return useQuery<ApiSearchResult[]>({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await fetchApi<SearchResponse>(
        `/search?q=${encodeURIComponent(query)}`,
      );
      return res.results;
    },
    enabled: query.length >= 2,
    staleTime: 60_000,
    retry: 1,
    placeholderData: (prev) => prev,
  });
}
