import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { createProject } from "../api/projects";
import { Project, CreateProjectInput } from "../types";

export const useCreateProject = () => {
  return useMutation<Project, Error, CreateProjectInput>({ // Возвращает 2, принимает Инпут
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
