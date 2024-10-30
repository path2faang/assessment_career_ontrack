"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Select, Option, Button } from "@material-tailwind/react"; // Import Select and Option from Material Tailwind
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faShoppingCart, faMoneyBillWave, faChartPie, faCogs, faUserCog, faCog, faReceipt, faBell, faUsers, faFileInvoice, faWallet } from '@fortawesome/free-solid-svg-icons'; // Import necessary Font Awesome icons
import { faBilibili, faDashcube } from '@fortawesome/free-brands-svg-icons';
import { errorMsg, infoMsg, warningMsg } from '@/components/customToastifyMsg';
import { axiosPrivate } from '@/api/apiConfig';
import { useRouter } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import ReviewUserFingerprint from '@/components/fingerprintUtils';

const merchants = [
    { name: 'Merchant A', icon: faStore, link: '/merchants/A' },
    { name: 'Merchant B', icon: faShoppingCart, link: '/merchants/B' },
    { name: 'Merchant C', icon: faMoneyBillWave, link: '/merchants/C' },
];

// Array for navigation links
const navigationLinks = [
    { name: 'Overview', icon: faDashcube, link: '/dashboard' },
    { name: 'Wallets', icon: faWallet, link: '/dashboard/wallets' },
    { name: 'Invoices', icon: faFileInvoice, link: '/dashboard/invoices' },
    { name: 'Transactions', icon: faReceipt, link: '/dashboard/transactions' },
    { name: 'Settings', icon: faCog, link: '/dashboard/settings' },
];

const settingsOptions = [
    { name: 'Profile Settings', icon: faUserCog, link: '/settings/profile' },
    { name: 'Payment Methods', icon: faMoneyBillWave, link: '/settings/payments' },
    { name: 'Notifications', icon: faShoppingCart, link: '/settings/notifications' },
];

const Layout = ({ children }) => {
    const [selectedMerchant, setSelectedMerchant] = useState(merchants[0].name); // Default to Merchant A

    const handleChange = (value) => {
        setSelectedMerchant(value);
    };

    const router = useRouter();

    const handleLogOut = async () => {

        const fingerprint = await ReviewUserFingerprint()


        try {
            const response = await axiosPrivate.post("/auth/logout", {}, { params: { fingerprint } });

            localStorage.removeItem("refreshToken");

            if (response.status == 204) {
                infoMsg("Logout successful")
                setTimeout(() => {
                    router.replace("/auth/signin");
                }, 1000);
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status == 400 && error.response.data.success) {
                    infoMsg(error.response.data.message)
                }
                if (error.response.status == 403 || error.response.status == 400 && !error.response.data.success) {
                    errorMsg(error.response.data.message)
                }
            } else {
                errorMsg("Failed to Sign in, try again");
            }
        }
    };


    return (
        <div className="md:grid md:grid-cols-12 min-h-screen bg-[#121212] text-gray-200">
            {/* Sidebar Navigation */}
            <nav className="md:col-span-2 bg-gray-900 flex flex-col shadow-lg">
                <div className="p-4 md:mt-8">
                    <Select
                        label="Choose a Merchant"
                        size='sm'
                        value={selectedMerchant}
                        onChange={handleChange}
                        className="bg-gray-700 text-white border border-gray-600"
                    >
                        {merchants.map((merchant) => (
                            <Option key={merchant.name} value={merchant.name}>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={merchant.icon} className="mr-2 w-5 h-5 text-blue-500" />
                                    {merchant.name}
                                </div>
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="flex-grow md:px-5">
                    {navigationLinks.map((link) => (
                        <Link key={link.name} href={link.link} className="block py-2.5 mt-3 px-5 hover:bg-blue-600 hover:text-white transition rounded duration-200">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={link.icon} className="mr-2 w-5 h-5 text-blue-400" />
                                {link.name}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="py-2.5 px-5" >
                    <Button fullWidth onClick={handleLogOut} className="block border border-red-400 text-red-400 rounded-lg hover:bg-red-600 hover:text-white py-2.5 px-4 text-center transition duration-200">
                        Logout
                    </Button>
                </div>
            </nav>

            <div className="md:col-span-10 h-screen overflow-y-auto bg-gray-50">
                {children}
            </div>
        </div>
    );
};

export default RequireAuth(Layout);
