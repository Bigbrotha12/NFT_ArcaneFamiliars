import React from "react";
import Material from "../../assets/Material";
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";

export default function LandingHeader(props: { items: Array<{title: string, link: string}>}): JSX.Element {
    return (
        <header className="flex p-3 bg-primary border-2">
            <img className="mx-3" src={Logo} height='32px' width='32px' alt="Gaia's Guardians" />
            
            <nav>
                {
                    props.items.map(item => {
                        return (
                            <Link key={item.title} to={item.link}>
                                <Material.Button>{item.title}</Material.Button>
                            </Link>
                        )
                    })
                }
            </nav>
            
            <div>
            </div>

            <div className="ml-auto">
                <Material.Button>Connect</Material.Button>
            </div>
        </header>
    )
}