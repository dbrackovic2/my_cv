import React from 'react'
import {motion} from 'framer-motion'
import { Experience } from '@/typings';
import { urlFor } from '@/sanity';

type Props = {
    experience: Experience;
}

function ExperienceCard({experience}: Props) {
  return (
    <article key={experience.company} className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[300px]
        md:w-[500px] lg:w-[600px] xl:w-[900px] snap-center bg-[#133850] p-5 hover:opacity-100 opacity-80 cursor-pointer'>
        <motion.div key={experience._id+'_motiondiv'}
            initial={{
                y: -100,
                opacity: 0,
            }}
            transition={{
                duration: 1.2,
            }}
            whileInView={{
                y: 0,
                opacity: 1,
            }}
            viewport={{
                once: true
            }}
        >
            {/* <img src={urlFor(experience?.companyImage).url()} alt="Company image"
            className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center" /> */}
            <img src={urlFor(experience?.companyImage).url()} alt={experience.company}
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center" />
        </motion.div>
        <div className='px-0 md:px-10' key={experience._id+'_information'}>
            <h4 className='text-sm md:text-base lg:text-xl xl:text-4xl font-light'>{experience.jobTitle}</h4>
            <p className='font-bold text-sm md:text-lg lg:text-xl xl:text-2xl mt-1'>{experience.company}</p>
            <p className='font-light text-sm/2 md:text-lg/2 lg:text-xl/2 xl:text-2xl/2 mt-1'>Technologies used:</p>
            <div className='flex space-x-2 my-2' key={experience._id+'_technologies1'}>
                {
                    experience.technologies.filter((t, index) => index < experience.technologies.length/2).map(technology =>
                        <div className='text-xs/4 text-center' key={experience._id+experience.company+technology.title}><img src={urlFor(technology.image).url()} key={experience._id} alt={technology.title} className='h-7 w-7 md:h-10 md:w-10 rounded-full' />{technology.title}</div>
                    )
                }
            </div>
            <div className='flex space-x-2 my-2' key={experience._id+'_technologies2'}>
                {
                    experience.technologies.filter((t, index) => index >= experience.technologies.length/2).map(technology =>
                        <div className='text-xs/4 text-center' key={experience._id+experience.company+technology.title}><img src={urlFor(technology.image).url()} key={experience._id} alt={technology.title} className='h-7 w-7 md:h-10 md:w-10 rounded-full' />{technology.title}</div>
                    )
                }
            </div>
            <p className='italic py-5 text-gray-300 text-xs md:text-base lg:text-lg xl:text-lg'>
                {new Date(experience.dateStarted).toDateString().slice(3)} -
                {experience.isCurrentlyWorkingHere? "Present" : new Date(experience.dateEnded).toDateString().slice(3)}
            </p>
            <ul className='list-disc space-y-1 ml-5 text-xs md:text-base lg:text-lg xl:text-lg'>
                {experience.points.map((point, index) => <li key={index}>{point}</li>)}
            </ul>
        </div>
    </article>
  )
}

export default ExperienceCard;
