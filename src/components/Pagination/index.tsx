import { PaginationType } from '@/types/ApiData';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
 
interface PaginationProps {
  paginationData: PaginationType;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ paginationData, onPageChange }) => {
  const { limit: itemsPerPage, totalResults: items, page: currentPage } = paginationData;
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const pageCount = Math.ceil(items / itemsPerPage);

  const paginationRange = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex justify-end mb-10">
      <ul className="flex items-center space-x-4">
        <li className={`flex items-center h-8 rounded-md bg-gray-200 cursor-default ${currentPage === 1 ? 'text-gray-400' : 'text-gray-800'}`}>
          <button className='px-2 py-1' onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
            <IoIosArrowBack />
          </button>
        </li>
        {paginationRange.map((pageNumber) => (
          <li key={pageNumber} className={`flex items-center h-8 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            <button className='px-3 py-1' onClick={() => handlePageClick(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
        <li className={`flex items-center h-8 justify-center rounded-md bg-gray-200 cursor-default ${currentPage === pageCount ? 'text-gray-400' : 'text-gray-800'}`}>
          <button className='px-2 py-1' onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === pageCount}>
            <IoIosArrowForward />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
