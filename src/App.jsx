// src/components/AdminInterface.jsx

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { ImLast, ImFirst } from "react-icons/im";
import Editpage from './components/Editpage';






const App = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(data.length / pageSize);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curuser, setCuruser] = useState({})
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editUser) =>{
    console.log(editUser)
    const updateddata = data.map((user)=>
    editUser.id!==user.id?user:{
      ...editUser
    }
    )
    setData(updateddata)
    handleCloseModal()
  }

  // Function to handle checkbox selection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleCheckboxChange = (id) => {
    const updatedSelection = selectedRows.includes(id)
      ? selectedRows.filter((selectedId) => selectedId !== id)
      : [...selectedRows, id];

    setSelectedRows(updatedSelection);
  };

  // Function to delete selected rows
  const handleDeleteSelected = () => {
    const updatedUsers = data.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  // Function to render rows based on search and pagination
  const renderRows = () => {
    // Filter based on search term
    // const filteredUsers = data.filter((user) =>
    //   Object.values(user).some((value) =>
    //     value.toLowerCase().includes(searchTerm.toLowerCase())
    //   )
    // );


    // Calculate pagination range
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;


    return data.slice(startIndex, endIndex).map((user) => (
      <>
        <tr key={user.id} className='text-lg '>

          <td className='pr-20'>
            <input
              type="checkbox"
              checked={selectedRows.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            />
          </td>
          <td className='pr-20 py-3 whitespace-nowrap'>{user.name}</td>
          <td className='pr-20'>{user.email}</td>
          <td className='pr-20'>{user.role}</td>
          <td className='flex pt-5 gap-3 text-xl '>
            <FaUserEdit className='hover:scale-125' onClick={() => handleEdit(user)} />
            <AiFillDelete className='hover:scale-125' onClick={() => handleDelete(user.id)} />
          </td>

        </tr>
      </>

    ));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle edit action
  const handleEdit = (user) => {
    // Implement your edit logic here

    // console.log(`Edit user with ID ${user.id}`);
    // console.log(user)
    setCuruser(user);
    handleEditClick();
    

  };

  // Function to handle delete action
  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log("id to delete", id)
    const updatedUsers = data.filter((user) => user.id !== id);

    setData(updatedUsers);
  };

  return (
    <>
      <Editpage handleEditClick={handleEditClick} handleCloseModal={handleCloseModal} isModalOpen={isModalOpen}
       user={curuser} handleSave={handleSave}/>
      <div className='flex flex-col justify-center items-center ' >

        {/* Search bar */}

        <div className="mt-[70px] mb-6 flex items-center w-[800px]  justify-between p-1   ">
          <input
            type="text"
            placeholder="Search..."
            className="border p-1 rounded-lg w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='pr-5 text-2xl '>

            <AiFillDelete className='text-red-500 hover:scale-125' />
          </div>
        </div>

        {/* Table */}
        <div className='w-[800px] h-[540px] '>

          <table className="table-auto w-full  ">
            {/* Table headers */}
            <thead className=''>
              <tr className=''>
                <th className='pr-20'>
                  <input
                    type="checkbox"
                    onChange={() => console.log("Select/Deselect all")}
                  />
                </th>
                <th className=''>Name</th>
                <th className=''>Email</th>
                <th className=''>Role</th>
                <th className=''>Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>{
              renderRows()
            }</tbody>
          </table>

          {/* Pagination */}


          {/* Delete Selected button */}


        </div>
        <div className="mt-4 w-[800px] flex justify-end ">

          {/* Pagination buttons */}
          <div className='flex items-center gap-1'>
            <ImFirst

              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />

            <GiPreviousButton

              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                className={`border rounded-lg bg-white px-3 mx-[1px] ${currentPage === page + 1 ? ' font-bold scale-125' : ''
                  }`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
            <GiNextButton


              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />

            <ImLast

              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </div>

        </div>


      </div>
    </>
  );
};

export default App;
