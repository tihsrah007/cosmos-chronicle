import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { ApiDomainTimeline } from "@/api/types";

export function useDomainTimeline(slug: string) {
  return useQuery<ApiDomainTimeline>({
    queryKey: ["domains", slug, "timeline"],
    queryFn: () => fetchApi<ApiDomainTimeline>(`/domains/${slug}/timeline`),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
  });
}
