import { useState } from "react";
import { useUser } from "../context/userContext";
import { IoSave, IoClose } from "react-icons/io5";

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
    if (name !== "" && email !== "") {
      setIsEmpty(false);
      updateUser();
    } else {
      setIsEmpty(true);
    }
  };

  const inputStyle =
    "w-full bg-indigo-950/30 border border-indigo-500/30 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 rounded-lg px-3 py-2 text-sm text-white placeholder-indigo-300/50 transition-all outline-none";

  return (
    // Card Style สำหรับ Edit (เน้นขอบสี Indigo)
    <div className="bg-indigo-900/10 backdrop-blur-xl border border-indigo-500 rounded-2xl p-6 shadow-[0_0_30px_rgba(99,102,241,0.15)] relative">
      <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
        Editing
      </div>

      <div className="mt-2 space-y-4">
        {/* Name */}
        <div className="relative">
          <label className="text-xs text-indigo-300 ml-1 mb-1 block">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyle}
          />
          {isEmpty && !name && (
            <span className="text-[10px] text-rose-400 absolute right-2 bottom-3">
              *Req
            </span>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <label className="text-xs text-indigo-300 ml-1 mb-1 block">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle}
          />
          {isEmpty && !email && (
            <span className="text-[10px] text-rose-400 absolute right-2 bottom-3">
              *Req
            </span>
          )}
        </div>

        {/* Income */}
        <div className="relative">
          <label className="text-xs text-indigo-300 ml-1 mb-1 block">
            Income
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-900/20 transition-all flex justify-center items-center gap-1"
          >
            <IoSave /> Save
          </button>
          <button
            onClick={exitEdit}
            className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all flex justify-center items-center gap-1"
          >
            <IoClose /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
