"use client";
import TransactionCard from '@/components/TransactionCard'
import { faCog, faDownload, faPaperPlane, faSearch, faSignOut, faUser, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList, Option, Select, Typography } from '@material-tailwind/react'
import Link from 'next/link';
import React from 'react'

const page = () => {

    const assets = [
        "All Assets",
        "USDC",
        "USDT",
        "BTC",
    ];

    const dateSort = [
        "Daily",
        "Weekly",
        "Monthly",
        "Yearly",
    ];

    return (
        <div>
            <div className='md:mt-12 mt-6'>
                <div className='justify-between flex md:px-10 px-5'>
                    <h1 className='text-lg my-2 text-gray-700'>Transactions history</h1>
                    <div className='md:px-5 flex gap-5 justify-end'>
                        <div className='md:w-56'>
                            <form method='post'>
                                <div className='search-container'>
                                    <Input type='search' label='Search' icon={<FontAwesomeIcon icon={faSearch} />} />
                                </div>
                            </form>
                        </div>
                        <div>
                            <Select size='sm' className='border text-gray-700  border-gray-300 rounded p-1 bg-white' selected={assets[0]} label={assets[0]}>
                                {
                                    assets.map(asset => (
                                        <Option key={asset} value={asset}>{asset}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div>
                            <Select size='sm' className='border text-gray-700  border-gray-300 rounded p-1 bg-white' selected={dateSort[0]} label={dateSort[0]}>
                                {
                                    dateSort.map(interval => (
                                        <Option key={interval} value={interval}>{interval}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>

                </div>

                <TransactionCard />
            </div>
        </div>
    )
}

export default page