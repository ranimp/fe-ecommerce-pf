import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pb-16'>
      <div>
        <p className='text-sm text-gray-700 text-center'>
          Showing
          <span className='font-medium'>
            {" "}
            {currentPage * postsPerPage - 10}{" "}
          </span>
          to
          <span className='font-medium'> {currentPage * postsPerPage} </span>
          of
          <span className='font-medium'> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className='block'>
        <ul className='flex pl-0 rounded list-none flex-wrap justify-center cursor-pointer'>
          <li>
            {pageNumbers.map((number) => (
              <span
                onClick={() => {
                  paginate(number);
                }}
                className={
                  currentPage === number
                    ? "bg-blue border-3F70F9 text-3F70F9 hover:bg-blue-200 relative inline-flex items-center px-3 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-3 py-2 border text-sm font-medium"
                }
              >
                {number}
              </span>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}