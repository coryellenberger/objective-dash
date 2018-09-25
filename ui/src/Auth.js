const ACCESS_TOKEN = 'access_token';
const ACCESS_TIMEOUT = 'access_timeout';

export const authenticate = (cb, JWT, expirationDate) => {
  localStorage.setItem(ACCESS_TOKEN, JWT);
  localStorage.setItem(ACCESS_TIMEOUT, expirationDate);
  cb();
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const signout = (cb) => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(ACCESS_TIMEOUT);
  cb();
};

export const isAuthenticated = () => {
  const accessTimeout = localStorage.getItem(ACCESS_TIMEOUT);
  if (accessTimeout && parseInt(accessTimeout) >= Math.floor(Date.now() / 1000)) {
    return true;
  } else {
    signout(() => {});
    return false;
  }
};
