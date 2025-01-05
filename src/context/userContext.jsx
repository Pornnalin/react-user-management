import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

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

  const [current, setCurrent] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUser(res.data);
      setFilteredUsers(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const filtered = user.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.income.toString().includes(search)
    );
    setFilteredUsers(filtered);
    // console.log(filtered);
  }, [user, search]);

  function findMaxPage() {
    const userLength = filteredUsers?.length;
    const result = Math.ceil(userLength / 5);
    setMaxPage(result);
  }
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
  useEffect(() => {
    findMaxPage();
  }, [filteredUsers.length]);

  const searchBar = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleCreate = () => {
    setIsCreate((prev) => !prev);
  };
  const addUser = async (e) => {
    e.preventDefault();
    const newUser = {
      id: String(Math.floor(Math.random() * 10000)),
      name: newName,
      email: newEmail,
      income: newIncome,
    };
    try {
      const post = await axios.post("http://localhost:3000/users", newUser);
      setUser([...user, post.data]);
      setFilteredUsers([...user, post.data]);
      setNewName("");
      setNewEmail("");
      setNewIncome(0);
      setIsCreate(false);
      console.log(post);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    const findId = user.find((item) => item.id === String(id));
    if (findId) {
      setSelectId(findId.id);
      setIsEdit(true);
      setName(findId.name);
      setEmail(findId.email);
      setIncome(findId.income);
    }
  };

  const updateUser = async () => {
    const editUser = { id: selectId, name, email, income };
    try {
      await axios.put(`http://localhost:3000/users/${selectId}`, editUser);
      setUser((prvUser) =>
        prvUser.map((user) =>
          user.id === selectId ? { ...user, name, email, income } : user
        )
      );
      setIsEdit(false);
      setName("");
      setEmail("");
      setIncome(0);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      const updateUser = user.filter((item) => item.id !== id);
      setUser(updateUser);
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };
  const exitEdit = () => {
    setIsEdit(false);
  };
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
