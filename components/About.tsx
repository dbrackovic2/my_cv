import React from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image';
import { PageInfo } from '@/typings';
import { urlFor } from '@/sanity';

type Props = {
    pageInfo: PageInfo;
}

function About({pageInfo}: Props) {
  return (
    <motion.div 
        initial={{
            opacity: 0
        }}
        whileInView={{
            opacity: 1
        }}
        transition={{
            duration: 1.5
        }}
        className='flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
        <h3 className='absolute top-10 uppercase tracking-[20px] text-gray-500 text-2xl'>About</h3>
        <motion.div
        className='relative top-10'
            initial={{
                x: -200,
                opacity: 0,
            }}
            transition={{
                duration: 1.2,
            }}
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            viewport={{
                once: true
            }}
        >
            <Image src={urlFor(pageInfo?.profilePic).url()} width={294} height={325} alt='ProfilePhoto'
             className='mb-1 md:mb-5 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]' />
        </motion.div>

        <div className='space-y-10 px-0 md:px-10'>
            <h4 className='text-sm md:text-base lg:text-lg xl:text-2xl font-semibold'>
                <span className='italic decoration-[#0ab0f7]'>{pageInfo.name}</span>
            </h4>
            <div>
                {
                    splitStringOnDot(pageInfo?.backgroundInformation).map(str => <p className='text-base'>{str}</p>)
                }
            </div>
        </div>
    </motion.div>
  )
}

function splitStringOnDot (text: string):string[] {
    return text.split('.');
}

export default About