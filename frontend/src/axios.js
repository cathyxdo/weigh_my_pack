// Most code snippets come from https://github.com/veryacademy/YT-Django-DRF-Simple-Blog-Series-JWT-Part-3/blob/master/react/blogapi/src/axios.js
// Used for api calls that require auth
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',

        accept: 'application/json'
    },
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Logging in and viewing your lists stored to your user account will not work. ' + 
					'However, you can still create and add to your lists stored on local' 
					
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'user/token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/user/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);
export default axiosInstance;