/**
 * @branch feature/add-user (Creación inicial para guardar usuarios)
 * Servicio para manejar el almacenamiento local (localStorage).
 * Separa la lógica de almacenamiento de la lógica de negocio.
 */
export class StorageService {
    constructor(key) {
        this.key = key;
    }

    getData() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    saveData(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
}
