import { useAuthStore } from '../store/auth';
const handleBeforeEnter = (to:any, from:any, next:any) => {
	const authStore = useAuthStore();

	if (authStore.isAuthenticated) {
		next();
	} else {
		next('/login');
	}
};

const admin=[
    {
        beforeEnter: handleBeforeEnter,
        path:"/admin",
        component:()=>import("../views/admin/admin.vue"),
        children:[
            {
                path:"users",
                name:"admin-users",
                component:()=>import("../views/admin/components/user/index.vue")
            }
        ]
    }
]
export default admin;