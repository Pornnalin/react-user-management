import { useUser } from "./context/userContext";
import ShowUser from "./components/ShowUser";
import { MdCreate } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
function App() {
  const { isEdit, handleCreate, isCreate, searchBar, search } = useUser();

  return (
    <div className="h-[100vh] m-10">
      <h1 className="text-2xl font-bold text-center py-2 text-white">
        User Management System
      </h1>
      <div className="py-5">
        <div className="flex justify-between pt-5 pb-2">
          <div className="relative flex">
            <input
              type="text"
              className="rounded-md bg-gray-600 px-10 py-1 text-white focus:outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => searchBar(e)}
            />
            <FaSearch className="absolute left-3 top-[16px] transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className={`${isCreate ? "hidden" : ""}`}>
            <button
              onClick={handleCreate}
              className={`px-3 py-2 bg-green-500 rounded-md  self-center text-white ${
                isEdit ? "cursor-not-allowed" : ""
              }`}
            >
              <MdCreate />
            </button>
          </div>
        </div>
        <ShowUser />
      </div>
    </div>
  );
}

export default App;
