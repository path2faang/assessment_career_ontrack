"use client"; 
import { axiosPublic } from '@/api/apiConfig';
import { errorMsg, infoMsg } from '@/components/customToastifyMsg';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const Page = () => {
    const { token } = useParams();
    const router = useRouter();

    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Redirect if token is not present
        if (!token) {
            router.replace("/auth/login");
            return; // Early return to avoid executing further logic
        }

        let isMounted = true;

        const verifyToken = async () => {
            try {
                const response = await axiosPublic.put(`/auth/verify/${token}`, {});

                isMounted = false;
                if (!isMounted && response.data.success && response.data.message) {
                    infoMsg(response.data.message);
                    setSuccess(response.data.message)
                }

                if (response.data.status === 400) {
                    console.log(response);
                }

            } catch (err) {
                if (isMounted) {
                    errorMsg(err.response?.data?.message || "An error occurred");
                }
            }
        };

        verifyToken();

        return () => {
            isMounted = false; // Prevent state updates on unmounted components
        };
    }, [token, router]);

    return (
        <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-[#fefefe] border border-gray-400 rounded-lg p-8 w-96">
                <div className='bg-white md:px-10 p-4 rounded md:w-fit mx-auto'>
                    <Image src={"/images/adventure.svg"} width={180} height={180} alt='Verify email'  className='mx-auto'/>
                    <h2 className='text-base md:w-fit my-3 md:text-lg'>Your email has successfully been verified. You can log in to explore...</h2>

                   <div className='w-fit mx-auto'>
                   <Link href={"/auth/signin"}>
                    <Button color='blue'>Login</Button>
                    </Link>
                   </div>

                </div>
            </div>
        </div>
    );
}

export default Page;
