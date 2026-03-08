import { useQuery } from "@tanstack/react-query";
import fetchApi, { mutateApi } from "@/api/client";

interface AccessConfig {
  pinRequired: boolean;
  message?: string;
  title?: string;
}

interface PinResponse {
  ok: boolean;
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

export async function verifyPin(pin: string): Promise<{ valid: boolean; message?: string }> {
  try {
    const res = await mutateApi<PinResponse>("/access/pin", "POST", { pin });
    return { valid: res.ok };
  } catch (err: any) {
    // mutateApi throws on non-ok status; 401 means invalid PIN
    if (err?.message?.includes("401")) {
      return { valid: false, message: "Invalid PIN" };
    }
    throw err;
  }
}
