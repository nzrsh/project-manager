import {Project, CreateProjectInput, UpdateProjectInput } from "../types/index"

const API_URL = "http://localhost:8000/api/projects"

export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Ошибка при получении проектов");
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка сети:", error);
        throw error;
    }
}


export const createProject = async (newProject: CreateProjectInput): Promise<Project> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type':"application/json"
        },
        body: JSON.stringify(newProject)
    });
    if (!response.ok) {
        throw new Error("Ошибка при создании проекта")
    }
    return response.json();
}

export const updateProject = async (
    id: number,
    updatedData: UpdateProjectInput // Только обновляемые поля
  ): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  
    if (!response.ok) {
      throw new Error("Ошибка при обновлении проекта");
    }
  
    return response.json();
  };
  export const deleteProject = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Ошибка при удалении проекта");
    }
  };
