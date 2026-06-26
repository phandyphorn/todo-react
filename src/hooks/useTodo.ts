import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CreateTodoPayload,
  TodoResponse,
  TodosListResponse,
  UpdateTodoPayload,
} from "../types/todo";
import { todoAPI } from "../api/endpoint";
import { queryClient } from "../config/queryClient";

// Get all todos
export const useTodos = () => {
  return useQuery<TodosListResponse>({
    queryKey: ["todos"],
    queryFn: todoAPI.getTodos,
  });
};

// Get single todo
export const useTodo = (id: number | null) => {
  return useQuery<TodoResponse>({
    queryKey: ["todos", id],
    queryFn: () => todoAPI.getTodoById(id!),
    enabled: !!id,
  });
};

// Create todo mutation
export const useCreateTodo = () => {
  return useMutation<TodoResponse, Error, CreateTodoPayload>({
    mutationFn: todoAPI.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Create todo failed:", error.message);
    },
  });
};

// Update todo mutation
export const useUpdateTodo = () => {
  return useMutation<TodoResponse, Error, { id: number } & UpdateTodoPayload>({
    mutationFn: ({ id, ...data }) => todoAPI.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Update todo failed:", error.message);
    },
  });
};

// Delete todo mutation
export const useDeleteTodo = () => {
  return useMutation<{ message: string }, Error, number>({
    mutationFn: todoAPI.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Delete todo failed:", error.message);
    },
  });
};
