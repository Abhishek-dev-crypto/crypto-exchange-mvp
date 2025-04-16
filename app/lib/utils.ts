import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes)); // Merging Tailwind classes correctly
}
