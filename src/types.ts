export interface FarmConfig {
  id: string;
  name: string;
  landSize: number; // in square meters (m²)
  startDate: string; // ISO date string when cultivation starts (Day -7)
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  description: string;
}

export interface Recipe {
  title: string;
  description: string;
  water: Ingredient;
  dung: Ingredient;
  urine: Ingredient;
  jaggery: Ingredient;
  flour: Ingredient;
  soil: Ingredient;
  fermentationDays: string;
  applicationMethod: string;
}

export interface PesticideRecipe {
  id: string;
  name: string;
  targetPest: string;
  ingredients: { name: string; amount: string; unit: string; desc: string }[];
  steps: string[];
  application: string;
}

export interface CropTask {
  id: string;
  dayNumber: number; // relative to Day 0 (planting day)
  title: string;
  description: string;
  phase: "Persiapan" | "Vegetatif" | "Pembentukan Umbi" | "Pematangan" | "Panen";
  isCompleted: boolean;
  dueDate: string; // actual calculated calendar date
  actionType: "jeevamrutham" | "pesticide" | "land" | "weeding" | "harvest";
}

export interface DiagnosisResult {
  diagnosis: string;
  confidence: string;
  explanation: string;
  remedy: string[];
  organicPesticide: string;
  mode: "live" | "simulation";
}

export interface ScientificArticle {
  title: string;
  author: string;
  journal: string;
  year: number;
  keyFindings: string[];
  explanation: string;
}

export interface ForumComment {
  id: string;
  author: string;
  location: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: "Racikan Organik" | "Pasokan Pasar" | "Pencegahan Hama";
  author: string;
  location: string;
  avatar: string;
  timestamp: string;
  likes: number;
  comments: ForumComment[];
  hasLiked?: boolean;
}
