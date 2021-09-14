import {OrderController} from "../controller/OrderController"

export const OrderRoutes = [
  {
    method:"get",
    route:"/orders",
    controller:OrderController,
    action:"all"
  }, {
    method:"get",
    route:"/orders/:id",
    controller:OrderController,
    action:"one"
  },
   {
    method:"post",
    route:"/orders",
    controller:OrderController,
    action:"save"
}, {
    method:"post",
    route:"/orders/addItems",
    controller:OrderController,
    action:"addItems"
},{
  method:"post",
  route:"/orders/setStatus",
  controller:OrderController,
  action:"setStatus"
},
{
  method:"delete",
  route:"/orders/baja/:id",
  controller:OrderController,
  action:"logicRemove"
},{
  method:"get",
  route:"/ordersDel",
  controller:OrderController,
  action:"bajas"
}

];
