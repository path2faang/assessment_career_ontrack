"use client";
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const page = () => {

  return (
    <div className='bg-gradient-to-r from-blue-200 to-purple-300'>
      <div className=' flex items-center justify-center min-h-screen '>
        <div className='bg-white md:px-10 p-4 rounded md:w-fit mx-auto'>
          <Image src={"/images/verify-email.svg"} width={180} height={180} alt='Verify email' />
          <h2 className='text-base md:w-fit mt-3 md:text-lg'>Please follow the instruction sent to <br/> your email to complete your action.</h2>

          <div className='flex gap-2 text-base justify-center md:mt-10 mt-5'>
          <p>Didn&apos;t receive an email?</p>
            <Link href={"/auth"} className='bg-inherit p-0 text-[#2299fb] hover:shadow-none shadow-none hover:text-lightBlue font-medium capitalize text-base' >Resend</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page