import tokenService from "../services/token.service"

export default function authHeader() {
    const user = tokenService.getUser()
    if (user && user.accessToken) {
        return {'x-access-token': user.accessToken}
    }
    return {}
}