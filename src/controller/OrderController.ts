import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Order} from "../entity/Order";
import {OrderItem} from "../entity/OrderItem"
import {Item} from "../entity/Item"

export class OrderController {

    private orderRepository = getRepository(Order);
    private orderItemRepository = getRepository(OrderItem);
    private itemRepository = getRepository(Item);
    async all(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find({relations:["orderItems"]});
    }

    async one(request: Request, response: Response, next: NextFunction) {
      try{
        let resp=await this.orderRepository.findOne({where:{id:request.params.id},relations:["orderItems"]});
        if(resp==undefined) response.status(204).send();
        return resp
      }catch(Ex){
        response.code(500).send(Ex.message)
      }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try{
            let res=await this.orderRepository.save(request.body);
            return res;
        }catch(Ex){
          response.code(500).send(Ex.message)
        }
    }

    async addItems(request:Request,response:Response,next:NextFunction){
      try{
        // console.log("addItemsParams",request.body.id,request.body.items);

        let order=await this.orderRepository.findOne(request.body.id,{relations:["orderItems"]});
        let items=await this.itemRepository.findByIds(request.body.items);
        let ordItem=[];
        let subtotal=0;
        for(let i in items){
          ordItem[i]=new OrderItem();
          ordItem[i].order=order;
          ordItem[i].item=items[i];
          subtotal+=items[i].price;
        }
        for(let i in order.orderItems){
          subtotal+=order.orderItems[i].item.price;
        }
        console.log(ordItem);
        order.total=subtotal;
        order.subtotal=subtotal;
        order.total_items=items.length+order.orderItems.length;
        // order.orderItems=[...order.orderItems,...ordItem];
        await this.orderRepository.save(order);
        let resp =   await this.orderItemRepository.save(ordItem);
        return resp;

      }catch(Ex){
        console.log(Ex);

      }
    }

    async setStatus(request:Request,response:Response,next:NextFunction){
      if(request.body.status=="pendiente" || request.body.status=="cerrado"){
        let order= await this.orderRepository.findOne(request.body.id);
        if(order==undefined)response.status(204).send()
        order.status=request.body.status;
        let res=await this.orderRepository.save(order);
        return res;
      }else{
        response.status(400).send("Estatus desconocido")
      }
    }

    async logicRemove(request:Request,response:Response,next:NextFunction){
      try{
        let res=await this.orderRepository.findOne(request.body.id)
        if(res==undefined)response.status(204).send()
        res.status="borrado"
        return  await this.orderRepository.save(res)
      }catch(Ex){
        response.code(500).send(Ex.message)
      }
    }

    async bajas(request:Request,response:Response,next:NextFunction){
      try{
        // console.log("bajas");
        let repo= await this.orderRepository.find({where:{status:"borrado"},relations:["orderItems"]});
        console.log(repo);
        return repo;
      }catch(Ex){
        response.code(500).send(Ex.message)
      }
    }

}
