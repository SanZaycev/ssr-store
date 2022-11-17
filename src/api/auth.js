import {api_actions} from "../core/actions.js";

export default http => ({
    async login(login, password) {
        const { data } = await http.post('auth/login.php', {login, password}, {
            action: api_actions.LOGIN
        });
        return data
    },
    async logout(){
        const { data } = await http.get('auth/logout.php', {
            action: api_actions.LOGOUT
        });
        return data;
    },
    async check() {
        try {
            const { data } = await http.get('auth/check.php', {
                silence401: true
            });
            return data
        } catch (e) {
            return { res: false };
        }
    }
})
