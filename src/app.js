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
            if (userService.deleteUser(id)) {
                refreshList(); // Actualizar vista

                // Mostrar alerta visual temporal
                const globalAlert = document.getElementById('global-alert');
                if (globalAlert) {
                    globalAlert.textContent = 'Usuario eliminado correctamente.';
                    globalAlert.style.display = 'block';
                    globalAlert.classList.add('alert-success');

                    // Ocultar después de 3 segundos
                    setTimeout(() => {
                        globalAlert.style.display = 'none';
                        globalAlert.classList.remove('alert-success');
                    }, 3000);
                }
            }
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
            alert('Usuario editado correctamente.');
        } else {
            // Si no hay ID, creamos uno nuevo
            userService.addUser(name, email, role);
            alert('Usuario agregado correctamente.');
        }

        refreshList(); // Actualizar vista después de modificar datos
    };

    const userForm = new UserForm('user-form', handleFormSubmit);

    // Función para refrescar la lista
    const refreshList = () => {
        const users = userService.getUsers();

        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm)
        );

        userList.render(filteredUsers);
    };

    // Event listener para el buscador
    const searchInputEl = document.getElementById('search-input');
    if (searchInputEl) {
        searchInputEl.addEventListener('input', refreshList);
    }

    // Primera carga
    refreshList();
});
