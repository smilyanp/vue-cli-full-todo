import App from './App';
import LandingPage from './components/marketing/LandingPage';
import About from './components/marketing/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import TestTodosVariable from './components/TestTodosVariable';

// Routes
const routes = [
    { 
        path: '/', 
        component: LandingPage,
        name: 'home'
    },
    { 
        path: '/about', 
        component: About,
        name: 'about'
    },
    { 
        path: '/login', 
        component: Login,
        name: 'login'
    },
    { 
        path: '/register', 
        component: Register,
        name: 'register'
    },
    { 
        path: '/todos/:id', 
        component: TestTodosVariable,
        name: 'todos'
    },
];

export default routes;