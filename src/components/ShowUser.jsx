import { useUser } from "../context/userContext";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
function ShowUser() {
  const {
    filteredUsers,
    isEdit,
    handleEdit,
    selectId,
    deleteUser,
    isCreate,
    goToNext,
    goToBack,
    current,
    maxPage,
    startIndex,
    endIndex,
  } = useUser();
  const [deletingUser, setDeletingUser] = useState(null);

  const handleAnimation = (id) => {
    setDeletingUser(id);
    setTimeout(() => {
      deleteUser(id);
      setDeletingUser(null);
    }, 400);
  };
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <thead className="text-xs uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3 text-center w-1/3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center w-1/3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3 text-center w-1/6">
                  Income
                </th>
                <th scope="col" className="px-6 py-3 text-center w-1/6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isCreate && (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <CreateUser />
                </tr>
              )}
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.slice(startIndex, endIndex).map((item) => (
                  <tr
                    key={item.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    {selectId === item.id && isEdit ? (
                      <EditUser />
                    ) : (
                      <>
                        <th
                          scope="row"
                          className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ${
                            deletingUser === item.id ? "animate-fadeout" : ""
                          }`}
                        >
                          {item.name}
                        </th>
                        <td
                          className={`px-6 py-4  text-white  ${
                            deletingUser === item.id ? "animate-fadeout" : ""
                          }`}
                        >
                          <a href={`mailto:${item.email}`}> {item.email}</a>
                        </td>
                        <td
                          className={`px-6 py-4  text-white  ${
                            deletingUser === item.id ? "animate-fadeout" : ""
                          }`}
                        >
                          $ {item.income}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`flex gap-4 justify-center py-2  ${
                              deletingUser === item.id ? "animate-fadeout" : ""
                            }`}
                          >
                            <button
                              className="px-3 py-2 bg-blue-500 rounded-md text-white "
                              onClick={() => handleEdit(item.id)}
                            >
                              <FiEdit />
                            </button>
                            <button
                              className="px-3 py-2 bg-red-500 rounded-md text-white "
                              onClick={() => handleAnimation(item.id)}
                            >
                              <RiDeleteBin4Line />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {maxPage > 1 && (
        <div className="text-white flex justify-center items-center gap-3 py-5">
          <span
            className={`cursor-pointer ${current <= 1 ? "invisible" : ""}`}
            onClick={goToBack}
          >
            <IoIosArrowBack />
          </span>

          <span className="text-sm">{current}</span>
          <span className="text-sm">of</span>
          <span className="text-sm">{maxPage}</span>

          <span
            className={`cursor-pointer ${
              current >= maxPage ? "invisible" : ""
            }`}
            onClick={goToNext}
          >
            <IoIosArrowForward />
          </span>
        </div>
      )}
    </>
  );
}

export default ShowUser;
