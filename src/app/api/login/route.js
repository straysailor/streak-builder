import { NextResponse } from 'next/server'
const registered_users = [{email: "bob@gmail.com", password: "bob"}, {email: "janedoe@mail.com", password:"1234"}];
export async function POST(request){
    try {
        const body = await request.json();
        const {username, password} = body;
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are both required' },
                { status: 400 }
            )
        }
        const user = registered_users.find((user)=>user.email === body.username);
        if (user){
            if (user.password === body.password){
                console.log(user.email + " successfully logged in")
                return NextResponse.json({email: user.email, password: user.password}, {status:201})
            } else{
                console.log(user.email + " provided the wrong password.")
                return NextResponse.json(
                    {error: 'Password was incorrect'}, 
                    {status:400}
                )
            }
        } else {
            console.log("No matching user found.")
            return NextResponse.json(
                {error: "User not found"},
                {status:404}
            )
        }
    } catch(error) {
        console.log("POST api/login error:", error);
        return NextResponse.json(
      { error: 'Failed to log in' },
      { status: 500 }
    )
    }
}