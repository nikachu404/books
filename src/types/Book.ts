export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
  createdAt: Date | null;
  editedAt: Date | null;
  isActive: boolean;
}
