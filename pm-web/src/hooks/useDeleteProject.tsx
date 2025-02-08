import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { deleteProject } from "../api/projects";

export const useDeleteProject = () => {
  return useMutation<void, Error, number>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};