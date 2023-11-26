import React from 'react'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useForm, SubmitHandler } from 'react-hook-form';
import { PageInfo } from '@/typings';

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Props = {
  pageInfo: PageInfo;
}

function ContactMe({pageInfo}: Props) {
  const { handleSubmit, register } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:${pageInfo.email}?subject=
    {formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} ${formData.email}`;
  };

  return (
    <div className='h-screen flex relative flex-col text-center md:text-left
    md:flex-row max-w-7xl justify-evenly mx-auto items-center'>
         <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 opacity-20 text-2xl'>
            Contact
        </h3>

        <div className='flex flex-col space-y-3 md:space-y-6 lg:space-y-10'>
            <h4 className='text:4xs md:text-4sm lg:text-4xl font-semibold text-center'>
                <span className='decoration-[#0ab0f7]/50 italic'>Contact information</span>
            </h4>

            <div className='space-y-3 md:space-y-6 lg:space-y-10'>
              <div className='flex items-center space-x-5 pl-10'>
                <PhoneIcon className='text-[#0ab0f7] h-2 w-2 md:h-5 md:w-5 xl:h-7 xl:w-7 animate-pulse' />
                <p className='text-xs md:text-sm xl:text-2xl'>+123456789</p>
              </div>

              <div className='flex items-center space-x-5 pl-10'>
                <EnvelopeIcon className='text-[#0ab0f7] h-2 w-2 md:h-5 md:w-5 xl:h-7 xl:w-7 animate-pulse' />
                <p className='text-xs md:text-sm xl:text-2xl'>{pageInfo.email}</p>
              </div>

              <div className='flex items-center space-x-5 pl-10'>
                <MapPinIcon className='text-[#0ab0f7] h-2 w-2 md:h-5 md:w-5 xl:h-7 xl:w-7 animate-pulse' />
                <p className='text-xs md:text-sm xl:text-2xl'>{pageInfo.address}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2 w-fit mx-auto'>
              <div className='flex space-x-2'>
                <input {...register('name')} placeholder='Name' className="contactInput" type='text' />
                <input {...register('email')} placeholder='Email' className="contactInput" type='email' />
              </div>
              <input {...register('subject')} placeholder='Subject' className="contactInput" type='text' />
              <textarea {...register('message')} placeholder='Message' className='contactInput' />
              <button type='submit' className='bg-[#0ab0f7] py-5 px-10 rounded-md text-black fond-bold text-xs md:text-sm lg:text-lg'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ContactMe