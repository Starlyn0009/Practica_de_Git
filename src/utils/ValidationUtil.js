/**
 * @branch feature/add-user (Primeras validaciones)
 * @branch hotfix/fix-validation-error (Por ejemplo, si después falla la validación de email y se arregla aquí)
 * Utilidades de validación de datos.
 */
export class ValidationUtil {
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static isEmpty(value) {
        return !value || value.trim() === '';
    }
}
