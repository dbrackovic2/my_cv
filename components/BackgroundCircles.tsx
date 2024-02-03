import React from 'react'
import { motion } from 'framer-motion'

type Props = {};

function BackgroundCircles({}: Props) {
  return (
    <motion.div initial={{
        opacity: 0,
    }}
    animate={{
        scale: [1,2,2,3,1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"]
    }}
    transition={{
        duration: 2.5,
    }}
    className='relative flex justify-center items-center'>
      {/* h-24 w-24 md:w-28 md:h-28 xl:w-32 xl:h-32 */}
        {/* <div className='absolute border border-[#333333] rounded-full h-[200px] w-[200px] mt-52 animate-ping' />
        <div className='rounded-t border-[#333333] border h-[300px] w-[300px] absolute mt-52' />
        <div className='rounded-t border-[#333333] border h-[500px] w-[500px] absolute mt-52' />
        <div className='rounded-t border-[#0ab0f7] opacity-20 border h-[650px] w-[650px] absolute mt-52 animate-pulse' />
        <div className='rounded-t border-[#0ab0f7] border h-[800px] w-[800px] absolute mt-52' /> */}
        <div className='absolute border border-[#36bcdd] rounded-pt h-[200px] w-[150px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[300px] mt-52 animate-bounce' />
        {/* <div className='rounded-t border-[#333333] border h-[300px] w-[300px] md:w-[400px] md:h-[400px] xl:w-[420px] xl:h-[420px] absolute mt-52' />
        <div className='rounded-t border-[#333333] border h-[440px] w-[440px] md:w-[450px] md:h-[450px] xl:w-[470px] xl:h-[470px] absolute mt-52' /> */}
        <div className='rounded-t border-[#df0af7] opacity-20 border h-[250px] w-[250px] md:w-[600px] md:h-[600px] xl:w-[620px] xl:h-[620px] absolute mt-52 animate-pulse' />
        <div className='rounded-t border-[#0ab0f7] border h-[700px] w-[700px] md:w-[720px] md:h-[720px] xl:w-[800px] xl:h-[800px] absolute mt-52' />
    </motion.div>
  )
}

export default BackgroundCircles;
