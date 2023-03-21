import React from "react";
import Material from "../../assets/Material";
import LandscapeImage from "../../assets/images/drywet-land.png";
import Penguin from "../../assets/images/Claudio.png";
import Bunny from "../../assets/images/Renny.png";

export default function LandingBody(): JSX.Element {
    return (
        <div className=" bg-dark-primary">
            <section id='welcome-section' className="flex align-middle">
                <img className='mx-auto rounded-[24px]' src={LandscapeImage} height='512px' width='512px' alt='landscape'/>
                <div className="my-auto mx-6 max-w-[50%] text-[#f0f0f0] leading-6">
                    <h6 className="text-2xl text-bold mb-3">Heal the World</h6>
                    <Material.Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.</Material.Typography>
                </div>
            </section>

            <section id='service-section' className="flex align-middle">
                <img className='mx-auto rounded-[24px]' src={LandscapeImage} height='512px' width='512px' alt='landscape'/>
                <div className="my-auto mx-6 max-w-[50%] text-[#f0f0f0] leading-6">
                    <h6 className="text-2xl text-bold mb-3">Play in Browser!</h6>
                    <Material.Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </Material.Typography>
                    <Material.Button sx={{color: '#f0f0f0', borderColor: '#f0f0f0', marginY: '12px'}} variant='outlined'>Play Now</Material.Button>
                </div>
            </section>

            <section id='animals-section' className="flex justify-center align-middle py-3">
                <div className="my-auto mx-6 text-[#f0f0f0] leading-6 justify-center">
                    <h6 className="text-center text-2xl text-bold mb-3">Meet Gaia's Guardians</h6>
                    <div className='flex justify-between gap-3 my-6'>
                        <img className='rounded-[24px]' src={Penguin} width='256px' height='256px' alt='Claudio The Penguin' />
                        <img className='rounded-[24px]' src={Bunny} width='256px' height='256px' alt='Renny The Bunny' />
                        <img />
                    </div>
                    
                </div>
            </section>

            <section id='footer' className="flex justify-center align-middle p-3">
                <p>Follow Us!</p>
                <p>About</p>
            </section>
        </div>
    )
}