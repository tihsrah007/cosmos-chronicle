import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { ApiDomain, DomainsResponse, DomainResponse } from "@/api/types";

export function useDomains() {
  return useQuery<ApiDomain[]>({
    queryKey: ["domains"],
    queryFn: async () => {
      const res = await fetchApi<DomainsResponse>("/domains");
      return res.domains;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useDomain(slug: string) {
  return useQuery<ApiDomain>({
    queryKey: ["domains", slug],
    queryFn: async () => {
      const res = await fetchApi<DomainResponse>(`/domains/${slug}`);
      return res.domain;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
  });
}
