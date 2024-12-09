import { createContext, useState } from 'react';
const UserContext = createContext({ email: '', auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ email: '', id: '' ,auth: false ,password: '' });
  
    const login = (email, id, password) => {
      setUser((user) => ({
        email: email, 
        auth: true,
        id : id,
        pass: password
      }));
      localStorage.setItem('email', email);
      localStorage.setItem('id', id);
    };
  
    const logout = () => {
      setUser((user) => ({
        email: '',
        id: '', 
        auth: false,
      }));
      localStorage.removeItem('email');
      localStorage.removeItem('id');

    };
  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  }
  export {UserContext,UserProvider}