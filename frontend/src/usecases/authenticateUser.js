export class AuthenticateUser {
    constructor(repository) {
        this.repository = repository;
    }

    execute(username, password) {
        return this.repository.authenticate(username, password);
    }
}
