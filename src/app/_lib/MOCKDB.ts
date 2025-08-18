import { UserInfoStruct } from "./definitions";

//Password: 1234567890
export let user_database:UserInfoStruct[] = [{id:"jbdjfbwjw", email:"bob@mail.com", password:"$2b$10$pF48SeX4mh0J0PbmhOeOe.YLHjMdAyE5RkOGVlKycwADL7ciKL8E.", name:"Bob"}];

export async function getUserName(id:string | string[] | undefined):Promise<UserInfoStruct | undefined>{
    return user_database.find((user)=>{user.id === id});
}

export async function getUserByEmail(email:string): Promise<UserInfoStruct | undefined>{
    console.log("EMAIL: ", email);
    email = email.trim()
    const foundUser = user_database.find((user)=>{user.email.trim() === email});
    console.log("GETUSER by EMAIL: ", foundUser);
    return foundUser;
}   
