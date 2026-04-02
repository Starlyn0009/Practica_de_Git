import { ValidationUtil } from '../utils/ValidationUtil.js';

/**
 * @branch feature/add-user
 * @branch feature/edit-user (Modificado luego para soportar modo edición)
 * Componente que maneja el formulario de agregar/editar usuario.
 */
export class UserForm {
    constructor(formId, onSubmit) {
        this.form = document.getElementById(formId);
        this.onSubmit = onSubmit; // Callback cuando se envía el form

        // Inputs
        this.idInput = document.getElementById('user-id');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.roleInput = document.getElementById('role');
        this.errorMsg = document.getElementById('form-error');

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.errorMsg.textContent = ''; // Limpiar mensajes

        const id = this.idInput.value;
        const name = this.nameInput.value;
        const email = this.emailInput.value;
        const role = this.roleInput.value;

        // Validaciones: @branch hotfix/fix-validation-error
        if (ValidationUtil.isEmpty(name) || ValidationUtil.isEmpty(email) || ValidationUtil.isEmpty(role)) {
            this.errorMsg.textContent = 'Todos los campos son obligatorios.';
            return;
        }

        if (!ValidationUtil.isValidEmail(email)) {
            this.errorMsg.textContent = 'Por favor, ingrese un correo válido.';
            return;
        }

        // Llamar al callback que viene desde app.js
        this.onSubmit({ id, name, email, role });
        this.clearForm();
    }

    fillForm(user) {
        this.idInput.value = user.id;
        this.nameInput.value = user.name;
        this.emailInput.value = user.email;
        this.roleInput.value = user.role;

        // Cambiar texto del botón
        const btn = this.form.querySelector('button[type="submit"]');
        btn.textContent = 'Actualizar Usuario';
    }

    clearForm() {
        this.form.reset();
        this.idInput.value = '';
        this.errorMsg.textContent = '';

        const btn = this.form.querySelector('button[type="submit"]');
        btn.textContent = 'Guardar Usuario';
    }
}
