import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/typings';
import { urlFor } from '@/sanity';

type Props = {
    projects: Project[];
}

function Projects({projects}: Props) {
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
    className='h-screen relative flex overflow-hidden flex-col text-left
    md:flex-row max-w-full justify-evenly mx-auto items-center z-0'>
        <h3 className='absolute top-8 uppercase tracking-[20px] text-gray-500 text-2xl justify-center'>
            Projects
        </h3>

        <div className='relative w-full flex overflow-x-scroll overflow-y-hidden snap-x
        snap-mandatory z-20
        scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#0ab0f7]/80'>
            {orderedProjects(projects).map((project, i) => {
                return (
                <div key={project._id} className='w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen'>
                    <motion.div 
                    initial={{
                        y: -300,
                        opacity: 0
                    }}
                    transition={{
                        duration: 1.2
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    >
                        <img src={urlFor(project.image).url()} alt={project.title}
                        className='rounded-t rounded-b-xl w-28 h-28 md:w-38 md:h-38 lg:w-56 lg:h-56 xl:w-64 xl:h-64' />
                    </motion.div>
                    <div className='space-y-10 px-0 md:px-10 max-w-6xl'>
                        <h4 className='text-xs md:text-sm lg:text-4xl font-semibold text-center'>
                            <span className='italic decoration-[#0ab0f7]/50'>
                                {project.title}
                            </span>
                        </h4>
                        <div className='flex items-center space-x-2 justify-center'>
                            {
                                project.technologies.filter((t, index) => index < project.technologies.length/2).map(tech => {
                                    return <div className='text-[8px] md:text-sm/2 lg:text-sm' key={tech._id+'image'}><img className='w-8 h-8 md:w-12 md:h-12 xl:h-14 xl:w-14'
                                    key={tech._id} src={urlFor(tech.image).url()} alt={tech.title} />{tech.title}</div>
                                })
                            }
                        </div>
                        <div className='flex items-center space-x-2 justify-center'>
                            {
                                project.technologies.filter((t, index) => index >= project.technologies.length/2).map(tech => {
                                    return <div className='text-[8px] md:text-sm/2 lg:text-sm' key={tech._id+'image'}><img className='w-8 h-8 md:w-12 md:h-12 xl:h-14 xl:w-14'
                                    key={tech._id} src={urlFor(tech.image).url()} alt={tech.title} />{tech.title}</div>
                                })
                            }
                        </div>
                        <span className='text-left'>
                            {
                                splitStringOnDot(project.summary).map(str => <p key={str} className='text-xs md:text-base lg:text-lg'>- {str}</p>)
                            }
                        </span>
                    </div>
                </div>
                )
            })}
        </div>

        <div className='w-full absolute top-[30%] bg-[#0ab0f7]/10 left-0 h-[500px] skew-y-12' />
    </motion.div>
  )
}

function splitStringOnDot (text: string):string[] {
    return text.split('?');
}

function orderedProjects(projects: Project[]): Project[] {
    return projects.sort((a: Project, b: Project) => b.technologies.length - a.technologies.length);
}

export default Projects;
