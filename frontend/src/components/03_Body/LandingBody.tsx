import React from "react";
import Material from "../../assets/Material";
import LandscapeImage from "../../assets/images/drywet-land.png";
import Penguin from "../../assets/images/Claudio.png";
import Bunny from "../../assets/images/Renny.png";
import Tommy from "../../assets/images/Tommy.png";
import Alan from "../../assets/images/Alan.png";

export default function LandingBody(): JSX.Element {
    return (
        <div className=" bg-dark-primary">
            <section id='welcome-section' className="flex align-middle bg-mainBackdrop bg-no-repeat bg-cover h-screen">
                {/* <img className='mx-auto rounded-[24px]' src={LandscapeImage} height='512px' width='512px' alt='landscape'/> */}
                <div className="my-auto md:max-w-[40%] text-[#ffffff] leading-6 h-full p-16 bg-[#483131] mix-blend-multiply">
                    <Material.Typography variant="h2" sx={{fontWeight: 'bold', marginBottom: '48px'}} textAlign='center'>Heal the World</Material.Typography>
                    <Material.Typography color='inherit'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.Ex sint et fugiat cupidatat velit ipsum et tempor magna ipsum dolor.
                    Do ullamco in duis quis eu. Incididunt magna minim pariatur pariatur ipsum sit sint ut ex.
                    Cillum ea non officia ipsum nisi anim quis.</Material.Typography>
                </div>
            </section>

            <section id='service-section' className="flex align-middle py-10">
                <div className="my-auto mx-6 text-[#f0f0f0] leading-6">
                    <h6 className="text-2xl text-bold mb-3">Play in Browser!</h6>
                    <Material.Typography>
                        Adipisicing tempor ut quis aliquip id sunt Lorem. Veniam reprehenderit cupidatat non est sit ea do ut et.
                        Sint ut enim eu magna occaecat laboris et sint dolore eu ipsum sit. Culpa proident ad commodo laboris
                        dolore sit aliquip aute qui.
                    </Material.Typography>
                    <Material.Button sx={{color: '#f0f0f0', borderColor: '#f0f0f0', marginY: '12px'}} variant='outlined'>Play Now</Material.Button>
                </div>
            </section>

            <section id='how-to-play-section' className="flex align-middle">
                <div className="my-auto mx-6 text-[#f0f0f0] leading-6">
                    <h6 className="text-2xl text-bold mb-3">How to Play</h6>
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
                        <Material.Card sx={{maxWidth: '256px'}} >
                            <Material.CardMedia
                                component='img'
                                image={Penguin}
                                height='96'
                                alt='Claudio The Penguin'
                            />
                            <Material.CardContent>
                                <Material.Typography fontWeight='bold'>Claudio</Material.Typography>
                                <Material.Typography>The Penguin</Material.Typography>
                            </Material.CardContent>
                        </Material.Card>

                        <Material.Card sx={{maxWidth: '256px'}}>
                            <Material.CardMedia
                                component='img'
                                image={Bunny}
                                height='96'
                                alt='Renny The Bunny'
                            />
                            <Material.CardContent>
                                <Material.Typography fontWeight='bold'>Renny</Material.Typography>
                                <Material.Typography>The Bunny</Material.Typography>
                            </Material.CardContent>
                        </Material.Card>

                        <Material.Card sx={{maxWidth: '256px'}}>
                            <Material.CardMedia
                                component='img'
                                image={Tommy}
                                height='96'
                                alt='Tommy The Caveman'
                            />
                            <Material.CardContent>
                                <Material.Typography fontWeight='bold'>Tommy</Material.Typography>
                                <Material.Typography>The Caveman</Material.Typography>
                            </Material.CardContent>
                        </Material.Card>

                        <Material.Card sx={{maxWidth: '256px'}}>
                            <Material.CardMedia
                                component='img'
                                image={Alan}
                                height='96'
                                alt='Alan The Hawk'
                            />
                            <Material.CardContent>
                                <Material.Typography fontWeight='bold'>Alan</Material.Typography>
                                <Material.Typography>The Hawk</Material.Typography>
                            </Material.CardContent>
                        </Material.Card>
                     
                        
                    </div>
                    
                </div>
            </section>

        </div>
    )
}