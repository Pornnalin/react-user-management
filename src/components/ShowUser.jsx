import { useUser } from "../context/userContext";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

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

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };
  const confirmDelete = async () => {
    if (deleteId) {
      await deleteUser(deleteId);
      setShowModal(false);
      setDeleteId(null);
    }
  };
  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <div className="relative">
      {/* --- GRID SYSTEM แทน TABLE --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card สำหรับ Create User (โผล่มาเมื่อกด Add) */}
        {isCreate && <CreateUser />}

        {filteredUsers.length === 0 && !isCreate ? (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex justify-center items-center w-20 h-20 bg-slate-800/50 rounded-full mb-4">
              <FaSearch className="text-slate-600 text-3xl" />
            </div>
            <p className="text-slate-500 text-lg">No members found.</p>
          </div>
        ) : (
          filteredUsers.slice(startIndex, endIndex).map((item) =>
            selectId === item.id && isEdit ? (
              <EditUser key={item.id} />
            ) : (
              // --- USER CARD ---
              <div
                key={item.id}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30"
              >
                {/* Header Card: Avatar & Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white shadow-lg ring-2 ring-white/10">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-white text-lg truncate">
                      {item.name}
                    </h3>
                    <p className="text-indigo-300 text-sm truncate">
                      {item.email}
                    </p>
                  </div>
                </div>

                {/* Body Card: Income */}
                <div className="bg-slate-950/30 rounded-xl p-3 mb-6 border border-white/5 flex justify-between items-center">
                  <span className="text-slate-400 text-xs uppercase font-medium tracking-wider">
                    Income
                  </span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    $ {item.income.toLocaleString()}
                  </span>
                </div>

                {/* Footer Card: Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all text-sm font-medium flex justify-center items-center gap-2 group-hover:bg-indigo-600/20 group-hover:text-indigo-300"
                  >
                    <FiEdit3 /> Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(item.id)}
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-rose-600 text-slate-300 hover:text-white transition-all text-sm font-medium flex justify-center items-center gap-2 group-hover:bg-rose-600/20 group-hover:text-rose-300"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* --- Pagination --- */}
      {maxPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={goToBack}
            disabled={current <= 1}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <IoIosArrowBack />
          </button>
          <span className="text-slate-400 font-medium">
            Page <span className="text-white">{current}</span> of {maxPage}
          </span>
          <button
            onClick={goToNext}
            disabled={current >= maxPage}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={cancelDelete}
          ></div>
          <div className="relative bg-[#1e293b] border border-slate-700 rounded-2xl p-6 max-w-sm w-full animate-scaleIn shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-4">
                <RiErrorWarningLine size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Delete User?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={cancelDelete}
                  className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowUser;
