const artist=[
    {
        path:"/artist",
        component:()=>import("../views/login/index.vue"),
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