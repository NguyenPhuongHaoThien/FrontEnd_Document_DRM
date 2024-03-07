
 //use context hiện còn chưa lưu được token để xử lý lại sau

// import React from 'react';
// import ReactDOM from 'react-dom';

// // @function  UserContext
// const UserContext = React.createContext({ email: '', auth: false });

// // @function  UserProvider
// // Create function to provide UserContext
// const UserProvider = ({ children }) => {
//   const [user, setUser] = React.useState({ email: '', auth: false });

//   const loginContext = (email, token) => {
//     setUser((user) => ({
//       email: email,
//       auth: true,
//     }));
//     localStorage.setItem('token');
//     localStorage.setItem('email');
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('email');
//     setUser((user) => ({
//         email: '',
//       auth: false,
//     }));
//   };

//   return (
//     <UserContext.Provider value={{ user, loginContext, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserProvider };




import React, { useState, useEffect } from 'react';

const UserContext = React.createContext({ email: '', auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Get the user data from localStorage when the application starts up
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : { email: '', auth: false };
    });

    useEffect(() => {
        // Save the user data to localStorage whenever it changes
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const loginContext = (email,token ) => {
        setUser({ email: email, auth: true, token: token});
    };

    const setToken = (token) => {
        setUser((user) => ({ ...user, token: token }));
        localStorage.setItem('token', token);
      };
    

    const logout = () => {
        localStorage.removeItem('token');
        setUser({ email: '', auth: false });
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };