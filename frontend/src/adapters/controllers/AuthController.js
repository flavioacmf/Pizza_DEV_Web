import { AuthenticateUser } from "../../usecases/authenticateUser";

export class AuthController {
    constructor(repository) {
        this.authenticateUser = new AuthenticateUser(repository);
    }

    login(username, password) {
        return this.authenticateUser.execute(username, password);
    }
}
