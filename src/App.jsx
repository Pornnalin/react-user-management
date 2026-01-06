import { useUser } from "./context/userContext";
import ShowUser from "./components/ShowUser";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function App() {
  const { isEdit, handleCreate, searchBar, search } = useUser();

  return (
    <div className="min-h-screen w-full relative selection:bg-indigo-500/30">
      {/* --- Animated Aurora Background --- */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-20">
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-200">
              Team Members
            </h1>
            <p className="text-slate-400 font-light">
              Manage your squad and track earnings.
            </p>
          </div>

          {/* --- Controls --- */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-white/10 focus:border-indigo-500/50 transition-all backdrop-blur-md"
                placeholder="Search..."
                value={search}
                onChange={searchBar}
              />
            </div>

            <button
              onClick={handleCreate}
              disabled={isEdit}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20 
                ${
                  isEdit
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105 active:scale-95"
                }`}
            >
              <MdPersonAddAlt1 size={20} />
              <span className="hidden sm:inline">Add Member</span>
            </button>
          </div>
        </div>

        {/* --- Content Grid --- */}
        <ShowUser />
      </div>
    </div>
  );
}

export default App;
