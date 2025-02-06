import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { createProject } from "../api/projects";
import { Project, CreateProjectInput } from "../types";

export const useCreateProject = () => {
  return useMutation<Project, Error, CreateProjectInput>({
    mutationFn: createProject,
    onSuccess: () => {
      // Инвалидируем запросы для обновления списка проектов
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
