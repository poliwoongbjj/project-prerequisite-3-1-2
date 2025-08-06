// Admin JavaScript functionality
class AdminManager {
    constructor() {
        this.users = [];
        this.roles = [];
        this.init();
    }

    async init() {
        await this.loadUsers();
        await this.loadRoles();
        this.setupEventListeners();
        this.renderUsersTable();
    }

    async loadUsers() {
        try {
            const response = await fetch('/api/admin/users');
            if (response.ok) {
                this.users = await response.json();
            } else {
                console.error('Failed to load users, status:', response.status);
            }
        } catch (error) {
            console.error('Exception while loading users:', error);
        }
    }

    async loadRoles() {
        try {
            const response = await fetch('/api/admin/roles');
            if (response.ok) {
                this.roles = await response.json();
            } else {
                console.error('Failed to load roles, status:', response.status);
            }
        } catch (error) {
            console.error('Exception while loading roles:', error);
        }
    }

    setupEventListeners() {
        // Add user form submission
        const addUserForm = document.getElementById('addUserForm');
        if (addUserForm) {
            addUserForm.addEventListener('submit', (e) => this.handleAddUser(e));
            this.populateRoleSelect();
        }

        // Edit user form submission
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('edit-user-form')) {
                e.preventDefault();
                this.handleEditUser(e);
            }
        });

        // Delete user form submission
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('delete-user-form')) {
                e.preventDefault();
                this.handleDeleteUser(e);
            }
        });

        // Refresh button
        const refreshBtn = document.getElementById('refreshUsers');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshUsers());
        }
    }

    renderUsersTable() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) {
            console.error('usersTableBody element not found!');
            return;
        }

        tbody.innerHTML = '';

        if (this.users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No users found</td></tr>';
            return;
        }

        this.users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'table-white' : 'table-secondary';
            
            const hasAdminRole = user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN');
            const roleDisplay = hasAdminRole ? '[ADMIN]' : '[USER]';

            row.innerHTML = `
                <td class="border-0">${user.id}</td>
                <td class="border-0">${user.firstName}</td>
                <td class="border-0">${user.lastName}</td>
                <td class="border-0">${user.age}</td>
                <td class="border-0">${user.email}</td>
                <td class="border-0">${roleDisplay}</td>
                <td class="border-0">
                    <button type="button" class="btn btn-info text-white" 
                            onclick="adminManager.openEditModal(${user.id})">Edit</button>
                </td>
                <td class="border-0">
                    <button type="button" class="btn btn-danger" 
                            onclick="adminManager.openDeleteModal(${user.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async handleAddUser(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            age: parseInt(formData.get('age')),
            email: formData.get('email'),
            password: formData.get('password'),
            roleIds: Array.from(formData.getAll('roleIds')).map(id => parseInt(id))
        };

        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const newUser = await response.json();
                this.users.push(newUser);
                this.renderUsersTable();
                event.target.reset();
                this.showAlert('User created successfully!', 'success');
                
                // Redirect to the user list/table after successful user creation
                window.location.href = '/admin';
            } else {
                const error = await response.text();
                this.showAlert('Error creating user: ' + error, 'danger');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            this.showAlert('Error creating user', 'danger');
        }
    }

    async handleEditUser(event) {
        const formData = new FormData(event.target);
        const userId = parseInt(formData.get('id'));
        
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            age: parseInt(formData.get('age')),
            email: formData.get('email'),
            roleIds: Array.from(formData.getAll('roleIds')).map(id => parseInt(id))
        };

        const password = formData.get('password');
        if (password) {
            userData.password = password;
        }

        try {
            const response = await fetch('/api/admin/users/' + userId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                const index = this.users.findIndex(u => u.id === userId);
                if (index !== -1) {
                    this.users[index] = updatedUser;
                }
                this.renderUsersTable();
                this.closeModal('editModal' + userId);
                this.showAlert('User updated successfully!', 'success');
            } else {
                const error = await response.text();
                this.showAlert('Error updating user: ' + error, 'danger');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            this.showAlert('Error updating user', 'danger');
        }
    }

    async handleDeleteUser(event) {
        const formData = new FormData(event.target);
        const userId = parseInt(formData.get('id'));

        try {
            const response = await fetch('/api/admin/users/' + userId, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.users = this.users.filter(u => u.id !== userId);
                this.renderUsersTable();
                this.closeModal('deleteModal' + userId);
                this.showAlert('User deleted successfully!', 'success');
            } else {
                const error = await response.text();
                this.showAlert('Error deleting user: ' + error, 'danger');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            this.showAlert('Error deleting user', 'danger');
        }
    }

    openEditModal(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modal = document.getElementById('editModal' + userId);
        if (!modal) {
            this.createEditModal(user);
        } else {
            this.populateEditModal(user);
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    }

    openDeleteModal(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modal = document.getElementById('deleteModal' + userId);
        if (!modal) {
            this.createDeleteModal(user);
        } else {
            this.populateDeleteModal(user);
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    }

    createEditModal(user) {
        const modalHtml = this.generateEditModalHtml(user);
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.populateEditModal(user);
        const modal = document.getElementById('editModal' + user.id);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }

    createDeleteModal(user) {
        const modalHtml = this.generateDeleteModalHtml(user);
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.populateDeleteModal(user);
        const modal = document.getElementById('deleteModal' + user.id);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }

    generateEditModalHtml(user) {
        const roleOptions = this.roles.map(role => 
            `<option value="${role.id}" ${user.roles && user.roles.some(r => r.id === role.id) ? 'selected' : ''}>
                ${role.name === 'ROLE_ADMIN' ? 'ADMIN' : 'USER'}
            </option>`
        ).join('');

        return `
            <div id="editModal${user.id}" class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit user</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form class="edit-user-form px-3">
                                <input type="hidden" name="id" value="${user.id}">
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">ID</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="text" class="form-control bg-light text-muted" value="${user.id}" readonly>
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">First Name</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="text" class="form-control" name="firstName" value="${user.firstName}" required>
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">Last Name</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="text" class="form-control" name="lastName" value="${user.lastName}" required>
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">Age</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="number" class="form-control" name="age" value="${user.age}" required min="1" max="120" step="1">
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">Email</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="email" class="form-control" name="email" value="${user.email}" required>
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">Password</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="password" class="form-control" name="password" placeholder="Leave blank to keep current password">
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">Role</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <select class="form-select" name="roleIds" multiple style="height: 45px; overflow-y: auto;">
                                            ${roleOptions}
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="d-flex justify-content-end gap-2">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateDeleteModalHtml(user) {
        return `
            <div id="deleteModal${user.id}" class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete user</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form class="delete-user-form px-3">
                                <input type="hidden" name="id" value="${user.id}">
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">ID</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="text" class="form-control bg-light text-muted" value="${user.id}" readonly>
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">First Name</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="text" class="form-control bg-light text-muted" value="${user.firstName}" readonly>
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">Last Name</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="text" class="form-control bg-light text-muted" value="${user.lastName}" readonly>
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">Age</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="text" class="form-control bg-light text-muted" value="${user.age}" readonly>
                                    </div>
                                </div>
                                
                                <div class="mb-3 d-flex flex-column align-items-center">
                                    <label class="form-label fw-bold text-center d-block">Email</label>
                                    <div style="max-width: 300px; width: 100%;">
                                        <input type="email" class="form-control bg-light text-muted" value="${user.email}" readonly>
                                    </div>
                                </div>
                                
                                <div class="d-flex justify-content-end gap-2">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-danger">Delete</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    populateEditModal(user) {
        const modal = document.getElementById('editModal' + user.id);
        if (!modal) return;

        modal.querySelector('input[name="firstName"]').value = user.firstName;
        modal.querySelector('input[name="lastName"]').value = user.lastName;
        modal.querySelector('input[name="age"]').value = user.age;
        modal.querySelector('input[name="email"]').value = user.email;
        modal.querySelector('input[name="password"]').value = '';

        // Reset role selection
        const roleSelect = modal.querySelector('select[name="roleIds"]');
        Array.from(roleSelect.options).forEach(option => {
            option.selected = user.roles && user.roles.some(role => role.id === parseInt(option.value));
        });
    }

    populateDeleteModal(user) {
        const modal = document.getElementById('deleteModal' + user.id);
        if (!modal) return;

        modal.querySelector('input[readonly]').value = user.id;
        modal.querySelectorAll('input[readonly]')[1].value = user.firstName;
        modal.querySelectorAll('input[readonly]')[2].value = user.lastName;
        modal.querySelectorAll('input[readonly]')[3].value = user.age;
        modal.querySelectorAll('input[readonly]')[4].value = user.email;
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
    }

    async refreshUsers() {
        await this.loadUsers();
        this.renderUsersTable();
        this.showAlert('Users refreshed successfully!', 'success');
    }

    populateRoleSelect() {
        const roleSelect = document.getElementById('roleSelect');
        if (roleSelect && this.roles.length > 0) {
            roleSelect.innerHTML = '';
            this.roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id;
                option.textContent = role.name === 'ROLE_ADMIN' ? 'ADMIN' : 'USER';
                roleSelect.appendChild(option);
            });
        }
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

// Initialize admin manager when DOM is loaded
let adminManager;
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminManager();
}); 