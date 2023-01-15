const currentEnvironment = import.meta.env.VITE_APP_ENV;

let baseURL = '';
if (currentEnvironment === 'development') {
  baseURL = 'http://localhost:3001/';
} else {
  baseURL = 'https://api.example.com/';
}

export { baseURL };
