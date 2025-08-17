'use client'
import {useState, FormEvent, useActionState} from 'react';
import { login } from '../_actions/auth';
export default function Login():React.JSX.Element{
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [state, action, pending] = useActionState(login, undefined);
 
    return(
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="flex flex-col rounded-xl bg-teal-700 p-6">
                <h1 className="text-lg my-3">Login</h1>
                <form action={action} className="grid grid-cols-1 gap-y-2">
                    <div className="flex justify-between">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" required onChange={(e)=>{setUsername(e.target.value)}} className="bg-gray-900 rounded-md mx-2"></input>
                    </div>
                    {state?.errors?.email && <p>{state.errors.email}</p>}
                    <div className="flex justify-between">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}} className="bg-gray-900 rounded-md mx-2"></input>
                    </div>
                    {state?.errors?.password && (
                        <div>
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                            ))}
                        </ul>
                        </div>
                    )}
                    <input type="submit" disabled={pending} className="bg-gray-900 rounded-md p-3 m-2"></input>
                </form>
            </div>
          </main>
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          </footer>
        </div>
    )
}