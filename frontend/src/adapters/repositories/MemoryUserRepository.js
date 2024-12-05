import { UserRepository } from "../../domain/repositories/UserRepository";

export class MemoryUserRepository extends UserRepository {
    constructor() {
        super();
        this.users = [
            { id: 1, username: "admin", password: "123456" }, // Usuário padrão
        ];
    }

    authenticate(username, password) {
        const user = this.users.find(
            (u) => u.username === username && u.password === password
        );
        return user || null;
    }
}
