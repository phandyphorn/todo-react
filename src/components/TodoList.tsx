import {
  Box,
  Typography,
  Paper,
  IconButton,
  Checkbox,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  editingTodoId: number | null;
  onSelectTodo: (todo: Todo) => void;
  onToggleComplete: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
}

export function TodoList({
  todos,
  isLoading,
  editingTodoId,
  onSelectTodo,
  onToggleComplete,
  onDeleteTodo,
}: TodoListProps) {
  if (isLoading) {
    return (
      <Typography color="text.secondary" align="center" sx={{ my: 4 }}>
        Loading tasks...
      </Typography>
    );
  }

  if (todos.length === 0) {
    return (
      <Typography color="text.secondary" align="center" sx={{ my: 4 }}>
        No tasks found. Create one above!
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {todos.map((todo) => {
        const isSelected = editingTodoId === todo.id;
        return (
          <Paper
            key={todo.id}
            elevation={isSelected ? 3 : 1}
            onClick={() => onSelectTodo(todo)}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderLeft: (theme) =>
                `5px solid ${
                  isSelected
                    ? theme.palette.primary.main
                    : todo.completed
                      ? theme.palette.success.main
                      : theme.palette.warning.main
                }`,
              borderRadius: "4px 8px 8px 4px",
              cursor: "pointer",
              outline: isSelected
                ? (theme) => `2px solid ${theme.palette.primary.light}`
                : "none",
              transition: "all 0.15s ease",
              "&:hover": {
                boxShadow: 3,
                transform: "translateX(2px)",
              },
            }}
          >
            {/* Left: checkbox + text */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexGrow: 1,
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleComplete(todo);
                }}
                onClick={(e) => e.stopPropagation()}
                color="success"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "text.secondary" : "text.primary",
                  }}
                >
                  {todo.title}
                </Typography>
                {todo.description && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: todo.completed ? "text.secondary" : "text.primary",
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.description}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Right: delete button */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTodo(todo.id);
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        );
      })}
    </Stack>
  );
}
