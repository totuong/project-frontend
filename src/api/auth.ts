import { api } from '../storages/api';

export const loginApi = (body:any) => {
	return api.post('/auth/login', body);
};

export const signUpApi = (body:any) => {
	return api.post('/auth/sign-up', body);
};
