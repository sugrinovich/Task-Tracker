import { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: "task-1",
    createdAt: "2026-10-01T09:00:00Z",
    status: "todo",
    category: "dev",
    title: "Сделать авторизацию на сайте",
    description: null,
    date: "2026-10-12T10:00:00Z",
    subtasks: [
      {
        id: "subtask-1-1",
        title: "Сверстать форму входа",
        completed: true,
      },
      {
        id: "subtask-1-2",
        title: "Добавить проверку логина и пароля",
        completed: true,
      },
      {
        id: "subtask-1-3",
        title: "Настроить хранение токена",
        completed: false,
      },
      {
        id: "subtask-1-4",
        title: "Добавить выход из аккаунта",
        completed: false,
      },
    ],
  },
  {
    id: "task-2",
    createdAt: "2026-10-01T11:00:00Z",
    status: "in_progress",
    category: "dev",
    title: "API каталога",
    description: "Разработать эндпоинты для фильтрации товаров",
    date: "2026-10-10T12:00:00Z",
    subtasks: [
      {
        id: "subtask-2-1",
        title: "Спроектировать структуру эндпоинтов",
        completed: true,
      },
      {
        id: "subtask-2-2",
        title: "Добавить фильтрацию по категории",
        completed: true,
      },
      {
        id: "subtask-2-3",
        title: "Добавить фильтрацию по цене",
        completed: true,
      },
      {
        id: "subtask-2-4",
        title: "Реализовать сортировку товаров",
        completed: false,
      },
      {
        id: "subtask-2-5",
        title: "Написать тесты API",
        completed: false,
      },
    ],
  },
  {
    id: "task-3",
    createdAt: "2026-10-02T10:00:00Z",
    status: "done",
    category: "design",
    title: "Прототип в Figma",
    description: "Финальный макет мобильного приложения",
    date: "2026-10-09T18:00:00Z",
    subtasks: [
      {
        id: "subtask-3-1",
        title: "Подготовить пользовательский сценарий",
        completed: true,
      },
      {
        id: "subtask-3-2",
        title: "Создать экраны авторизации",
        completed: true,
      },
      {
        id: "subtask-3-3",
        title: "Создать экраны каталога",
        completed: true,
      },
      {
        id: "subtask-3-4",
        title: "Связать экраны в интерактивный прототип",
        completed: true,
      },
    ],
  },
  {
    id: "task-4",
    createdAt: "2026-10-05T12:00:00Z",
    status: "todo",
    category: "marketing",
    title: "Тексты для сторисов",
    description: null,
    date: "2026-10-14T09:00:00Z",
    subtasks: [
      {
        id: "subtask-4-1",
        title: "Определить темы публикаций",
        completed: false,
      },
      {
        id: "subtask-4-2",
        title: "Написать тексты для сторисов",
        completed: false,
      },
      {
        id: "subtask-4-3",
        title: "Согласовать тексты с командой",
        completed: false,
      },
    ],
  },
];
