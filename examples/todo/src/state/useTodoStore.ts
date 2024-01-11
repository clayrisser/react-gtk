/*
 *  File: /src/state/useTodoStore.ts
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

const useTodoStore = create((set) => ({
  todos: [],

  addTodo: (todo: any) => set((state: any) => ({ todos: [...state.todos, todo] })),

  removeTodo: (id: string) => set((state: any) => ({ todos: state.todos.filter((todo: any) => todo.id !== id) })),

  toggleCompleted: (id: string) =>
    set((state: any) => ({
      todos: state.todos.map((todo: any) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    })),

  toggleFavorite: (id: string) =>
    set((state: any) => ({
      todos: state.todos.map((todo: any) => (todo.id === id ? { ...todo, favorite: !todo.favorite } : todo)),
    })),

  updateTodo: (updatedTodo: any) =>
    set((state: any) => ({
      todos: state.todos.map((todo: any) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    })),
}));

export default useTodoStore;
