# project-manager

## Веб-приложение, позволяющее организовать работу с проектами и их процессами.

[Backend api](https://project-manager-1myz.onrender.com/docs)

[Frontend app](https://nzrsh.github.io/project-manager/)

### Стек технологий:

- #### Backend: 
    - Python 3.12
    - FastAPI
    - SQLModel
    
- #### Frontend: 
    - React 19 (TypeScript) 
    - React Query

## Установка

1. Клонирование репозитория  

Для начала вам нужно склонировать репозиторий с GitHub на ваш компьютер. 

``` bash
$ git clone https://github.com/nzrsh/project-manager.git
```
Перейдите в папку проекта


``` bash
$ cd project-manager
```
 
2. Установка зависимостей  

a. Установка Python и venv  

Убедитесь, что на вашем компьютере установлен Python.

Создайте виртуальное окружение: 
``` bash
$ python -m venv venv
```
 

Активируйте виртуальное окружение: 

``` bash
$ source venv\Scripts\activate
```
   
b. Установка зависимостей  

Установите все необходимые зависимости из файла requirements txt:

```bash
$ pip install -r requirements.txt
```
 
3. Настройка переменных окружения  

Создайте файл .env в корне проекта и добавьте в него 

``` bash
VITE_API_BASE_URL=http://localhost:8000/api
```
Если используются стандартные настройки.

4. Запуск серверной части (FastAPI)  

Запустите сервер с помощью Uvicorn: 

``` bash
$ uvicorn app.main:app --reload
```

Или 

``` bash
$ fastapi run app/main.py
```

После запуска API будет доступно по адресу:

```
http://127.0.0.1:8000
```

И документация SwaggerUI

```
http://127.0.0.1:8000/docs
```

5. Запуск клиентской части (React)  

a. Установка Node.js  

Убедитесь, что на вашем компьютере установлен Node.js. 

b. Установка зависимостей  

Установите зависимости: 

``` bash
$ cd frontend
$ npm install
```
c. Запуск React-приложения  

``` bash
$ npm run dev
```


## Roadmap

#### Backend
- [x] Базовый CRUD для проектов (Роутинг, обработчики, схемы, модели, базы данных).
- [x] Настроить Swagger UI для документации API.
- [x] Утвердить схему процессов и обновить модели и обработчики
- [x] Добавить асинхронную работу с БД
- [x] Ручное тестирование через Swagger UI
- [x] Финальный рефакторинг

#### Опционально
- [ ] Покрытие тестами
- [ ] Сборка


### Frontend
- [X] Базовый интерфейс
- [X] Реализация запросов проектов
- [X] Реализация запросов процессов
- [X] Продвинутый интерфейс
- [X] Подключение стилей
- [X] Декомпозиция


#### Опционально
- [ ] Immer и Reducer
- [ ] Продвинутая работа с запросами
- [ ] Подключение глобального хранилища
- [ ] Покрытие тестами
- [ ] Сборка

# Проблемы:

- Лучше объединить пути для обновления процессов в один PATCH запрос, это упростило бы логику и сократило объём кода.
- Хранение этапа процесса. Логика изменения работы процессов в веб-интерфейсе криво реализована.
- Нужна продвинутая работа с API, при мутировании одного проекта инвалидируется весь кеш. В целях оптимизации можно использовать получение результата мутации, а не всех проектов.  
- Отсутствие оптимистичные запросов.
- Нужен ли Zustand?
- Только что созданный проект не появляется в меню редактирования (надо ли?)
- Мешанина стилей
- Проверка на изменения при Update для снижения количества запросов