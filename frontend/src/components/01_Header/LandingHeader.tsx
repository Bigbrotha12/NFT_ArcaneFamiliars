import React from "react";
import Material from "../../assets/Material";
import { Link } from "react-router-dom";

export default function LandingHeader(props: { items: Array<{title: string, link: string}>}): JSX.Element {
    return (
        <header className="flex p-3 bg-primary">
            <img />
            
            <nav>
                {
                    props.items.map(item => {
                        return (
                            <Link to={item.link}>
                                <Material.Button>{item.title}</Material.Button>
                            </Link>
                        )
                    })
                }
            </nav>
            
            <div>
            </div>

            <div>
                <Material.Button>Connect</Material.Button>
            </div>
        </header>
    )
}