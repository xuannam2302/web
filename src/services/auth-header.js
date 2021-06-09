export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token-verify'));

    if (token && token.token) {
        // for Node.js Express back-end
        return { 'x-access-token': token.token };
    } else {
        return {};
    }
}