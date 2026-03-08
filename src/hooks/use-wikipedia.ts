import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";

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
        const res = await fetchApi<WikipediaSnapshot>(
          `/enrichment/wikipedia?title=${encodeURIComponent(title)}`
        );
        return res;
      } catch {
        return null;
      }
    },
    enabled: !!title,
    staleTime: 10 * 60 * 1000,
    retry: 0,
  });
}
