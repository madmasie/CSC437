export interface Recipe {
  id: string;
  href: string;
  icon: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  time: string;
  ingredients?: string[];
  instructions?: string[];
  tags?: string[];
}
