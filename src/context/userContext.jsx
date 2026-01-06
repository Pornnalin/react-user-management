import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js"; 

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [income, setIncome] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [selectId, setSelectId] = useState(0);
  const [isCreate, setIsCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newIncome, setNewIncome] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Pagination State
  const [current, setCurrent] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  // 1. ดึงข้อมูล (Fetch)
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      setUser(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  // 2. เพิ่มข้อมูล (Create)
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("users")
        .insert([{ name: newName, email: newEmail, income: newIncome }])
        .select();

      if (error) throw error;

      setUser([...user, data[0]]);
      setNewName("");
      setNewEmail("");
      setNewIncome(0);
      setIsCreate(false);
    } catch (err) {
      console.error("Error adding user:", err.message);
    }
  };

  // 3. เตรียมแก้ไข (Handle Edit)
  const handleEdit = (id) => {
    // Supabase id มักเป็น number ถ้าในฐานข้อมูลตั้งเป็น int
    const findId = user.find((item) => item.id === id);
    if (findId) {
      setSelectId(findId.id);
      setIsEdit(true);
      setName(findId.name);
      setEmail(findId.email);
      setIncome(findId.income);
    }
  };

  // 4. บันทึกการแก้ไข (Update)
  const updateUser = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({ name, email, income })
        .eq("id", selectId);

      if (error) throw error;

      setUser((prev) =>
        prev.map((u) => (u.id === selectId ? { ...u, name, email, income } : u))
      );
      setIsEdit(false);
      setName("");
      setEmail("");
      setIncome(0);
    } catch (err) {
      console.error("Error updating user:", err.message);
    }
  };

  // 5. ลบข้อมูล (Delete)
  const deleteUser = async (id) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) throw error;

      setUser(user.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  // Logic อื่นๆ (Search/Pagination) คงเดิม
  useEffect(() => {
    const filtered = user.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.income?.toString().includes(search)
    );
    setFilteredUsers(filtered);
  }, [user, search]);

  function findMaxPage() {
    const result = Math.ceil(filteredUsers.length / 5);
    setMaxPage(result || 1);
  }

  useEffect(() => {
    findMaxPage();
  }, [filteredUsers.length]);

  const goToNext = () => {
    if (current < maxPage) {
      setCurrent((pre) => pre + 1);
      setStartIndex((prev) => prev + 5);
      setEndIndex((prev) => prev + 5);
    }
  };

  const goToBack = () => {
    if (current > 1) {
      setCurrent((pre) => pre - 1);
      setStartIndex((prev) => prev - 5);
      setEndIndex((prev) => prev - 5);
    }
  };

  const searchBar = (e) => setSearch(e.target.value);
  const handleCreate = () => setIsCreate((prev) => !prev);
  const exitEdit = () => setIsEdit(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        name,
        setName,
        email,
        setEmail,
        income,
        setIncome,
        addUser,
        updateUser,
        isEdit,
        setIsEdit,
        handleEdit,
        selectId,
        deleteUser,
        exitEdit,
        handleCreate,
        isCreate,
        newName,
        setNewName,
        newEmail,
        setNewEmail,
        newIncome,
        setNewIncome,
        searchBar,
        search,
        filteredUsers,
        goToNext,
        goToBack,
        current,
        maxPage,
        startIndex,
        endIndex,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

