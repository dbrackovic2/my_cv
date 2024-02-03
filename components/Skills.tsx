import React from 'react'
import { motion } from 'framer-motion'
import Skill from './Skill'
import { Skill as SkillType} from '@/typings'

type Props = {
    skills: SkillType[];
}

function Skills({skills}: Props) {
  return (
    <motion.div 
    initial={{
        opacity: 0
    }}
    whileInView={{
        opacity: 1
    }}
    transition={{
        duration: 0.5
    }} 
    className='flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px]
     xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center'>
        <h3 className='absolute top-10 md:top-10 uppercase tracking-[20px] text-gray-500 text-sm md:text-2xl opacity-60'>
            Skills
        </h3>
        <h3 className='absolute top-14 md:top-20 uppercase tracking-[3px] text-gray-500 text-sm opacity-50'>
            Hover over a skill for tech proficiency
        </h3>

        <div className='grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-1'>
            {
                orderedSkills(skills)?.map(skill => <Skill key={skill._id} skill={skill} />)
            }
        </div>
    </motion.div>
  )
}


function orderedSkills(skills: Skill[]): Skill[] {
    return skills.sort((a: Skill, b: Skill) => b.progress - a.progress);
}

export default Skills;
