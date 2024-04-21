const admin=[
    {
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