import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(10, {message: "Ensure your password is at least 10 characters long."}).trim()
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined;

  export interface ListItemStruct {
    id:string,
    name: string,
    description: string,
    dateAdded: string,
    dueDate: string,
    priority: number,
    goal: string,
    completed: boolean,
    reoccuring: boolean
    trophy: boolean
}