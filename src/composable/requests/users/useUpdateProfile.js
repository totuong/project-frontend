import { ref } from 'vue';
import { updateUserProfileRequest } from '../../../request/user.request';

export const useUpdateProfile = () => {
	const isLoading = ref(false);
	const error = ref(null);
	const updateUser = async (id, body) => {
		try {
			isLoading.value = true;
			console.log(id, body);
			const { data } = await updateUserProfileRequest(id, body);
			return data;
		} catch (err) {
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	};
	return { isLoading, error, updateUser };
};
