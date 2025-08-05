// User JavaScript functionality
class UserManager {
    constructor() {
        this.user = null;
        this.init();
    }

    async init() {
        await this.loadUserProfile();
        this.renderUserProfile();
    }

    async loadUserProfile() {
        try {
            const response = await fetch('/api/user/profile');
            if (response.ok) {
                this.user = await response.json();
            } else {
                console.error('Failed to load user profile');
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    renderUserProfile() {
        if (!this.user) {
            this.showAlert('Failed to load user profile', 'danger');
            return;
        }

        // Update user information in the DOM
        const userInfoElements = document.querySelectorAll('[data-user-info]');
        userInfoElements.forEach(element => {
            const field = element.getAttribute('data-user-info');
            switch (field) {
                case 'id':
                    element.textContent = this.user.id;
                    break;
                case 'firstName':
                    element.textContent = this.user.firstName;
                    break;
                case 'lastName':
                    element.textContent = this.user.lastName;
                    break;
                case 'age':
                    element.textContent = this.user.age;
                    break;
                case 'email':
                    element.textContent = this.user.email;
                    break;
                case 'roles':
                    const hasAdminRole = this.user.roles && this.user.roles.some(role => role.name === 'ROLE_ADMIN');
                    element.textContent = hasAdminRole ? '[ADMIN]' : '[USER]';
                    break;
            }
        });


    }

    showAlert(message, type) {
        const alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) {
            const container = document.createElement('div');
            container.id = 'alertContainer';
            container.style.position = 'fixed';
            container.style.top = '20px';
            container.style.right = '20px';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.getElementById('alertContainer').appendChild(alertDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Initialize user manager when DOM is loaded
let userManager;
document.addEventListener('DOMContentLoaded', () => {
    userManager = new UserManager();
}); 