"use client";
import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography, } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDownload, faPaperPlane, faPlus, faSignOut, faUser, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const SendRecieveCard = () => {
    return (
        <div>
            <div className='flex border-b bg-[#F5F5F5] border-gray-200 justify-end gap-x-3 py-3 pr-5'>

                <Link href={"/dashboard/merchants"}>
                    <Button size='sm' color='black' className='flex justify-center capitalize gap-x-2 text-sm'>
                        <Typography as={"h3"} className='mr-0.5'>Add Merchant</Typography>
                        <FontAwesomeIcon icon={faPlus} size='w-4.5 mt-1 h-4.5' />
                    </Button>
                </Link>

                <Link href={"/dashboard/transactions/send"}>
                    <Button size='sm' color='blue' className='flex justify-center capitalize gap-x-2 text-sm'>
                        <Typography as={"h3"} className='mr-0.5'>Send</Typography>
                        <FontAwesomeIcon icon={faPaperPlane} size='w-4.5 mt-1 -rotate-12 h-4.5' />
                    </Button>
                </Link>

                <Link href={"/dashboard/transactions/recieve"}>
                <Button color='green' size='sm' className='flex justify-center capitalize gap-x-2 text-sm'>
                    <Typography as={"h3"} className='mr-0.5'>Recieve</Typography>
                    <FontAwesomeIcon icon={faDownload} size='w-4.5 mt-1 h-4.5' />
                </Button>
                </Link>

                <Menu placement='bottom-start'>
                    <MenuHandler>
                        <IconButton className='rounded-full text-gray-100'>
                            <FontAwesomeIcon icon={faUser} className='w-5 h-5' />
                        </IconButton>
                    </MenuHandler>

                    <MenuList>

                        <Link href={"/dashboard/profile"}>
                            <MenuItem className='flex gap-x-2'>
                                <FontAwesomeIcon icon={faUserEdit} />
                                Profile
                            </MenuItem>
                        </Link>
                        <Link href={"/dashboard/settings"}>
                            <MenuItem className='flex gap-x-2'>
                                <FontAwesomeIcon icon={faCog} />
                                Settings
                            </MenuItem>
                        </Link>
                        <Link href={"/dashboard/logout"}>
                            <MenuItem className='flex gap-x-2'>
                                <FontAwesomeIcon icon={faSignOut} />
                                Logout
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>

            </div>
        </div>
    )
}

export default SendRecieveCard