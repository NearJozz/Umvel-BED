import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import Routes from "./routes/index";

const readline = require('readline');
import {User} from "./entity/User";
import {Order} from "./entity/Order";
import {OrderItem} from "./entity/OrderItem";
import {Item} from "./entity/Item";


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
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });


    app.listen(3000);
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
