import { Role, ProductStatus } from "@prisma/client";

export type { Role, ProductStatus };

export interface SafeUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatar: string | null;
  bio: string | null;
  createdAt: Date;
}

export interface ProductWithDetails {
  id: string;
  title: string;
  description: string;
  downloadLink: string;
  credits: string | null;
  views: number;
  downloadCount: number;
  featured: boolean;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
  };
  author: {
    id: string;
    username: string;
    avatar: string | null;
    role: Role;
  };
  images: {
    id: string;
    url: string;
  }[];
  _count?: {
    downloads: number;
  };
}

export interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  _count: {
    products: number;
  };
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalDownloads: number;
  totalViews: number;
  recentProducts: ProductWithDetails[];
}
