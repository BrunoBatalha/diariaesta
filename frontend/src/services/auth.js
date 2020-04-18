
export const login = (token) => {
    localStorage.setItem('token', token);
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isAutenticado = () => localStorage.getItem('token') !== null;
export const getToken = () => localStorage.getItem('token');