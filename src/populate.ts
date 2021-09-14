
import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import {Item} from "./entity/Item";
import {User} from "./entity/User";
import {Order} from "./entity/Order";
import {OrderItem} from "./entity/OrderItem";
const readline = require('readline');



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function populate(){
  let items=[]
  for(let i=0;i<100;i++){
    items.push(
      {name:`Item ${i+1}`,price:Math.floor(Math.random()*150)}
    )
  }

  return {
    items:items
  }
}
const UsersDef=[
  {name:"UserDemo01"},
  {name:"UserDemo02"},
  {name:"UserDemo03"},
]
const OrdersDef=[
{
  subtotal:0,
  vat:0,
  total:0,
  token:Buffer.from(Math.floor(Math.random()*100000).toString()).toString("base64"),
  total_items:0,
  customer_name:"customer01"
},
{
  subtotal:0,
  vat:0,
  total:0,
  token:Buffer.from(Math.floor(Math.random()*100000).toString()).toString("base64"),
  total_items:0,
  customer_name:"customer02"
},
{
  subtotal:0,
  vat:0,
  total:0,
  token:Buffer.from(Math.floor(Math.random()*100000).toString()).toString("base64"),
  total_items:0,
  customer_name:"customer03"
},
]
const OrderItemsDef=[
  Math.floor(Math.random()*100),
  Math.floor(Math.random()*100),
  Math.floor(Math.random()*100)
]
createConnection().then(async connection => {
  let repoItem=getRepository(Item)
  let repoUser=getRepository(User)
  let repoOrder=getRepository(Order)
  let repoOrderItem=getRepository(OrderItem)
  await connection.synchronize();
    try{
      const dataIn=populate();
      let respItems=await repoItem.save(dataIn.items)
      console.log(`Se agregaron registros para Item : ${respItems.length} elementos`);
      let respUsers=await repoUser.save(UsersDef)
      console.log(`Se agregaron los Usuarios Demo : ${respUsers.length}`);
      let respOrders=await repoOrder.save(OrdersDef)
      console.log(`Se agegaron registors para Order : ${respOrders.length}`);

      askCreateOrder(repoItem,repoUser,repoOrder,repoOrderItem);
    }catch(Ex){
      console.log(`Error al poblar la informacion de prueba,
        la base de datos esta inicializada?
        `);
      console.log("Exception :",Ex.message);
      console.log("Salir: ctrl+c");
      rl.close();
      console.log("Salir: ctrl+c");

    }

}).catch((Ex)=>{console.log(Ex);
})
function askCreateOrder(repoItem,repoUser,repoOrder,repoOrderItem){
  try{
    rl.question('Quieres asignar productos a una Orden? y/n :', async (answer) => {
      if(answer=="y"){
        let arr=[];
        let itemInst=await repoItem.findByIds(OrderItemsDef);
        let orderInst=await repoOrder.findByIds([1]);
        console.log(orderInst);
        for(let i in OrderItemsDef){
          let tmp=new OrderItem();
          tmp.item= itemInst[i];
          tmp.order= orderInst[0];
          arr.push(tmp)
        }
        let resp= await repoOrderItem.save(arr)
        console.log(`Se agregaron datos prueba en la tabla OrderItems :${resp}`);
        console.log(`A partir de este momento, se puede levantar el servicio Express.
        $ npm start`)
        rl.close();
        console.log("Salir: ctrl+c");
      }else if(answer=="n"){
        console.log(`Por ahora eso es todo.
          A partir de este momento, se puede levantar el servicio Express.
          $ npm start
          `)
          rl.close();
          console.log("Salir: ctrl+c");
      }else{
        console.log("Respuesta desconocida... ");
        rl.close();
        askCreateOrder(repoItem,repoUser,repoOrder,repoOrderItem);
      }
    });
  }catch(Ex){
    console.log(`Error al asignar productos en orden,
      esta sincronizada la DB???
       `);
    console.log("Exception: ",Ex.message);
    rl.close();
    console.log("Salir: ctrl+c");
  }
}
