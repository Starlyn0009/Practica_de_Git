import { UserService } from './services/UserService.js';
import { UserForm } from './components/UserForm.js';
import { UserList } from './components/UserList.js';

/**
 * @branch feature/init-project
 * Archivo principal de la aplicación.
 * Conecta los componentes de la interfaz con los servicios (controlador).
 */
document.addEventListener('DOMContentLoaded', () => {

    const userService = new UserService();
    let userList; // Declarar variable para List Component

    // Callbacks para la lista
    // @branch feature/edit-user
    const handleEdit = (id) => {
        const users = userService.getUsers();
        const user = users.find(u => u.id === id);
        if (user) {
            userForm.fillForm(user);
        }
    };

    // @branch feature/delete-user
    const handleDelete = (id) => {
        if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
            userService.deleteUser(id);
            refreshList(); // Actualizar vista
        }
    };

    // Inicializar componentes
    userList = new UserList('user-table-body', handleEdit, handleDelete);

    // Callbacks para el formulario
    // @branch feature/add-user y feature/edit-user
    const handleFormSubmit = (userData) => {
        const { id, name, email, role } = userData;

        if (id) {
            // Si hay un ID, estamos actualizando
            userService.updateUser(id, { name, email, role });
        } else {
            // Si no hay ID, creamos uno nuevo
            userService.addUser(name, email, role);
        }

        refreshList(); // Actualizar vista después de modificar datos
    };

    const userForm = new UserForm('user-form', handleFormSubmit);

    // Función para refrescar la lista
    const refreshList = () => {
        const users = userService.getUsers();
        userList.render(users);
    };

    // Primera carga
    refreshList();
});
