"use client";
import { Button, IconButton } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const menuList = [
        {
            name: "Our Solutions",
            url: "#services"
        },
        {
            name: "APIs",
            url: "https://documenter.getpostman.com/view/38937255/2sAXxY2TYG"
        },
        {
            name: "Pricing",
            url: "#pricing"
        },
    ];

    const authButton = [
        {
            name: "Get started",
            url: "/auth"
        },
        {
            name: "Sign In",
            url: "/auth/signin"
        },
    ];

    // State for mobile menu toggle
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='md:flex relative py-6 px-5 md:px-10 justify-between '>
            <Link href={"/"} className='md:w-80 flex gap-x-2'>
                <Image src={"/images/sm-logo.png"} alt='Logo' width={30} height={30} />
                <h1 className='text-2xl flex mt-1'>Krypto<p className='text-blue-700'>API</p></h1>
            </Link>

            {/* Hamburger Menu for Small Screens */}
            <div className='absolute top-5 right-5 md:hidden'>
                <IconButton size='md' className=" bg-inherit flex shadow-none hover:shadow-sm items-center" onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={faBars} className="text-gray-700 text-2xl" />
                </IconButton>
            </div>

            <div className={`md:w-fit justify-between z-50 md:relative md:py-0 py-5 absolute top-0 bg-white md:bg-inherit w-3/4 md:h-auto h-screen md:flex ${isOpen ? 'block' : 'hidden'} md:flex`}>
                <div className='md:flex justify-evenly gap-x-5 md:mr-20'>
                    <ul className='md:flex justify-center mt-2 md:gap-x-5 text-base'>
                        {
                            menuList.map((menu, i) => (
                                <li key={i} className='md:my-0 my-5'>
                                    <Link href={menu.url} className='hover:shadow rounded py-2 px-5 bg-[#FEFEFE]'>{menu.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className='flex md:justify-between justify-center gap-x-3 md:gap-x-5'>
                    {
                        authButton.map((menu, i) => (
                            <Link href={menu.url} key={i}>
                                <Button color={i == 1 ? "deep-orange" : "light-blue"} fullWidth>{menu.name}</Button>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
