import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { ApiMapItem, DomainItemsResponse } from "@/api/types";

export function useDomainItems(slug: string) {
  return useQuery<ApiMapItem[]>({
    queryKey: ["domains", slug, "items"],
    queryFn: async () => {
      const res = await fetchApi<DomainItemsResponse>(`/domains/${slug}/items`);
      return res.items;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
  });
}
