import React from 'react'
import {motion} from 'framer-motion'
import ExperienceCard from './ExperienceCard'
import { Experience } from '@/typings'

type Props = {
    experiences: Experience[];
}

function WorkExperience({experiences}: Props) {
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
        className='h-screen flex relative overflow-hidden flex-col text-left
        md:flex-row max-w-full px-10 justify-evenly mx-auto items-center'>
        <h3 className='absolute top-8 uppercase tracking-[20px] text-gray-500 text-lg sm:text-2xl opacity-30'>
            Experience
        </h3>

        <div className='w-full flex space-x-5 overflow-x-scroll overflow-y-hidden p-10 snap-x snap-mandatory
        scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#0ab0f7]/80'>
            {
                orderedExperiences(experiences).map((experience) => <ExperienceCard key={experience._id} experience={experience} /> )
            }
        </div>
    </motion.div>
  )
}

function orderedExperiences(experiences: Experience[]): Experience[] {
    return experiences.sort((a: Experience, b: Experience) => Number(new Date(a.dateStarted)) - Number(new Date(b.dateStarted)));
}

export default WorkExperience;
