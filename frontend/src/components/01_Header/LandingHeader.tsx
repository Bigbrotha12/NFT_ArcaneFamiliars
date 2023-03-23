import React from "react";
import Material from "../../assets/Material";
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import profilePic from "../../assets/icons/profilePic.png";

export default function LandingHeader(props: { items: Array<{title: string, link: string}>}): JSX.Element {
    return (
        <header className="bg-[#242424] flex p-3 bg-primary border-2 border-gray-700 gap-3">
            <img className="mx-3" src={Logo} height='32px' width='32px' alt="Gaia's Guardians" />
            
            <nav className="hidden md:block text-white my-auto">
                {
                    props.items.map(item => {
                        return (
                            <Link key={item.title} to={item.link}>
                                <Material.Button color='inherit'>{item.title}</Material.Button>
                            </Link>
                        )
                    })
                }
            </nav>
            
            <div id='user-address' className='relative flex ml-auto'>
                <div className="after:content-[''] after:absolute after:h-3 after:w-3 after:bg-green-500 after:rounded-3xl after:right-0 after:bottom-0 after:border-2 after:border-[#242424]">
                    <img className="rounded-3xl" src={profilePic} width='45px' height='45px' alt='profile picture' />
                </div>   
            </div>
            <p className="hidden md:block text-white mx-3 my-auto">0x9333.54fac</p>

            <div>
                <button className='bg-white p-3 rounded-md my-auto' color='inherit'>Connect</button>
            </div>
        </header>
    )
}