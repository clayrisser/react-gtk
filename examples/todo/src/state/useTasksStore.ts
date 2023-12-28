/*
 *  File: /src/state/useTasksStore.ts
 *  Project: @react-gtk/tasks-example
 *  File Created: 27-12-2023 15:54:30
 *  Author: dharmendra
 *  -----
 *  BitSpur (c) Copyright 2017 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { create } from 'zustand';
import { nanoid } from 'nanoid';

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
}

const useTasksStore = create((set) => ({
  tasks: [] as TaskProps[],
  setTasks: (task: TaskProps) =>
    set((state: any) => ({ tasks: [...state.tasks, { ...task, id: task.id ? task.id : nanoid() }] })),
  removeTasks: (taskId: string) =>
    set((state: any) => ({ tasks: state.tasks.filter((task: TaskProps) => task.id !== taskId) })),
  updateTasks: (taskId: string, task: TaskProps) =>
    set((state: any) => ({
      tasks: state.tasks.map((t: TaskProps) => (t.id === taskId ? task : t)),
    })),
}));

export default useTasksStore;
