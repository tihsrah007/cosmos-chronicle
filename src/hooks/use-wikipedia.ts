import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";

interface WikipediaApiResponse {
  summary: {
    title: string;
    extract: string;
    url: string;
    thumbnailUrl?: string;
    cached: boolean;
    fetchedAt: string;
  };
}

interface WikipediaSnapshot {
  title: string;
  summary: string;
  url: string;
  thumbnail?: string;
}

export function useWikipediaSnapshot(title: string | undefined) {
  return useQuery<WikipediaSnapshot | null>({
    queryKey: ["enrichment", "wikipedia", title],
    queryFn: async () => {
      if (!title) return null;
      try {
        const res = await fetchApi<WikipediaApiResponse>(
          `/enrichment/wikipedia?title=${encodeURIComponent(title)}`
        );
        return {
          title: res.summary.title,
          summary: res.summary.extract,
          url: res.summary.url,
          thumbnail: res.summary.thumbnailUrl,
        };
      } catch {
        return null;
      }
    },
    enabled: !!title,
    staleTime: 10 * 60 * 1000,
    retry: 0,
  });
}
