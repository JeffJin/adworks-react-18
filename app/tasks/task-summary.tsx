import { useTasks } from '@/app/tasks/tasks-provider';

export default function TaskSummary() {
  const tasks = useTasks();
  const checked = tasks.filter((task: any) => task.done).length;
  const total = tasks.length;
  return (
    <p>
      Total {checked} out of {total} are completed.
    </p>
  );
}

let nextId = 3;
