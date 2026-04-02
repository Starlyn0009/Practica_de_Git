/**
 * @branch feature/list-users
 * Componente que renderiza la lista (tabla) de usuarios en el DOM.
 */
export class UserList {
    constructor(containerId, onEdit, onDelete) {
        this.container = document.getElementById(containerId);
        this.onEdit = onEdit; // Callback para editar
        this.onDelete = onDelete; // Callback para eliminar
    }

    render(users) {
        this.container.innerHTML = ''; // Limpiar contenedor

        if (users.length === 0) {
            this.container.innerHTML = '<tr><td colspan="5" class="text-center">No hay usuarios registrados</td></tr>';
            return;
        }

        users.forEach(user => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td class="actions">
                    <button class="btn btn-secondary btn-sm edit-btn" data-id="${user.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">Eliminar</button>
                </td>
            `;

            // Asignar eventos a los botones generados
            // @branch feature/edit-user
            const editBtn = tr.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => this.onEdit(user.id));

            // @branch feature/delete-user
            const deleteBtn = tr.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => this.onDelete(user.id));

            this.container.appendChild(tr);
        });
    }
}
