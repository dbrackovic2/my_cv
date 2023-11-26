import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Social } from '@/typings'

type Props = {
    socials: Social[];
}

function Header({socials}: Props) {
  return (
    <header className='sticky top-0 p-1 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center opacity-10 sm:opacity-100 md:opacity-100'>
        <motion.div
            initial={{
                x: -500,
                opacity: 0,
                scale: 0.5,
            }}
            animate={{
                x: 0,
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: 1.1 ,
            }}
            className='flex flex-row items-center'>
            {/* Social Icons */}
            {
                socials.map((social) => 
                <SocialIcon
                    key={social._id}
                    url={social.url}
                    target='blank'
                    fgColor='white'
                    bgColor='transparent'
                />
            )}
        </motion.div>
        <Link href='#contact'>
            <motion.div 
                initial={{
                    x: 500,
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                }}
                transition={{ duration : 1 }}
                className='flex flex-row items-center cursor-pointer'>
                <SocialIcon 
                    className='cursor-pointer'
                    network='email'
                    fgColor='white' 
                    bgColor='transparent'
                />
                <p className='italic hidden md:inline-flex text-sm text-[#0ab0f7] hover:border-[#0ab0f7]/40 hover:text-[#0ab0f7]/40'>
                    Reach out
                </p>
            </motion.div>
        </Link>
    </header>
  )
}

export default Header