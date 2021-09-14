import { BaseEntity, Column, Entity, PrimaryGeneratedColumn ,JoinColumn,ManyToOne,OneToOne} from "typeorm";
import {Item} from "./Item";
import {Order} from "./Order";

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  //@Column()
  //orderId:number
  @ManyToOne(type => Order, order => order.orderItems,{cascade:true})
  //@JoinColumn()
  order!: Order

  //@Column({default:1})
  //itemId:number
  @ManyToOne(type => Item,item=>item.items,{cascade:true,eager:true})
//  @JoinColumn()
  item!: Item
}
