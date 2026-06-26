import type { FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Todo } from "../types/todo";

interface TodoFormProps {
  title: string;
  description: string;
  editingTodo: Todo | null;
  isSaving: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export function TodoForm({
  title,
  description,
  editingTodo,
  isSaving,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  const isEditing = !!editingTodo;

  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        borderLeft: (theme) =>
          `5px solid ${isEditing ? theme.palette.primary.main : theme.palette.grey[300]}`,
        transition: "border-color 0.2s ease",
      }}
      elevation={2}
    >
      {isEditing && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <EditIcon fontSize="small" color="primary" />
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Editing task
          </Typography>
          <Chip
            label={editingTodo.title}
            size="small"
            onDelete={onCancel}
            sx={{ ml: "auto" }}
          />
        </Box>
      )}

      <Stack spacing={2}>
        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          {isEditing && (
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ px: 4 }}
            disabled={isSaving}
          >
            {isSaving
              ? isEditing
                ? "Saving..."
                : "Adding..."
              : isEditing
                ? "Update Task"
                : "Add Task"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
