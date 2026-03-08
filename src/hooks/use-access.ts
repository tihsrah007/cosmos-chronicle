import { useQuery } from "@tanstack/react-query";
import fetchApi from "@/api/client";

interface AccessConfig {
  pinRequired: boolean;
  message?: string;
  title?: string;
}

interface PinResponse {
  valid: boolean;
  message?: string;
}

export function useAccessConfig() {
  return useQuery<AccessConfig>({
    queryKey: ["access", "config"],
    queryFn: async () => {
      const res = await fetchApi<AccessConfig>("/access/config");
      return res;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export async function verifyPin(pin: string): Promise<PinResponse> {
  const res = await fetch("http://localhost:4000/api/access/pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin }),
  });
  if (!res.ok) {
    if (res.status === 401) return { valid: false, message: "Invalid PIN" };
    throw new Error("Failed to verify PIN");
  }
  return res.json();
}
