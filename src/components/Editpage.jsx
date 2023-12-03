// YourMainComponent.js
import React, { useEffect, useState } from 'react';
import Modal from './Modals/Modal';


const Editpage = ({ handleEditClick, handleCloseModal, isModalOpen, user, handleSave }) => {
  const [newValue, setNewvalue] = useState("");

  
  const handleChange = (field, value) => {
    
    setNewvalue({ ...user, [field]: value });
    
  };
  // useEffect(()=>{
  //   setNewvalue(newValue)
  // },[])
 

  return (
    <div className="container mx-auto p-4">
      {/* {console.log(user)} */}

      {isModalOpen && (
        <Modal handleClose={handleCloseModal}>
          {/* Content of your modal goes here */}
          <h2 className="text-2xl mb-4"><form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder={user.name}
                // value={newValue.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder={user.email}
                // value={newValue.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role:
              </label>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                // value={newValue.role}
                onChange={(e) => handleChange('role', e.target.value)}
              >
                <option value="">-Select-</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              type="button"
              onClick={() => handleSave(newValue)}
            >
              Save
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </form></h2>
          {/* Add your form or other content for editing */}
        </Modal>
      )}
    </div>
  );
};

export default Editpage;
