"use client";
import { axiosPublic } from '@/api/apiConfig';
import React, { useEffect, useState } from 'react';

const FeeStructureTable = () => {
    const [feeStructure, setFeeStructure] = useState(null); // Use state to store the fee structure
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    useEffect(() => {
        const fetchStructureFee = async () => {
            try {
                const response = await axiosPublic.get("/payment/chargefee");
                setFeeStructure(response.data?.data);
            } catch (error) {
                console.error("Error fetching fee structure:", error);
                setError("An error occurred while fetching the fee structure.");
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };

        fetchStructureFee();
    }, []); // Empty dependency array to run once on mount

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!feeStructure) {
        return <div>No fee structure available.</div>;
    }

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-xl font-semibold mb-4">Fee Structure</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Cryptocurrency</th>
                        <th className="border border-gray-300 p-2">Transaction Range</th>
                        <th className="border border-gray-300 p-2">Estimated Fee Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(feeStructure).map(([currency, fees]) =>
                        fees.map((item, index) => (
                            <tr key={`${currency}-${index}`} className="hover:bg-gray-50 text-base">
                                {index === 0 && (
                                    <td rowSpan={fees.length} className="border border-gray-300 p-2">
                                        {currency}
                                    </td>
                                )}
                                <td className="border border-gray-300 p-2">
                                    {item.range[0]} &ndash; {item.range[1] === Infinity ? '∞' : item.range[1]} {/* Format the range with ∞ */}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {item.fee} ({(item.fee * 100).toFixed(2)}%)
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FeeStructureTable;
