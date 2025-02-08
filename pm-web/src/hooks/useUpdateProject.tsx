import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { updateProject } from "../api/projects";
import { Project, UpdateProjectInput } from "../types";

export const useUpdateProject = () => {
  return useMutation<Project, Error, { id: number; data: UpdateProjectInput }>({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: () => {
      // Инвалидируем запросы для обновления списка проектов
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};