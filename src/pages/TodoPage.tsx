import { useState, type FormEvent } from "react";
import { Container, Typography } from "@mui/material";
import type { Todo } from "../types/todo";
import {
  useTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../hooks/useTodo";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

export function TodoPage() {
  const { data: todosData, isLoading } = useTodos();
  console.log("todo: ", todosData);
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const todos = todosData?.data || [];

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleSelectTodo = (todo: Todo) => {
    if (editingTodo?.id === todo.id) {
      handleCancelEdit();
      return;
    }
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description || "");
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setTitle("");
    setDescription("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTodo) {
      updateTodo(
        {
          id: editingTodo.id,
          title,
          description,
          completed: editingTodo.completed,
        },
        {
          onSuccess: () => {
            handleCancelEdit();
          },
        },
      );
    } else {
      createTodo(
        { title, description },
        {
          onSuccess: () => {
            setTitle("");
            setDescription("");
          },
        },
      );
    }
  };

  const handleToggleComplete = (todo: Todo): void => {
    updateTodo({
      id: todo.id,
      title: todo.title,
      description: todo.description || "",
      completed: !todo.completed,
    });
  };

  const handleDeleteTodo = (id: number): void => {
    if (editingTodo?.id === id) handleCancelEdit();
    deleteTodo(id);
  };

  const isSaving = isCreating || isUpdating;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        My Todo List
      </Typography>

      <TodoForm
        title={title}
        description={description}
        editingTodo={editingTodo}
        isSaving={isSaving}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />

      <TodoList
        todos={todos}
        isLoading={isLoading}
        editingTodoId={editingTodo?.id ?? null}
        onSelectTodo={handleSelectTodo}
        onToggleComplete={handleToggleComplete}
        onDeleteTodo={handleDeleteTodo}
      />
    </Container>
  );
}
