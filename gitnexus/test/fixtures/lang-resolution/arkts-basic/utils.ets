export interface User {
  id: number;
  name: string;
}

export function formatUser(user: User): string {
  return `User #${user.id}: ${user.name}`;
}
