'use client'
import {useState, FormEvent} from 'react';
export default function Login():React.JSX.Element{
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        console.log(await response.json);
    } catch(error) {
        console.log(error)
    }
    }
    return(
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="flex flex-col rounded-xl bg-teal-700 p-6">
                <h1 className="text-lg my-3">Login</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-2">
                    <div className="flex justify-between">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" required onChange={(e)=>{setUsername(e.target.value)}} className="bg-gray-900 rounded-md mx-2"></input>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}} className="bg-gray-900 rounded-md mx-2"></input>
                    </div>
                    <input type="submit" className="bg-gray-900 rounded-md p-3 m-2"></input>
                </form>
            </div>
          </main>
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          </footer>
        </div>
    )
}