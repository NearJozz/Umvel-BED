import {UserRoutes} from "./UserRoutes"
import {OrderRoutes} from "./OrderRoutes"
import{ItemRoutes} from "./ItemRoutes"

export default [
  ...UserRoutes,
  ...OrderRoutes,
  ...ItemRoutes
]
