import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login/Login.vue"
import Home from "../components/Home/Home.vue"
import Middle from "../components/Home/Middle.vue"
import UserList from "../components/Admin/UserList.vue"
import Register from "../components/Register/Register.vue"
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: "Login",
    component: Login

  },
  {
    path: '/home',
    name: "Home",
    component: Home,
    redirect: '/middle',
    children: [
      {
        path: '/middle',
        component: Middle,
      },
      {
        path: '/user',
        component: UserList,
      }
    ]
  },
  {
    path: '/register',
    name: "Register",
    component: Register,
  }
]

const router = new VueRouter({
  routes
})

// 挂在路由导航守卫,
// router.beforeEach((to, from, next) => {
//   // to: 将要访问
//   // from：从哪访问
//   // next:接着干的事 
//   if (to.path == '/login') return next();
//   const userFlag = window.sessionStorage.getItem("userQuery"); //取出当前用户
//   if (!userFlag) {
//     return next('/login');
//   } else {
//     return next();
//   }

// })

export default router
