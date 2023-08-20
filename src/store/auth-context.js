import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  fullName:'',
  role: '',
  login: (token, fullName, role) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');
  const storedFullName = localStorage.getItem('fullName');

  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');

    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    fullName: storedFullName,
    role: storedRole
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  
  let initialToken, initialRole, initialFullName;

  if (tokenData) {
    initialToken = tokenData.token;
    initialRole = tokenData.role;
    initialFullName = tokenData.fullName

  }

  const [token, setToken] = useState(initialToken);
  const [role, setRole] = useState(initialRole);
  const [fullName, setFullName] = useState(initialFullName);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setRole(null);
    setFullName(null);

    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, fullName, role) => {
    setToken(token);
    setRole(role);
    setRole(fullName);
    var expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 10);
    console.log(expirationTime);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('role', role);
    localStorage.setItem('fullName', fullName);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    fullName: fullName,
    role: role,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;