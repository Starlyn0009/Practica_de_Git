import { User } from '../models/User.js';
import { StorageService } from './StorageService.js';

/**
 * Servicio encargado de la lógica de negocio para los Usuarios (CRUD completo).
 */
export class UserService {
    constructor() {
        this.storage = new StorageService('users_data');
        this.users = this.storage.getData();
    }

    /**
     * @branch feature/list-users
     * Leer todos los usuarios
     */
    getUsers() {
        return this.users;
    }

    /**
     * @branch feature/add-user
     * Crear un nuevo usuario
     */
    addUser(name, email, role) {
        const newUser = new User(null, name, email, role);
        this.users.push(newUser);
        this.storage.saveData(this.users);
        return newUser;
    }

    /**
     * @branch feature/edit-user
     * Actualizar usuario existente por id
     */
    updateUser(id, updatedData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedData };
            this.storage.saveData(this.users);
            return this.users[index];
        }
        return null;
    }

    /**
     * @branch feature/delete-user
     * Eliminar usuario por id
     */
    deleteUser(id) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        if (this.users.length !== initialLength) {
            this.storage.saveData(this.users);
            return true;
        }
        return false;
    }
}
