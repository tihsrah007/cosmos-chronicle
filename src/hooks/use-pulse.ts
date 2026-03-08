import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";
import type { PulseResponse, PulseUpdate } from "@/api/pulse-types";
import mockData from "@/data/pulseMockData";

async function fetchPulse(): Promise<PulseUpdate[]> {
  try {
    const data = await fetchApi<PulseResponse>("/pulse");
    return data.updates;
  } catch {
    // Fallback to mock data when API is unavailable
    return mockData;
  }
}

export function usePulse() {
  return useQuery({
    queryKey: ["pulse"],
    queryFn: fetchPulse,
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}

const LAST_VISIT_KEY = "terranova-pulse-last-visit";

export function getLastVisit(): number {
  const raw = localStorage.getItem(LAST_VISIT_KEY);
  return raw ? parseInt(raw, 10) : 0;
}

export function markVisit() {
  localStorage.setItem(LAST_VISIT_KEY, Date.now().toString());
}
