from fastapi import FastAPI, HTTPException
import uvicorn
from pydantic import BaseModel, ConfigDict, Field

app = FastAPI()



projects = [
    {
        "id":1,
        "title":"Основной проект",
        "description":"Наш основной проект"
    },
    {
        "id":2,
        "title":"Сайдпроект",
        "description":"Дополнительный проект для развлечения"
    }
]

class ProjectSchema(BaseModel):
    title: str = Field(max_length=100, min_length=1)
    description: str | None = Field(max_length=1000)

    model_config = ConfigDict(extra='forbid')


@app.get("/projects", summary="Получение проектов", tags=["Проекты"])
def read_projects() -> list[ProjectSchema]:
    return projects

@app.get("/projects/{project_id}", summary="Получение проекта по ID", tags=["Проекты"])
def get_project(project_id: int):
    for project in projects:
        if project["id"]==project_id:
            return project
    raise HTTPException(status_code=404)



class NewProject(BaseModel): 
    title: str
    description: str


@app.post("/projects", summary="Создание проекта", tags=["Проекты"])
def create_project(new_project: NewProject):
    projects.append({
        "id": len(projects) + 1,
        "title":new_project.title,
        "description":new_project.description
    })
    return {"success": True, "message": "Проект успешно добавлен"}

if __name__ == "__main__":
    uvicorn.run("main:app")
