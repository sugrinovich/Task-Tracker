import { Task } from '../types/task';

export const tasks: Task[] = [
  {
    id: "task-1",
    status: "todo",
    category: "dev",
    title: "Сделать авторизацию на сайте",
    description: null,
    date: "2026-10-12T10:00:00Z",
    subtasks: [],
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
    subtasks: [],
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
    subtasks: [],
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
    subtasks: [],
    user: {
      name: "Леонид Васильев",
      avatar: "ЛВ",
    },
  },
];
