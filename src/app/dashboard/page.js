"use client";
import SendRecieveCard from '@/components/SendRecieveCard';
import TransactionCard from '@/components/TransactionCard';
import { faSearch, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Option, Select } from '@material-tailwind/react';
import React from 'react'


const page = () => {

  const assets = [
    "All Assets",
    "USDC",
    "USDT",
    "BTC",
  ];


  return (
    <div>
      <div className='w-full bg-[#fdfdfd]'>
        <SendRecieveCard />


        <div className='md:grid grid-cols-12 md:p-8 p-5 gap-6 md:gap-10'>
          {/* Total Portfolio, Revenue Profit %, Sort/Choose Crypto Asset */}
          <div className='h-[350px] border border-gray-300/90 rounded-xl col-span-8 p-3 bg-white shadow-sm'>
            <div className='flex justify-between px-4 py-3'>
              <h2 className='text-3xl uppercase text-gray-700 font-semibold mb-4'><span className='text-xl capitalize text-gray-600'>Total Balance: </span>$4,924,028</h2>
              <div className='flex justify-between mb-4'>
                <div>
                  <Select size='sm' className='border text-gray-700 border-gray-300 rounded p-1 bg-gray-100' selected={assets[0]} label={assets[0]}>
                    {
                      assets.map(asset => (
                        <Option key={asset} value={asset}>{asset}</Option>
                      ))
                    }
                  </Select>
                </div>
              </div>
            </div>
            {/* Chart Placeholder */}
            <div className='h-[240px] px-8 bg-gray-200 rounded-lg flex items-center justify-center'>
              {/* Replace with your chart component */}
              <p className='text-center pt-8 text-gray-500'>Histogram Chart Placeholder</p>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className='h-[350px] col-span-4 border border-gray-300/90 rounded-xl py-3 px-5 bg-white shadow-sm'>
            <fieldset className='w-full border-t border-gray-300/80'>
              <legend className='text-gray-800 text-base px-2'>Recent API Calls</legend>
            </fieldset>

            <fieldset className='py-2 mt-5 border text-gray-600 border-gray-300 px-5 rounded'>
              <legend className='text-[#69b5f4] px-2'>59 sec ago</legend>

              <p>Recieved <span className='text-green-600'>$50</span> from</p>
              <p className='text-[#2299fb]'>0x4B1208f6037d0E82B903F5447ED7d6D...</p>
            </fieldset>
          </div>
        </div>

        <div className='md:mt-5'>
          <div className='justify-between flex md:px-10 px-5'>
            <h1 className='text-lg my-2 text-gray-700'>API Calls Audit/Log</h1>
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
            </div>

          </div>

          <TransactionCard />
        </div>
      </div>
    </div>
  )
}

export default page