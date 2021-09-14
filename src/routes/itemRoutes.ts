import {ItemController} from "../controller/ItemController";

export const ItemRoutes =[
  {
    method: "get",
    route: "/item",
    controller: ItemController,
    action: "all"
  }, {
    method: "get",
    route: "/item/:id",
    controller: ItemController,
    action: "one"
  }, {
    method: "post",
    route: "/item",
    controller: ItemController,
    action: "save"
  }, {
    method: "delete",
    route: "/item/:id",
    controller: ItemController,
    action: "remove"
  }
]
