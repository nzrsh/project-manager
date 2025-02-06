import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../api/projects";

export const useProjectsQuery = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5, // 5 минут
        placeholderData: (previousData) => previousData, // Сохранять предыдущие данные
        refetchOnWindowFocus: true, // Повторно запрашивать данные при фокусировке на окне
    });
};

