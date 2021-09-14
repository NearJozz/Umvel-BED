import {UserController} from "./controller/UserController"

const UserInst=new UserController();
test(`Obtener Usuarios en DB `,()=>{
  expect(UserInst.all()).toBe()
})
