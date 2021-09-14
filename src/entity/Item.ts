
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import {OrderItem} from "./OrderItem"
@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name!: string
  @Column()
  price!: number

  @OneToMany(()=>OrderItem,orderitem=>orderitem.item)
  items:OrderItem[]

}
