'use client';

import TaskSummary from '@/app/(public)/tasks/task-summary';
import { TasksProvider } from '@/app/(public)/tasks/tasks-provider';
import AddTask from './add-task';
import TaskList from './task-list';
import "./tasks.scss";

export default function TaskApp() {
  return (
      <TasksProvider>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
        <TaskSummary />
      </TasksProvider>
  );
}
