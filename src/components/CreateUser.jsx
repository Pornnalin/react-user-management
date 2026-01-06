import { useUser } from "../context/userContext";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

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
    cancelCreate,
  } = useUser();
  const isInvalid = !newName || !newEmail || !newIncome;
  const inputStyle =
    "w-full bg-slate-900/50 border border-slate-600/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 transition-all outline-none";

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl border-2 border-dashed border-slate-600 rounded-2xl p-6 animate-fadeIn relative overflow-hidden">
      <div className="absolute top-0 left-0 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-br-lg uppercase tracking-wider">
        New Member
      </div>

      <div className="mt-2 space-y-4">
        {/* Name Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Full Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={inputStyle}
            autoFocus
            required
          />
          {isEmpty && !newName && (
            <span className="text-[10px] text-rose-400 absolute right-2 top-2.5">
              *Req
            </span>
          )}
        </div>

        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            placeholder="Email Address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className={inputStyle}
            required
          />
          {isEmpty && !newEmail && (
            <span className="text-[10px] text-rose-400 absolute right-2 top-2.5">
              *Req
            </span>
          )}
        </div>

        {/* Income Input */}
        <div className="relative">
          <input
            type="number"
            placeholder="Income Amount"
            value={newIncome || ""}
            onChange={(e) => setNewIncome(parseFloat(e.target.value))}
            className={inputStyle}
            required
          />
          {isEmpty && !newIncome && (
            <span className="text-[10px] text-rose-400 absolute right-2 top-2.5">
              *Req
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={addUser}
            disabled={isInvalid}
            className={`flex-1 py-2 text-white rounded-lg shadow-lg transition-all flex justify-center items-center gap-1 
    ${
      isInvalid
        ? "bg-slate-600 opacity-50 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20"
    }`}
          >
            <IoCheckmarkCircle size={18} /> Save
          </button>
          <button
            onClick={cancelCreate}
            className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-all flex justify-center items-center gap-1"
          >
            <IoCloseCircle size={18} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
