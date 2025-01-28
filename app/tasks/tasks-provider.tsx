import { tasksReducer } from '@/app/tasks/tasks-reducer';
import { ActionDispatch, createContext, useContext, useReducer } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext<ActionDispatch<any> | null>(null);

export function TasksProvider({ children }: { children: any }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks(): any {
  return useContext(TasksContext);
}

export function useTasksDispatch(): any {
  return useContext(TasksDispatchContext);
}

export const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
