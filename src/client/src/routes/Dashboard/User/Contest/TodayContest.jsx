/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import ContestData from "./ContestData";
import Pagination from "./Pagination";
import axios from "../../../../utils/axiosInterceptor";

const AllContest = ({ token }) => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contestsPerPage] = useState(8);

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      const res = await axios.get(`/contests`, {
        headers: {
          Authorization: token
        }
      });
      setContests(res.data.contests);
      setLoading(false);
    };

    fetchContests();
  }, []);

  // Get current contests
  const indexOfLastPost = currentPage * contestsPerPage;
  const indexOfFirstPost = indexOfLastPost - contestsPerPage;
  const currentContests = contests.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <ContestData contests={currentContests} loading={loading} />
      </div>
      <Pagination
        contestsPerPage={contestsPerPage}
        totalPosts={contests.length}
        paginate={paginate}
      />
    </div>
  );
};

export default AllContest;
