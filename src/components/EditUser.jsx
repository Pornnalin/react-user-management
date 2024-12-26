import { useState } from "react";
import { useUser } from "../context/userContext";
import { LuSave } from "react-icons/lu";
import { MdOutlineExitToApp } from "react-icons/md";
export default function EditUser() {
  const {
    updateUser,
    setName,
    setEmail,
    name,
    email,
    exitEdit,
    setIncome,
    income,
  } = useUser();
  const [isEmpty, setIsEmpty] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name != "" && email != "") {
      setIsEmpty(false);
      updateUser();
    } else {
      setIsEmpty(true);
    }
  };
  return (
    <>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  dark:text-white"
      >
        <div className=" w-[170px] flex flex-col relative">
          <input
            type="text"
            name=""
            id=""
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" text-gray-400 whitespace-nowrap  bg-transparent focus:outline-none italic"
          />
          {isEmpty && (
            <span className="text-[10px] text-red-500 absolute top-5 left-0">
              *cannot be empty*
            </span>
          )}
        </div>
      </th>
      <td className="px-6 py-4">
        <div className=" w-[170px] flex flex-col relative">
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" text-gray-400 whitespace-nowrap  bg-transparent focus:outline-none italic"
          />
          {isEmpty && (
            <span className="text-[10px] text-red-500 absolute top-5 left-0">
              *cannot be empty*
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className=" w-[170px] flex flex-col relative">
          <input
            type="number"
            name=""
            id=""
            placeholder="Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className=" text-gray-400 whitespace-nowrap  bg-transparent focus:outline-none italic no-spinner"
          />
          {isEmpty && (
            <span className="text-[10px] text-red-500 absolute top-5 left-0">
              *cannot be empty*
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-4 justify-center py-2">
          <button
            className="px-3 py-2 bg-blue-500 rounded-md text-white"
            onClick={handleSubmit}
          >
            <LuSave />
          </button>
          <button
            className="px-3 py-2 bg-red-500 rounded-md text-white"
            onClick={exitEdit}
          >
            <MdOutlineExitToApp />
          </button>
        </div>
      </td>
    </>
  );
}
