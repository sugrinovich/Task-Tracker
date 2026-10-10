import { Task } from '../types/task';

export const tasks: Task[] = [
  {
    id: "task-1",
    status: "todo",
    category: "dev",
    title: "Сделать авторизацию на сайте",
    description: null,
    date: "2026-10-12T10:00:00Z",
    checklist_progress: {
      total: 4,
      completed: 2,
    },
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
    checklist_progress: {
      total: 5,
      completed: 3,
    },
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
    checklist_progress: {
      total: 4,
      completed: 4,
    },
    user: {
      name: "Алексей Кузнецов",
      avatar: "AK",
    },
  },
  {
    id: "task-4",
    status: "todo",
    category: "marketing",
    title: "Тексты для сторов",
    description: null,
    date: "2026-10-14T09:00:00Z",
    checklist_progress: {
      total: 3,
      completed: 0,
    },
    user: {
      name: "Леонид Васильев",
      avatar: "ЛВ",
    },
  },
];
