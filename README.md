# project-manager

## Веб-приложение, позволяющее организовать работу с проектами и их процессами.

### Стек технологий:
- #### Backend: 
    - Python 3.12
    - FastAPI
    - SQLModel
    
- #### Frontend: 
    - React (TypeScript) 
    - React Query
    - Zustand


# Roadmap

## Backend
- [x] Базовый CRUD для проектов (Роутинг, обработчики, схемы, модели, базы данных).
- [x] Настроить Swagger UI для документации API.
- [x] Утвердить схему процессов и обновить модели и обработчики
- [x] Добавить асинхронную работу с БД
- [x] Ручное тестирование через Swagger UI
- [x] Финальный рефакторинг

### Опционально
- [ ] Покрытие тестами
- [ ] Сборка


## Frontend
- [X] Базовый интерфейс
- [X] Реализация запросов проектов
- [X] Реализация запросов процессов
- [ ] Продвинутый интерфейс
- [ ] Декомпозиция
- [ ] Продвинутая работа с запросами
- [ ] Подключение глобального хранилища?
- [ ] Подключение стилей

### Опционально
- [ ] Покрытие тестами
- [ ] Сборка

# Проблемы:

- Лучше объединить пути для обновления процессов в один PATCH запрос, это упростило бы логику и сократило объём кода.
- Хранение этапа процесса. Логика изменения работы процессов в веб-интерфейсе криво реализована.
- Нужна продвинутая работа с API, при мутировании одного проекта инвалидируется весь кеш. В целях оптимизации можно использовать получение резульатата мутации, а не всех проектов.  
- Отсутствие оптимистичные запросов.