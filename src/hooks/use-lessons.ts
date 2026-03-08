import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchApi, { mutateApi } from "@/api/client";
import type {
  ApiLesson,
  ApiSlide,
  LessonsResponse,
  LessonResponse,
  SlideResponse,
} from "@/api/types";

export function useLessons(domain?: string) {
  const qs = domain ? `?domain=${encodeURIComponent(domain)}` : "";
  return useQuery<ApiLesson[]>({
    queryKey: ["lessons", domain ?? "all"],
    queryFn: async () => {
      const res = await fetchApi<LessonsResponse>(`/lessons${qs}`);
      return res.lessons;
    },
    staleTime: 60_000,
    retry: 1,
  });
}

export function useLesson(lessonId: string) {
  return useQuery<ApiLesson>({
    queryKey: ["lessons", lessonId],
    queryFn: async () => {
      const res = await fetchApi<LessonResponse>(`/lessons/${lessonId}`);
      return res.lesson;
    },
    staleTime: 60_000,
    retry: 1,
    enabled: !!lessonId,
  });
}

export function useCreateLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { domain: string; title: string; description: string; coverImage?: string }) =>
      mutateApi<LessonResponse>("/lessons", "POST", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
  });
}

export function useUpdateLesson(lessonId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<{ title: string; description: string; coverImage: string }>) =>
      mutateApi<LessonResponse>(`/lessons/${lessonId}`, "PATCH", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lessons"] });
      qc.invalidateQueries({ queryKey: ["lessons", lessonId] });
    },
  });
}

export function useDeleteLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => mutateApi<void>(`/lessons/${lessonId}`, "DELETE"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
  });
}

// Slide mutations
export function useCreateSlide(lessonId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; content: string; order: number; mapItemIds?: string[]; imageUrl?: string }) =>
      mutateApi<SlideResponse>(`/lessons/${lessonId}/slides`, "POST", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons", lessonId] }),
  });
}

export function useUpdateSlide(lessonId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ slideId, ...data }: { slideId: string; title?: string; content?: string; order?: number; mapItemIds?: string[]; imageUrl?: string }) =>
      mutateApi<SlideResponse>(`/lessons/${lessonId}/slides/${slideId}`, "PATCH", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons", lessonId] }),
  });
}

export function useDeleteSlide(lessonId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slideId: string) => mutateApi<void>(`/lessons/${lessonId}/slides/${slideId}`, "DELETE"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons", lessonId] }),
  });
}
