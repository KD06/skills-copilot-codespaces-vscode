# 🎯 Todo List Application

A beautiful, feature-rich todo list application with a modern UI, built with vanilla HTML, CSS, and JavaScript.

![Todo App](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Quickly add new tasks with an intuitive input field
- ✅ **Complete Tasks** - Mark tasks as complete with a satisfying checkbox interaction
- ✅ **Edit Tasks** - Edit existing tasks inline with save/cancel options
- ✅ **Delete Tasks** - Remove tasks individually with smooth animations
- ✅ **Filter Tasks** - View all, active, or completed tasks with one click
- ✅ **Clear Completed** - Bulk delete all completed tasks at once

### Rich UI Elements
- 🎨 **Modern Design** - Beautiful gradient background and card-based layout
- 📊 **Live Statistics** - Real-time counter for total, active, and completed tasks
- 🎭 **Smooth Animations** - Delightful animations for all interactions
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 💾 **Local Storage** - Automatically saves your tasks in the browser
- 🌈 **Visual Feedback** - Color-coded states and hover effects

### User Experience
- ⌨️ **Keyboard Shortcuts** - Press Enter to add tasks, Escape to cancel editing
- 🎪 **Empty States** - Friendly messages when no tasks are present
- 🔔 **Confirmation Dialogs** - Prevent accidental deletion of completed tasks
- 🎯 **Focus Management** - Auto-focus on input fields for seamless workflow

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KD06/skills-copilot-codespaces-vscode.git
cd skills-copilot-codespaces-vscode
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply double-click the `index.html` file in your file explorer!

### Using with a Local Server

For the best experience, serve the files with a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📖 Usage Guide

### Adding Tasks
1. Type your task in the "What needs to be done?" input field
2. Click the "Add Task" button or press Enter
3. Your task appears at the top of the list

### Managing Tasks
- **Complete a task**: Click the checkbox next to the task
- **Edit a task**: Click the "Edit" button, modify the text, and click "Save"
- **Delete a task**: Click the "Delete" button (task will animate out)
- **Cancel editing**: Click "Cancel" or press Escape while editing

### Filtering Tasks
- **All**: View all tasks (default)
- **Active**: View only incomplete tasks
- **Completed**: View only completed tasks

### Clearing Completed Tasks
Click the "Clear Completed" button to remove all completed tasks at once. You'll be asked to confirm this action.

## 🏗️ Project Structure

```
skills-copilot-codespaces-vscode/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js             # Application logic and functionality
└── README.md          # Project documentation
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Indigo (#6366f1) - Main accent color
- **Success**: Emerald (#10b981) - Completed tasks
- **Danger**: Red (#ef4444) - Delete actions
- **Warning**: Amber (#f59e0b) - Edit actions

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

### Responsive Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🔧 Technical Details

### Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Opera: Latest 2 versions

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations, Custom Properties
- **JavaScript ES6+**: Classes, Arrow Functions, Template Literals
- **Local Storage API**: Data persistence

### Key Features Implementation
- **OOP Architecture**: Clean class-based structure
- **Event Delegation**: Efficient event handling
- **XSS Prevention**: HTML escaping for user input
- **Smooth Animations**: CSS transitions and keyframe animations
- **Accessibility**: Semantic HTML and proper ARIA attributes

## 🎯 Future Enhancements

Potential features for future versions:
- 🗓️ Due dates and reminders
- 🏷️ Task categories/tags
- 🔍 Search functionality
- 📤 Import/Export tasks
- 🌙 Dark mode toggle
- ☁️ Cloud sync
- 👥 Multiple lists/boards
- 📊 Productivity statistics

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👏 Acknowledgments

- Designed with ❤️ for productivity enthusiasts
- Icons: Emoji (native)
- Fonts: Google Fonts (Poppins)
- Inspiration: Modern todo apps and productivity tools

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for productivity**
