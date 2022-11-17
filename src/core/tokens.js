import {addAccessToken, setTokens, cleanTokensData} from '../services/tokens.js';
import {is401Error} from "./errors.js";


export default function connectTokens(http){
    http.interceptors.request.use(addAccessToken);
    http.interceptors.response.use(
        res => res,
        async function (error) {
            if(!is401Error(error)) {
                return Promise.reject(error); // ошибка, не связанная с авторизацией
            }

            cleanTokensData();

            const response = await http.get('auth/refresh/refresh.php');

            if (!response.data.res) {
                return Promise.reject(error); // прокидываем 401 код дальше, если не удалось refresh
            }

            setTokens(response.data.accessToken);
            return http.request(error.config);
            //return http(addAccessToken(error.config));
        }
    );
}
