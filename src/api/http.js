import axios from 'axios';

export default () => {
	return axios.create({
		//baseURL: 'http://faceprog.ru/vue-advanced-api-l3/',
		baseURL: 'https://wp.dmitrylavrik.ru/vue-advanced-api-l3/',
		timeout: 10000,
		withCredentials: true
	})
}
