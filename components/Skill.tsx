import React from 'react'
import { motion } from 'framer-motion'
import { Skill } from '@/typings';
import { urlFor } from '@/sanity';

type Props = {
    skill: Skill;
    directionLeft?: boolean;
}

function Skill({ skill, directionLeft }: Props) {
  return (
    <div className='group relative flex cursor-pointer'>
        <motion.div
        initial={{
            x: directionLeft ? -100: 100,
            opacity: 0,
        }}
        transition={{
            duration: 1,
        }}
        whileInView={{
            opacity: 1,
            x: 0
        }}>
            <div className='text-[8px] md:text-sm/2 lg:text-sm text-left w-12 h-12 md:w-16 md:h-16 lg:h-28 lg:w-28 xl:h-32 xl:w-32'><img src={urlFor(skill.image).url()}
            alt='skill'
            key={skill._id}
            className='rounded-md w-10 h-10 md:w-14 md:h-14 lg:h-24 lg:w-24 xl:h-28 xl:w-28
            border border-transparent object-cover filter group-hover:grayscale transition duration-300 ease-in-out' />
            {skill.title}</div>
        </motion.div>
        <div key={skill._createdAt} className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out
            group-hover:bg-white z-0 rounded-md w-10 h-10 md:w-14 md:h-14 lg:h-24 lg:w-24 xl:h-28 xl:w-28'>
            <div key={skill._updatedAt} className='flex items-center justify-center'>
                <p className='text-xs/2 md:text-sm lg:text-xl font-bold text-black opacity-100'>{skill.progress}%</p>
            </div>
        </div>
    </div>
  )
}

export default Skill