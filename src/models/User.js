/**
 * @branch feature/add-user (Creación inicial del modelo)
 * Modelo de Usuario
 * Representa la estructura de datos que manejaremos en el CRUD.
 */
export class User {
    constructor(id, name, email, role) {
        this.id = id || Date.now().toString(); // Generar ID único si no se proporciona
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
