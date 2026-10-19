import { Task } from '../types/task';

export const tasks: Task[] = [
  {
    id: "task-1",
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
    user: {
      name: "Алексей Кузнецов",
      avatar: "AK",
    },
  },
  {
    id: "task-2",
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
    user: {
      name: "Иван Петров",
      avatar: "ИП",
    },
  },
  {
    id: "task-3",
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
    user: {
      name: "Алексей Кузнецов",
      avatar: "AK",
    },
  },
  {
    id: "task-4",
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
    user: {
      name: "Леонид Васильев",
      avatar: "ЛВ",
    },
  },
];
