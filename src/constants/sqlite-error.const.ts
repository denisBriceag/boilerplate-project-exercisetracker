type SQLiteError = {
  message: string;
  code: number;
};

export const SQLITE_ERROR_MAP: Record<string, SQLiteError> = {
  SQLITE_CONSTRAINT: {
    message: "This entity already exists in database",
    code: 409,
  },
};
