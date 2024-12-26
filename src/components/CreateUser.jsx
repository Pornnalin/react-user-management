import { useUser } from "../context/userContext";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
function CreateUser() {
  const {
    addUser,
    setNewName,
    setNewEmail,
    newName,
    newEmail,
    isEmpty,
    setNewIncome,
    newIncome,
    handleCreate,
  } = useUser();
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
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
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
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
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
            value={newIncome}
            onChange={(e) => setNewIncome(parseFloat(e.target.value))}
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
        <div className="flex gap-4 justify-center py-2">
          <button
            className="px-3 py-2 bg-green-500 rounded-md text-white"
            onClick={addUser}
          >
            <IoIosAddCircle />
          </button>
          <button
            className="px-3 py-2 bg-red-500 rounded-md text-white"
            onClick={handleCreate}
          >
            <IoIosCloseCircle />
          </button>
        </div>
      </td>
    </>
  );
}

export default CreateUser;
