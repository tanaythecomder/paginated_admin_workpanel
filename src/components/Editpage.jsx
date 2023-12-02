// YourMainComponent.js
import React, { useState } from 'react';
import Modal from './Modals/Modal';


const Editpage = ({ handleEditClick, handleCloseModal, isModalOpen, user,handleSave }) => {
  const [newValue, setNewvalue] = useState(user);
  const handleChange = (field, value) => {
    // console.log(newValue)
    setNewvalue({...user,[field]:value});
  };


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
                // value={user.name}
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
                // value={user.email}
                onChange={(e) => handleChange( 'email', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="member">
                Member:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="member"
                type="text"
                placeholder={user.role}
                // value={user.role}
                onChange={(e) => handleChange('role', e.target.value)}
              />
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