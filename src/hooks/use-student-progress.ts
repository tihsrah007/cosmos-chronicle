import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchApi, { mutateApi } from "@/api/client";
import type {
  ApiStudentProgress,
  StudentProgressResponse,
  StudentLessonProgressResponse,
} from "@/api/types";

const DEFAULT_STUDENT_ID = "demo-student";

export function useStudentProgress(studentId = DEFAULT_STUDENT_ID) {
  return useQuery<ApiStudentProgress[]>({
    queryKey: ["progress", studentId],
    queryFn: async () => {
      const res = await fetchApi<StudentProgressResponse>(
        `/students/${studentId}/progress`,
      );
      return res.progress;
    },
    staleTime: 30_000,
    retry: 1,
  });
}

export function useUpdateStudentProgress(studentId = DEFAULT_STUDENT_ID) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      lessonId,
      ...data
    }: {
      lessonId: string;
      completedSlides: number;
      lastSlideId: string;
    }) =>
      mutateApi<StudentLessonProgressResponse>(
        `/students/${studentId}/progress/${lessonId}`,
        "PUT",
        data,
      ),
    onMutate: async ({ lessonId, completedSlides, lastSlideId }) => {
      await qc.cancelQueries({ queryKey: ["progress", studentId] });
      const prev = qc.getQueryData<ApiStudentProgress[]>(["progress", studentId]);
      if (prev) {
        qc.setQueryData<ApiStudentProgress[]>(
          ["progress", studentId],
          prev.map((p) =>
            p.lessonId === lessonId
              ? { ...p, completedSlides, lastSlideId, completionPercent: Math.round((completedSlides / p.totalSlides) * 100), updatedAt: new Date().toISOString() }
              : p,
          ),
        );
      }
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        qc.setQueryData(["progress", studentId], context.prev);
      }
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["progress", studentId] }),
  });
}
