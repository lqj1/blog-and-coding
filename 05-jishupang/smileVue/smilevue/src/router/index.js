import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import ShoppingMall from "@/components/pages/ShoppingMall";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "HelloWorld",
    //   component: HelloWorld
    // },
    {
      path: "/",
      name: "ShoppingMall",
      component: ShoppingMall
    }
  ]
});
