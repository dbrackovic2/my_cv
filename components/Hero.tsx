import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from './BackgroundCircles'
import { PageInfo } from '@/typings';
import { urlFor } from '@/sanity';

type Props = {
    pageInfo: PageInfo;
};

function Hero({pageInfo}: Props) {
    const [text, count] = useTypewriter({
        words: [`${pageInfo?.name}`],
        loop: true,
        delaySpeed: 2000,
    })
  return (
    <div className='h-screen pt-40 flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
        <BackgroundCircles />
        <Image src={urlFor(pageInfo?.heroImage).url()} alt="Profile image" width={100} height={100} className="rounded-t animate-bounce" />
        <div className='z-20'>
            <h2 className='text-sm uppercase text-gray-500 tracking-[15px]'>{pageInfo?.role}</h2>
            <h1 className='text-md lg:text-6xl font-semibold px-10'>
                <span className='mr-3'>{text}</span>
                <Cursor cursorColor='blue' />
            </h1>

            <div className='pt-9'>
                <Link href="#about">
                    <button className='heroButton'>About</button>
                </Link>
                <Link href="#experience">
                    <button className='heroButton'>Experience</button>
                </Link>
                <Link href="#skills">
                    <button className='heroButton'>Skills</button>
                </Link>
                <Link href="#projects">
                    <button className='heroButton'>Projects</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero;
