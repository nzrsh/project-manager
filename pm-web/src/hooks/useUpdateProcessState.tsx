import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { updateProcessState } from "../api/projects";
import { Process, UpdateProcessStateInput } from "../types";

export const useUpdateProcessState = () => {
  return useMutation<
    Process,
    Error,
    { id: number; data: UpdateProcessStateInput }
  >({
    mutationFn: ({ id, data }) => updateProcessState(id, data),
    onSuccess: () => {
      // Инвалидируем запросы для обновления списка проектов
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
