/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React from "react";

const Pagination = ({ contestsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / contestsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      <nav>
        <ul className="pagination pagination-sm justify-content-center">
          {pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <button className="page-link" onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
