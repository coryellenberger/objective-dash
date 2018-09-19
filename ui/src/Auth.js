export const ACCESS_TOKEN = 'access_token';

export const authenticate = (cb, JWT) => {
  localStorage.setItem(ACCESS_TOKEN, JWT);
  cb();
}

export const signout = (cb) => {
  localStorage.removeItem(ACCESS_TOKEN);
  cb();
}

export const isAuthenticated = () => {
  const accessToke = localStorage.getItem(ACCESS_TOKEN);
  if (accessToke) {
    return true;
  } else {
    return false;
  }
};
