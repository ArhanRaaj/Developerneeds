import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export const ROLE_HIERARCHY: Record<string, number> = {
  MEMBER: 0,
  DROPPER: 1,
  ADMIN: 2,
  COFOUNDER: 3,
  FOUNDER: 4,
};

export function hasMinRole(userRole: string, requiredRole: string): boolean {
  return (ROLE_HIERARCHY[userRole] ?? 0) >= (ROLE_HIERARCHY[requiredRole] ?? 0);
}

export function canManageProducts(role: string): boolean {
  return hasMinRole(role, "DROPPER");
}

export function canModerate(role: string): boolean {
  return hasMinRole(role, "ADMIN");
}

export function canAssignRoles(role: string): boolean {
  return role === "FOUNDER";
}
