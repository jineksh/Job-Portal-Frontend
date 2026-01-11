import { ArrowRight, Briefcase, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
const Hero = () => {
    return (
        <div>
            <section className='relative overflow-hidden bg-secondary'>
                <div className='absolute inset-0 opacity-5'>
                    <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-b-full blur-3xl'>

                    </div>

                    <div className='absolute bottom-20 right-10 w-96 h-96 rounded-b-full blur-3xl'>

                    </div>
                </div>

                <div className='container mx-auto px-5 py-16 md:py-24 relative '>
                    <div className='flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16'>
                        <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6'>
                            <div className='inline-flex items-centers gap-2 px-4 py-2 rounded-b-full border bg-background/50 backdrop-blur-sm'>
                                <TrendingUp size={16} className='text-blue-600' />
                                <span className='text-sm font-medium'>#1 Job Platform in India</span>
                            </div>
                            {/*main Heading*/}
                            <h1 className='text-4x1 md:text-5xl lg:text-6xl font-bold leading-right'>
                                Find Your Dream Job At  <span className='inline-block'>HireMe</span>
                            </h1>
                            {/* Descritption*/}
                            <p className='text-lg md:text-xl leading-relaxed opacity-50 max-w-2xl'>
                                Connect with top employers and discover opportunities that match with your skills.
                            </p>
                            {/* stats*/}
                            <div className='flex flex-wrap justify-center md:justify-start gap-8 py-4'>
                                <div className='text-center md:text-left'>
                                    <p className='text-3xl font-bold text-blue-600'>10k+</p>
                                    <p className='text-sm opacity-70'>Active Jobs</p>
                                </div>

                                <div className='text-center md:text-left'>
                                    <p className='text-3xl font-bold text-blue-600'>5k+</p>
                                    <p className='text-sm opacity-70'>Companies</p>
                                </div>

                                <div className='text-center md:text-left'>
                                    <p className='text-3xl font-bold text-blue-600'>10k+</p>
                                    <p className='text-sm opacity-70'>Job Seekers</p>
                                </div>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                <Link href='/jobs'>
                                    <Button size={"lg"} className='text-base px-8 h-12 gap-2 group transition-all'>
                                        <Search size={18} />
                                        Browse Jobs <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
                                    </Button>
                                </Link>

                                <Link href='/about'>
                                    <Button className='text-base px-8 h-12 gap-2' variant='outline' size='lg'>
                                        <Briefcase size={18} />
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                            {/*trust*/}
                            <div className='flex items-center gap-2 opacity-60 pt-4'>

                                <span> ✔️ Free to use</span>
                                <span>•</span>


                                <span>✔️ Varified Employers</span>
                                <span>•</span>


                                <span>✔️ Secure Platform</span>
                                <span>•</span>
                            </div>
                        </div>

                        {/** image section */}
                        <div className="flex-1 relative">
                            <div className="relative group">

                                {/* glow */}
                                <div className="absolute -inset-4 bg-blue-400 opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity" />

                                {/* image box */}
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-background">
                                    <img
                                        src="/hero.png"   // public folder me image rakh
                                        alt="Job search illustration"
                                        width={500}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                      
                                    ></img>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
