"use client";
import React, { useState } from 'react';
import { Tabs, Tab, Button, Switch, Input, Checkbox, IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faTrash } from '@fortawesome/free-solid-svg-icons';

const Page = () => {
    const [activeTab, setActiveTab] = useState('apiKey');
    const [isTestMode, setIsTestMode] = useState(true);
    const [blacklistedDomains, setBlacklistedDomains] = useState([]);
    const [newDomain, setNewDomain] = useState('');
    const [webhookUrl, setWebhookUrl] = useState('');
    const [webhookList, setWebhookList] = useState([]);

    const handleAddDomain = () => {
        if (newDomain && !blacklistedDomains.includes(newDomain)) {
            setBlacklistedDomains([...blacklistedDomains, newDomain]);
            setNewDomain('');
        }
    };

    const handleRemoveDomain = (domainToRemove) => {
        setBlacklistedDomains(blacklistedDomains.filter(domain => domain !== domainToRemove));
    };

    const handleAddWebhook = () => {
        if (webhookUrl && !webhookList.includes(webhookUrl)) {
            setWebhookList([...webhookList, webhookUrl]);
            setWebhookUrl('');
        }
    };

    const handleRemoveWebhook = (urlToRemove) => {
        setWebhookList(webhookList.filter(url => url !== urlToRemove));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'webhook':
                return (
                    <div>
                        <div className="mb-4 p-4 border border-red-500 text-red-500 bg-red-100 rounded-md">
                            <strong>Warning: <FontAwesomeIcon color='yellow' icon={faWarning} /></strong>
                            <p>
                                It is important to blacklist the IPs or domains that should not access your webhook.
                            </p>
                        </div>

                        <div className="mb-4 md:mt-7">
                            <h3 className="font-semibold my-2 text-gray-700">Manage Blacklisted Domains</h3>
                            <div className="flex gap-x-2 items-center mb-2">
                                <Input
                                    type="text"
                                    label="Add Blacklist Domain"
                                    value={newDomain}
                                    onChange={(e) => setNewDomain(e.target.value)}
                                    className="mr-2"
                                />
                                <Button color="lightBlue" onClick={handleAddDomain}>
                                    Add
                                </Button>
                            </div>

                        </div>

                        <div className="mb-4 md:mt-5">
                            <h3 className="font-semibold text-gray-700">Webhook Management</h3>
                            <div className="flex gap-x-2 items-center mb-2">
                                <Input
                                    type="text"
                                    label="Enter Merchant's Webhook URL"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    className="mr-2"
                                />
                                <Button color="lightBlue" className='whitespace-nowrap' onClick={handleAddWebhook}>
                                    Add Webhook
                                </Button>
                            </div>
                            <div className='flex justify-start md:w-3/5 gap-x-5'>
                                <BlacklistedDomains
                                    domains={blacklistedDomains}
                                    onRemove={handleRemoveDomain}
                                />
                                <WebhookDomains
                                    webhookList={webhookList}
                                    onRemove={handleRemoveWebhook}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'apiKey':
                return (
                    <div>
                        <div className="flex items-center mb-4">
                            <span className="mr-2 text-gray-800">Mode:</span>
                            <Switch
                                checked={isTestMode}
                                onChange={() => setIsTestMode(!isTestMode)}
                                label={isTestMode ? "Test Mode" : "Live Mode"}
                                color={isTestMode ? "lightBlue" : "green"}
                            />
                        </div>

                        <div className="mb-4">
                            <Button color="lightBlue" onClick={() => alert('API Key Generated!')} className="text-white">
                                Generate API Key
                            </Button>
                        </div>

                        <div className="p-4 border border-red-500 text-red-500 bg-red-100 rounded-md">
                            <strong>Warning: <FontAwesomeIcon color='yellow' icon={faWarning} /></strong>
                            <p>
                                Generating a new API Key will invalidate your previous keys.
                                Losing your merchant API keys can disrupt your operations, lead to loss if stolen & more.
                                Make sure to store your keys securely in a cloud key management system or via your env secrets.
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <Tabs value={activeTab} className="mb-4 md:w-1/2 flex justify-start">
                <Tab
                    value="webhook"
                    onClick={() => setActiveTab('webhook')}
                    className={`${activeTab === 'webhook'
                        ? 'bg-inherit text-blue-600 font-semibold border-b-2 border-blue-600'
                        : 'bg-white text-gray-500'
                        } cursor-pointer rounded-md p-2 transition duration-300`}
                >
                    Webhook
                </Tab>
                <Tab
                    value="apiKey"
                    onClick={() => setActiveTab('apiKey')}
                    className={`${activeTab === 'apiKey'
                        ? 'bg-inherit text-blue-600 font-semibold border-b-2 border-blue-600'
                        : 'bg-white text-gray-500'
                        } cursor-pointer rounded-md p-2 transition duration-300`}
                >
                    API Key
                </Tab>
            </Tabs>

            <div className="p-4 border rounded-lg bg-gray-100/50">
                {renderContent()}
            </div>
        </div>
    );
};

const BlacklistedDomains = ({ domains, onRemove }) => {
    return (
        <fieldset className=' w-full border-t md:mt-10 mt-5 border-gray-300'>
            <legend className="font-semibold px-2 text-gray-700">Blacklisted Domains Mgt.</legend>
            <ul>
                {domains.map((domain, index) => (
                    <li key={index} className="flex items-center mb-1">
                        <Checkbox checked={true} onChange={() => onRemove(domain)} />
                        <span className="ml-2">{domain}</span>
                        <IconButton onClick={() => onRemove(domain)} className="ml-2">
                            <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
};

const WebhookDomains = ({ webhookList, onRemove }) => {
    return (
        <fieldset className=' w-full border-t md:mt-10 mt-5 border-gray-300'>
            <legend className="font-semibold px-2 text-gray-700">Webhook URLs Mgt.</legend>
            <ul className='text-gray-700'>
                {webhookList.map((url, index) => (
                    <li key={index} className="flex items-center mb-1">
                        <span className="ml-2">{url}</span>
                        <IconButton onClick={() => onRemove(url)} className="ml-2">
                            <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
};

export default Page;
