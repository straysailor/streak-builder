'use client'
import { useState } from "react";
import Image from 'next/image';

interface NavbarProps {
    username: string,
    isAuthenticated: boolean
}
export default function Navbar():React.JSX.Element{
    let [navbarOpen, setNavbarOpen] = useState<boolean>(false);
    let [loggedIn, setLoggedIn] = useState<boolean>(false);
    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    }
    return (
        <div className={`fixed min-h-full p-4 grid grid-cols-1 content-start ${navbarOpen ? "bg-slate-700" : "bg-transparent"}`}>
            <button className={`bg-gray-900 rounded-full px-3 py-1 ${navbarOpen ? "justify-self-end": "justify-self-start"}`} onClick={toggleNavbar}>{navbarOpen ? "<":">"}</button>
            <nav className="min-h-full lg:max-w-100 md:w-screen sm:w-screen p-6 z-50">
            {navbarOpen &&
            <div className="grid grid-cols-1 gap-y-3">
                <span>{loggedIn ? "Profile" : "Log in to save your data!"}</span>
                {loggedIn ? 
                <div className="flex justify-start items-center gap-3 p-2 bg-gray-900 rounded-md">
                    <Image
                    src="/globe.svg"
                    alt="User Profile Picture"
                    width={30}
                    height={30}
                    >
                    </Image>
                    <span>John Doe</span>
                </div>
                :
                <div className="flex justify-start items-center gap-3 p-2 bg-gray-900 rounded-md">
                    <Image
                    src="/globe.svg"
                    alt="Enter Door icon"
                    width={30}
                    height={30}
                    >
                    </Image>
                    <span>Log In / Sign Up</span>
                </div>
                }
                
                <span>Pages</span>
                <div className="flex justify-start items-center gap-3 p-2 bg-gray-900 rounded-md">
                    <Image
                    src="/globe.svg"
                    alt="Trophy"
                    width={30}
                    height={30}
                    >
                    </Image>
                    <span>Trophy Room</span>
                </div>
                <div className="flex justify-start items-center gap-3 p-2 bg-gray-900 rounded-md">
                    <Image
                    src="/globe.svg"
                    alt="Goal Hoop"
                    width={30}
                    height={30}
                    >
                    </Image>
                    <span>Goal Progress</span>
                </div>
                <div className="flex justify-start items-center gap-3 p-2 bg-gray-900 rounded-md">
                    <Image
                    src="/globe.svg"
                    alt="Check List"
                    width={30}
                    height={30}
                    >
                    </Image>
                    <span>Task List</span>
                </div>
                <button className="bg-gray-900 rounded-full px-3 py-1 place-self-end" >?</button>
            </div>      
            }
            </nav>

        </div>
    );
}