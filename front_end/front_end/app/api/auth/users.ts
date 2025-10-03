export type User = {
  name?: string;
  email: string;
  password: string;
};

// Almacenamiento en memoria (no persistente) — solo ejemplo
export const USERS: User[] = [];
