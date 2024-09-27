
import { useAuthStore } from '../store/auth';
const handleBeforeEnter = (to:any, from:any, next:any) => {
	const authStore = useAuthStore();

	if (authStore.isAuthenticated) {
        console.log(authStore.isAuthenticated)
		next();
	} else {
		next('/login');
	}
};
const artist=[
    {
        beforeEnter: handleBeforeEnter,
        path:"/artist",
        component:()=>import("../views/artist/index.vue"),
        // children:[
        //     {
        //         path:"users",
        //         name:"admin-users",
        //         component:()=>import("../views/admin/components/user/index.vue")
        //     }
        // ]
    }
]
export default artist;