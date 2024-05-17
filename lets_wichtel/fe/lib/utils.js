import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Installed from shadcn
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
