import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { DomainTimelineResponse } from "@/api/types";

export function useDomainTimeline(slug: string) {
  return useQuery<DomainTimelineResponse>({
    queryKey: ["domains", slug, "timeline"],
    queryFn: () => fetchApi<DomainTimelineResponse>(`/domains/${slug}/timeline`),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
  });
}
