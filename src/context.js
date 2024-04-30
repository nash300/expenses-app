import { createContext, useContext, useState } from "react";

//////////////////////////////////////////////////////////////////////////
// This context file stores the information of the current logged-in user.
//////////////////////////////////////////////////////////////////////////
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  useContext(UserContext);
};
