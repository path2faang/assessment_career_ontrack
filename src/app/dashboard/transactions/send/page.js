"use client";
import React, { useState } from 'react';
import { Button, Input, Option, Select, Textarea } from '@material-tailwind/react';

const SendAsset = () => {
    const assets = ["USDC", "USDT", "BTC"];
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [assetType, setAssetType] = useState(assets[0]); // Default asset type
    const [walletAddress, setWalletAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the send asset logic here
        console.log({ description, amount, assetType, walletAddress });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className="bg-white shadow-lg rounded-lg p-8 w-96"
            >
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">Send Asset</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="number"
                            label="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className="border border-gray-300 focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            label="Asset Type"
                            value={assetType}
                            onChange={(e) => setAssetType(e.target.value)}
                            required
                            className="border border-gray-300 focus:ring focus:ring-blue-300"
                        >
                            {assets.map((asset) => (
                                <Option key={asset} value={asset}>{asset}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            label="Wallet Address"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            required
                            className="border border-gray-300 focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <Textarea
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="border border-gray-300 focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <Button
                        type="submit"
                        color="lightBlue"
                        className="w-full transition-transform transform hover:scale-105"
                    >
                        Send Asset
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SendAsset;
