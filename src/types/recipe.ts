// Type definition for recipes
export interface Recipe {
  id: number;
  image: string;
  name: string;
  servings: number;
  ingredients: {
    ingredient: string;
    quantity?: number | string;
    unit?: string;
    unite?: string;
  }[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
};