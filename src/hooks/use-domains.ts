import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { ApiDomain } from "@/api/types";

export function useDomains() {
  return useQuery<ApiDomain[]>({
    queryKey: ["domains"],
    queryFn: () => fetchApi<ApiDomain[]>("/domains"),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useDomain(slug: string) {
  return useQuery<ApiDomain>({
    queryKey: ["domains", slug],
    queryFn: () => fetchApi<ApiDomain>(`/domains/${slug}`),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
  });
}
