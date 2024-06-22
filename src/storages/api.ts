import axios from 'axios';

import { LOCALKEYS, getItemLocal, delItemLocal } from './localStorage';

/**
 * Khởi tạo cách truyền và xử lí Rest-API
 * @param {import('axios').CreateAxiosDefaults} config
 * @param {{auth: boolean, silent: boolean}} param2
 * @returns {import('axios').AxiosInstance}
 */
export const createApiInstance = (config:any, { auth = true, silent }: { auth: boolean; silent: boolean; }): import('axios').AxiosInstance => {
	const api = axios.create(config);

	api.interceptors.request.use(
		(config) => {
			if (auth && config?.headers) {
				config.headers.Authorization = `Bearer ${getItemLocal(
					LOCALKEYS.TOKEN,
				)}`;
			}
			return config;
		},
		(error) => {
			Promise.reject(error);
		},
	);
	api.interceptors.response.use(
		/**
		 * Nếu response nhận về là json về convert về dạng camelCase
		
		 * @param {import('axios').AxiosResponse} response
		 * @returns {import('axios').AxiosResponse}
		 */
		(response) => {
			return response;
		},
		/**
		 * Xử lí các trường hợp lỗi
		 
		 * @param {import('axios').AxiosError} error
		 * @returns {{message: string, data: object}} data
		 */
		(error) => {
			if (!silent) {
				console.log(error);
			}
			const { data } = error.response;

			return Promise.reject(data);
		},
	);

	return api;
};

export const api = createApiInstance(
	{
		baseURL: `/api/v1`,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	},
	{ auth: false, silent: false },
);

export const authApi = createApiInstance(
	{
		baseURL: `${'http://localhost:8080'}/api/v1`,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	},
	{ auth: true, silent: false },
);

export const authApiFile = createApiInstance(
	{
		baseURL: `${'http://localhost:8080'}/api/v1`,
		headers: {
			'Content-Type': 'multipart/form-data',
			'Access-Control-Allow-Origin': '*',
		},
	},
	{ auth: true, silent: false },
);
