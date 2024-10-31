import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
 
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status } = error.response;
  
        if (status === 401 || status === 403) {
          localStorage.removeItem('token');  
          window.location.href = '/';       
        } else if (status >= 500) {
          alert('A server error occurred. Please try again later.');
        }
      }
      return Promise.reject(error); 
    }
  );
  

export const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', username);
  params.append('password', password);
  params.append('scope', '');
  params.append('client_id', 'string');
  params.append('client_secret', 'string');
  const response = await axios.post(`${API_URL}/login`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  localStorage.setItem('token', response.data.access_token);
  return response.data;
};

export const getWashes = async () => {
  const response = await api.get('/washes');
  return response.data;
};

export const getCompanies = async () => {
  const response = await api.get('/companies');
  return response.data;
};

export const addWash = async (washData) => {
  const response = await api.post('/washes', washData);
  return response.data;
};


export const exportWashes = async (companyId, startDate, endDate) => {
  const response = await api.get('/washes/export/records', {
    params: { company_id: companyId, start_date: startDate, end_date: endDate },
    responseType: 'blob', 
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${companyId}_washes_record.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
