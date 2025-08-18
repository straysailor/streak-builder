'use client'
import { useState, useEffect } from "react";
export default function Home() {
  const [welcome, setWelcome] = useState<string>("Login or Signup to Get Started");
  const [dataDisplay, setData] = useState<string>("");
  useEffect(()=>{
    async function fetchUser(){
      try {
        const response = await fetch('/api/home');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        console.log("Response Data: ", data);
        setData(JSON.stringify(data));
        setWelcome("Welcome " + data.username);
      } catch (error){
        console.log(error);
      }
    }
    fetchUser();
  });
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>{welcome}</p>
        <p>{dataDisplay}</p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
