// Todo Application - Main JavaScript File
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingId = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    // Initialize DOM elements
    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.totalTodosEl = document.getElementById('totalTodos');
        this.activeTodosEl = document.getElementById('activeTodos');
        this.completedTodosEl = document.getElementById('completedTodos');
    }

    // Attach event listeners
    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.closest('.filter-btn').dataset.filter));
        });

        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    }

    // Load todos from localStorage
    loadTodos() {
        const todosJson = localStorage.getItem('todos');
        return todosJson ? JSON.parse(todosJson) : [];
    }

    // Save todos to localStorage
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // Add a new todo
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) {
            this.showInputError();
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
        this.showSuccessAnimation();
    }

    // Toggle todo completion
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    // Delete a todo
    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.add('removing');
            setTimeout(() => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    // Start editing a todo
    startEdit(id) {
        this.editingId = id;
        this.render();
    }

    // Save edited todo
    saveEdit(id, newText) {
        const text = newText.trim();
        if (!text) {
            this.deleteTodo(id);
            return;
        }

        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.text = text;
            this.editingId = null;
            this.saveTodos();
            this.render();
        }
    }

    // Cancel editing
    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    // Clear completed todos
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) return;

        if (confirm(`Are you sure you want to delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    // Get filtered todos
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    // Update statistics
    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        this.animateNumber(this.totalTodosEl, total);
        this.animateNumber(this.activeTodosEl, active);
        this.animateNumber(this.completedTodosEl, completed);
    }

    // Animate number change
    animateNumber(element, targetValue) {
        const currentValue = parseInt(element.textContent) || 0;
        if (currentValue === targetValue) return;

        const duration = 300;
        const steps = 10;
        const stepValue = (targetValue - currentValue) / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
                element.textContent = targetValue;
                clearInterval(interval);
            } else {
                element.textContent = Math.round(currentValue + stepValue * currentStep);
            }
        }, duration / steps);
    }

    // Show input error animation
    showInputError() {
        this.todoInput.style.borderColor = 'var(--danger-color)';
        this.todoInput.classList.add('shake');
        setTimeout(() => {
            this.todoInput.style.borderColor = '';
            this.todoInput.classList.remove('shake');
        }, 500);
    }

    // Show success animation
    showSuccessAnimation() {
        this.addBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.addBtn.style.transform = '';
        }, 100);
    }

    // Create todo item HTML
    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        if (this.editingId === todo.id) {
            // Edit mode
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <div class="todo-text-wrapper">
                    <input type="text" class="todo-input-edit" value="${this.escapeHtml(todo.text)}" autofocus>
                </div>
                <div class="todo-actions" style="opacity: 1;">
                    <button class="todo-btn save-btn" data-action="save">💾 Save</button>
                    <button class="todo-btn cancel-btn" data-action="cancel">✖️ Cancel</button>
                </div>
            `;

            const input = li.querySelector('.todo-input-edit');
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.saveEdit(todo.id, input.value);
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.cancelEdit();
            });
        } else {
            // Display mode
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <div class="todo-text-wrapper">
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                </div>
                <div class="todo-actions">
                    <button class="todo-btn edit-btn" data-action="edit">✏️ Edit</button>
                    <button class="todo-btn delete-btn" data-action="delete">🗑️ Delete</button>
                </div>
            `;
        }

        // Attach event listeners
        const checkbox = li.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

        const actionButtons = li.querySelectorAll('[data-action]');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('[data-action]').dataset.action;
                switch (action) {
                    case 'edit':
                        this.startEdit(todo.id);
                        break;
                    case 'delete':
                        this.deleteTodo(todo.id);
                        break;
                    case 'save':
                        const input = li.querySelector('.todo-input-edit');
                        this.saveEdit(todo.id, input.value);
                        break;
                    case 'cancel':
                        this.cancelEdit();
                        break;
                }
            });
        });

        return li;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Render the todo list
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        // Clear the list
        this.todoList.innerHTML = '';

        // Show/hide empty state
        if (filteredTodos.length === 0) {
            this.emptyState.classList.remove('hidden');
            if (this.currentFilter === 'active') {
                this.emptyState.querySelector('h3').textContent = 'No active tasks!';
                this.emptyState.querySelector('p').textContent = 'All tasks are completed 🎉';
            } else if (this.currentFilter === 'completed') {
                this.emptyState.querySelector('h3').textContent = 'No completed tasks!';
                this.emptyState.querySelector('p').textContent = 'Complete some tasks to see them here';
            } else {
                this.emptyState.querySelector('h3').textContent = 'No tasks yet!';
                this.emptyState.querySelector('p').textContent = 'Add your first task to get started';
            }
        } else {
            this.emptyState.classList.add('hidden');
            
            // Render todos
            filteredTodos.forEach(todo => {
                const todoElement = this.createTodoElement(todo);
                this.todoList.appendChild(todoElement);
            });
        }

        // Update statistics
        this.updateStats();
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Show a welcome message in console
console.log('%c🎯 Todo App Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cStay organized and productive! 💪', 'color: #10b981; font-size: 14px;');
