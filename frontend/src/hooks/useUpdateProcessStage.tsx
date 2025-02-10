import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { updateProcessStage } from "../api/projects";
import { Process, UpdateProcessStageInput } from "../types";

export const useUpdateProcessStage = () => {
  return useMutation<
    Process,
    Error,
    { id: number; data: UpdateProcessStageInput }
  >({
    mutationFn: ({ id, data }) => updateProcessStage(id, data),
    onSuccess: () => {
      // Инвалидируем запросы для обновления списка проектов
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
