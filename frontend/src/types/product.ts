export type Category = {
  id: string;
  name: string;
}

export type Product = {
  id: string;
  name: string;
  description?: string; // Optionnel avec le "?"
  price: number;        // Int en Prisma = number en TS
  stock: number;
  imageUrl: string;
  isActive: boolean;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

// Données requises pour la création / modification
export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  file: File | null; // Pour le champ image (name="file")
}