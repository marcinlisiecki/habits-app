import Typography from "@app/components/atoms/Typography";
import React from "react";

interface ValidationError {
  path: string;
  message: string;
}

export const createError = (error: ValidationError | null, path: string) => {
  return error && error?.path === path ? (
    <Typography color={"error"} margin={"4px 0 0 0"}>
      {error.message}
    </Typography>
  ) : null;
};
