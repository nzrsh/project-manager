import {Project, CreateProjectInput, UpdateProjectInput, Process, UpdateProcessStageInput, UpdateProcessStateInput } from "../types/index"

const API_PROJECT_URL = "http://localhost:8000/api/projects"
const API_PROCESS_URL = "http://localhost:8000/api/processes"

export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const response = await fetch(API_PROJECT_URL);
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
    const response = await fetch(API_PROJECT_URL, {
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
    const response = await fetch(`${API_PROJECT_URL}/${id}`, {
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
    const response = await fetch(`${API_PROJECT_URL}/${id}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Ошибка при удалении проекта");
    }
  };

export const updateProcessStage = async (
  id: number,
  newStage: UpdateProcessStageInput
): Promise<Process> => {
  const response = await fetch(`${API_PROCESS_URL}/${id}/stage`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStage)
  });
  if (!response.ok) {
    throw new Error("Ошибка при обновлении стадии процесса");
  }

  return response.json();
}

export const updateProcessState = async (
  id: number,
  newState: UpdateProcessStateInput
): Promise<Process> => {
  const response = await fetch(`${API_PROCESS_URL}/${id}/state`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newState)
  });
  if (!response.ok) {
    throw new Error("Ошибка при обновлении состояния процесса");
  }

  return response.json();
}
