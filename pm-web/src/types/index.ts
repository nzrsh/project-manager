export interface Process {
    id: number;
    title: string;
    is_active: boolean;
    state_stage: number;
  }

export interface Project {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    processes: Process[];
}

export interface CreateProjectInput {
    title: string;
    description: string;
  }

export interface UpdateProjectInput {
    title?: string;
    description?: string;
}
  
