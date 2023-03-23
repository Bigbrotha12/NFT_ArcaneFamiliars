import React from "react";

import LandingHeader from "../01_Header/LandingHeader";
import LandingBody from "../03_Body/LandingBody";
import Footer from "../04_Footer/Footer";

export default function LandingPage(): JSX.Element {
    const navItems: Array<{ title: string, link: string }> = [
        { title: "Home", link: "" },
        { title: "Docs", link: "" },
        { title: "Support", link: "" },
        { title: "Play Now", link: "" }
    ]

    return (
        <div>
            <LandingHeader items={navItems} />
            <LandingBody />
            <Footer />
        </div>
    )
}