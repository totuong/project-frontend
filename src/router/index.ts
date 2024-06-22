import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin';
import artist from './artist';
import { useAuthStore } from '../store/auth';
import NotFoundView from "@/views/NotFoundView.vue";

export const APP_ROUTES = {
    ADMIN: {
        accountsPage: 'accountsPage',
        profile: 'profileAdmin',
    },
    AUTH: {
        LOGIN: 'login',
    },
    ARTIST: {
        profile: 'profileArtist',
    },
    USER: {
        profile: 'profileUser',
    },
};

export const layouts = {
    ADMIN: 'admin',
    RECRUITER: 'recruiter',
    USER: 'recruiter',
    AUTH: 'auth',
};

const handleBeforeEnter = (to, from, next) => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
        next();
    } else {
        next('/login');
    }
};

const handleBeforeEnterAuth = (to, from, next) => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
        next('/');
    } else {
        next();
    }
};

const routes = [
    {
        path: '/',
        component: () => import("../views/login/index.vue"),
        beforeEnter: (to, from, next) => {
            next('/login');
        },
    },
    {
        path: '/auth',
        component: () => import("../views/login/index.vue"),
        beforeEnter: handleBeforeEnterAuth,
        children: [
            {
                path: '/login',
                name: APP_ROUTES.AUTH.LOGIN,
                component: () => import("../views/login/index.vue"),
            }
        ],
    },
    ...admin,
    ...artist,
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
