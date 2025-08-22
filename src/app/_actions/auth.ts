"use server"
import { LoginFormSchema, FormState, UserFormFieldsStruct, UserInfoStruct} from "../_lib/definitions";
import {z} from "zod";
import { createSession } from "../_lib/session";
import { redirect } from "next/navigation";
import { user_database, getUserByEmail } from "../_lib/MOCKDB";
import { hash } from "crypto";

const bcrypt = require('bcrypt');
const saltrounds = 10;

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
        console.log("PASSWORD: ", hashedPassword)

    // To be replaced by legit database
    let foundUser = await getUserByEmail(email);
    console.log("Found user: ", foundUser);
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
        }
        console.log("New Account Created: ", newUser.email, newUser.id)
        user_database.push(newUser);
        await createSession(newUser.id);
        console.log("Session created.");
        redirect("/");
    }
}