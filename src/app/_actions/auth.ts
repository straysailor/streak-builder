"use server"
import { LoginFormSchema, FormState, UserFormFieldsStruct, UserInfoStruct} from "../_lib/definitions";
import {z} from "zod";
import { createSession } from "../_lib/session";
import { redirect } from "next/navigation";


const bcrypt = require('bcrypt');
const saltrounds = 10;

let user_database:UserInfoStruct[] = [];

export async function login(state: FormState, formData: FormData ){
    const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

    if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

    const {email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    // To be replaced by legit database
    let foundUser = user_database.find((user)=>{user.email === email});
    if (foundUser){
        if (foundUser.password === hashedPassword){
            await createSession(foundUser.id);
            redirect('/');
        } else {
            redirect('/login');
        }
    } else {
        const newUser = {
            id: crypto.randomUUID(),
            email: email,
            password: hashedPassword,
            name: email
        };
        user_database.push(newUser);
        await createSession(newUser.id)
        redirect("/");
    }
}