import React from 'react';
import { Button } from '@material-tailwind/react';

const Pagination = ({ currentPage, totalEntries, entriesPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 md:mb-9">
      <span className="text-sm text-gray-700">
        Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} Entries
      </span>
      <div className="flex space-x-2">
        <Button 
          color='gray' 
          className='bg-gray-200 hover:bg-gray-300' 
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button 
          color='gray' 
          className='bg-gray-200 hover:bg-gray-300' 
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
