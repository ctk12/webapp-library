import { TitleTextD } from '@/shared/Typography';
import { PaginationType } from '@/types/ApiData';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
 
interface PaginationProps {
  paginationData: PaginationType;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ paginationData, onPageChange }) => {
  const { limit: itemsPerPage, totalResults: items, page: currentPage } = paginationData;

  const pageCount = Math.ceil(items / itemsPerPage);

  const paginationRange = Array.from({ length: pageCount }, (_, index) => index + 1);

  const handlePageClick = (pageNumber: number, type: string) => {
    onPageChange(pageNumber);
    console.log("pagee,", pageNumber);
    if (type) {
      document.getElementById(`page-${pageNumber}`)?.scrollIntoView({
        behavior: "smooth",
        block: type === "start" ? "end" : "start",
        inline: type === "start" ? "end" : "start",
      });
    }
  };

  return (
    <>
    <TitleTextD className='text-center mb-2 mx-auto w-56'>Total - {items}</TitleTextD>
    <div className="flex justify-end">
        <li className={`flex items-center h-8 rounded-md pr-1 bg-gray-200 cursor-default ${currentPage === 1 ? 'text-gray-400' : 'text-gray-800'}`}>
          <button className='px-2 py-1' onClick={() => handlePageClick(currentPage - 1, "start")} disabled={currentPage === 1}>
            <IoIosArrowBack />
          </button>
        </li>
      <ul className="flex items-center space-x-4 px-2 pb-1" style={{ overflow: "scroll" }}>
        {paginationRange.map((pageNumber) => (
          <li id={`page-${pageNumber}`} key={pageNumber} className={`flex items-center h-8 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            <button className='px-3 py-1' onClick={() => handlePageClick(pageNumber, "")}>{pageNumber}</button>
          </li>
        ))}
      </ul>
      <li className={`flex items-center h-8 justify-center rounded-md bg-gray-200 cursor-default ${currentPage === pageCount || items === 0 ? 'text-gray-400' : 'text-gray-800'}`}>
          <button className='px-2 py-1' onClick={() => handlePageClick(currentPage + 1, "end")} disabled={currentPage === pageCount || items === 0}>
            <IoIosArrowForward />
          </button>
        </li>
    </div>
    </>
  );
};

export default Pagination;
