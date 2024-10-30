import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faChartLine, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-tailwind/react';
import Pagination from './Pagination';

const TransactionCard = () => {
  const transactions = [
    {
      blockNumber: '123456',
      source: '0xabc123...',
      wallet: '0xdef456...',
      amount: '0.5 ETH',
      status: 'received',
      asset: {
        name: 'Ethereum',
        logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
        url: 'https://ethereum.org/',
      },
    },
    {
      blockNumber: '123457',
      source: '0xghi789...',
      wallet: '0xjkl012...',
      amount: '1.0 ETH',
      status: 'sent',
      asset: {
        name: 'Ethereum',
        logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
        url: 'https://ethereum.org/',
      },
    },
    {
      blockNumber: '123458',
      source: '0xmnop345...',
      wallet: '0xqrs678...',
      amount: '2.0 USDC',
      status: 'received',
      asset: {
        name: 'USD Coin',
        logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg',
        url: 'https://www.centre.io/usdc',
      },
    },
  ];

  return (
    <div className='mt-4 text-gray-700 px-10'>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          <tr className='font-semibold'>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Block Number</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Source/Origin</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Wallet Addr</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Amount</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Asset</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Status</th>
            <th className='py-2 px-4 border-b border-gray-200 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={transaction.source}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                } transition duration-200 hover:bg-gray-200`}
            >
              <td className='py-2 px-4 border-b border-gray-200'>{transaction.blockNumber}</td>
              <td className='py-2 px-4 border-b border-gray-200'>{transaction.source}</td>

              <td className='py-2 px-4 border-b border-gray-200'>
                <span className={`font-bold ${transaction.status === 'received' ? 'text-green-500' : 'text-blue-500'}`}>
                  {transaction.wallet}
                </span>
              </td>

              <td className='py-2 px-4 border-b border-gray-200'>{transaction.amount}</td>

              <td className='py-2 px-4 border-b border-gray-200 flex items-center'>
                <img src={transaction.asset.logo} alt={transaction.asset.name} className='w-5 h-5 mr-2' />
                <a href={transaction.asset.url} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>
                  {transaction.asset.name}
                </a>
              </td>
              <td className='py-2 px-4 border-b border-gray-200 '>
                {transaction.status === 'received' ? (
                  <span className='flex items-center text-green-500'>
                    <FontAwesomeIcon icon={faArrowDown} className='mr-1' /> Received
                  </span>
                ) : (
                  <span className='flex items-center text-blue-500'>
                    <FontAwesomeIcon icon={faArrowUp} className='mr-1' /> Sent
                  </span>
                )}
              </td>
              <td className='py-2 px-4 border-b border-gray-200'>
                <div className='flex justify-center gap-x-3'>
                <Button  color='red' className='text-white hover:text-red-100 flex justify-center items-center gap-x-1.5'>
                    <FontAwesomeIcon icon={faTrash}  />
                    <p>Delete</p>
                  </Button>
                  <Button color='yellow' className='text-black hover:text-gray-500 flex justify-center items-center gap-x-1.5'>
                    <FontAwesomeIcon icon={faChartLine}  />
                    <p>View</p>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={22} entriesPerPage={1} totalEntries={1843} />
    </div>
  );
};

export default TransactionCard;
