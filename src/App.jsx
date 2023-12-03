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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(data.length / pageSize);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curuser, setCuruser] = useState({});
  const [selectedAllPage, setSelectAllPage] = useState([]);
  const [filterData, setFilteredData] = useState([])


  const [searchQuery, setSearchQuery] = useState("");
  // functions to select all handles
  // const handleCheckedalltrue = (currentPage)=>{
  //   selectedAllPage.includes(currentPage)?true:false;
  // }
  const handleSelectallCheckBoxChange = (currentPage) => {
    const newSelectedAllPage = selectedAllPage.includes(currentPage) ? (
      selectedAllPage.filter((selectedId) => selectedId !== currentPage)

    )
      : [...selectedAllPage, currentPage];
    setSelectAllPage(newSelectedAllPage)
    // console.log(newSelectedAllPage)
    if (selectedAllPage.includes(currentPage)) {
      const selectedrows = selectedRows.filter((id) =>
        !data.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + 10).map(user => user.id).includes(id)
      )


      setSelectedRows(selectedrows)
    }
    else {
      const newSelectedRows = !selectedAllPage.includes(currentPage) ?
        data.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + 10).map((user) =>
          user.id
        )
        : []



      // setSelectedRows( [...selectedRows, newSelectedRows])
      setSelectedRows([...new Set([...newSelectedRows, ...selectedRows])]);
    }





  }



  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editUser) => {
    console.log(editUser)
    const updateddata = filterData.map((user) =>
      editUser.id !== user.id ? user : {
        ...editUser
      }
    )
    console.log(updateddata)
    setFilteredData(updateddata)
    setData(updateddata)
    handleCloseModal()
  }

  // Function to handle checkbox selection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}`);
        setData(response.data);
        setFilteredData(response.data);
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
    console.log(updatedSelection)
  };

  // Function to delete selected rows
  const handleDeleteSelected = () => {
    const updatedUsers = filterData.filter((user) => !selectedRows.includes(user.id));
    setData(updatedUsers);
    setFilteredData(updatedUsers)
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


    return (
      <>

        {

          data.slice(startIndex, endIndex).map((user) => (

            <>
              <tr key={user.id} className={`text-lg ${selectedRows.includes(user.id) ? "bg-gray-300" : ""}`}>
                <td className='w-[50px] text-center'>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </td>
                <td className=' py-3 w-[250px] text-left '>{user.name}</td>
                <td className=' w-[250px] text-left'>{user.email}</td>
                <td className=' w-[100px] text-left'>{user.role}</td>
                <td className='flex pt-5 gap-3 text-xl w-[100px] '>
                  <FaUserEdit className='hover:scale-125' onClick={() => handleEdit(user)} />
                  <AiFillDelete className='hover:scale-125' onClick={() => handleDelete(user.id)} />
                </td>

              </tr>
              <tr className="border-b border-red-50 "></tr>
            </>



          ))
        }
      </>

    )
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
    const updatedUsers = filterData.filter((user) => user.id !== id);
    setFilteredData(updatedUsers)
    setData(updatedUsers);
  };

  const handlePressEnter = (e) => {
    console.log(searchQuery)
    // if (searchQuery.trim() === '') {
    //   // Return all data if search query is empty
    //   setData(filterData)
    //   return;
    // }
    const filterEntries = () => {
      const filterD = filterData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
      console.log(filterD)
      setData(filterD)
      setCurrentPage(1)
    }
    if (e.key === 'Enter') filterEntries();
  }

  return (
    <>
      <Editpage handleEditClick={handleEditClick} handleCloseModal={handleCloseModal} isModalOpen={isModalOpen}
        user={curuser} handleSave={handleSave} setData={setFilteredData} />
      <div className='flex flex-col justify-center items-center' >

        {/* Search bar */}

        <div className="mt-[70px] mb-6 flex items-start w-[900px] justify-between p-1">
          <input
            type="text"
            placeholder="Search..."
            className="border p-1 rounded-lg w-[200px] pl-7"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handlePressEnter}
          />

        </div>

        {/* Table */}
        <div className='w-[900px] h-[540px] '>

          <table className="table-fixed w-full border border-collapse   ">
            {/* Table headers */}
            <thead>
              <tr >
                <th className='w-[50px] '>
                  <input
                    type="checkbox"
                    checked={selectedAllPage.includes(currentPage)}
                    onChange={() => handleSelectallCheckBoxChange(currentPage)}
                  />
                </th>
                <th className='text-left w-[270px] py-3'>Name</th>
                <th className='text-left w-[290px]'>Email</th>
                <th className='text-left w-[190px]'>Role</th>
                <th className='text-left w-[100px]'>Actions</th>
                {/* <th className='pr-20'>

                </th>
                <th className=''>Name</th>
                <th className=''>Email</th>
                <th className=''>Role</th>
                <th className=''>Actions</th> */}
              </tr>
              <tr className='border-b border-r-white'></tr>
            </thead>
            {/* Table body */}
            <tbody>{
              renderRows()
            }</tbody>
          </table>

          {/* Pagination */}


          {/* Delete Selected button */}


        </div>
        <div className="mt-12 w-[900px] flex justify-between">
          <div className='text-3xl ml-3'>

            <AiFillDelete className='text-red-500 hover:scale-125' onClick={handleDeleteSelected} />
          </div>

          {/* Pagination buttons */}

          <div className='flex items-center gap-1'>
            <ImFirst

              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />

            <GiPreviousButton

              onClick={() => currentPage === 1 ? null : handlePageChange(currentPage - 1)}
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

              onClick={() => currentPage === totalPages ? null : handlePageChange(currentPage + 1)}
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
