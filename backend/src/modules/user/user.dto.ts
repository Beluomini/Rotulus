export type UserDTO = {
  id?: string;
  name: string;
  email: string;
  password: string;
  passwordRec: string;
  status: string;
  foodsHist?: string[];
  ingredientAlergies?: string[];
  additiveAlergies?: string[];
};