import mysql from "mysql2/promise";
import pkg from 'sequelize'

const {Sequelize, QueryTypes} = pkg

async function connect() {
  if (global.sequelize && global.sequelize.state !== "disconnected")
     return global.sequelize;
     
  const sequelize = new Sequelize('mysql://root:root@localhost:3306/ecommerce')
  console.log('db connected');
  return sequelize
}

async function createSession(data) {
  const conn = await connect();
  const sql = 'insert into session(ses_data) values ("?");';
  const values = [data];
  console.log(values);
  await conn.query(sql, values);
}

async function getSession(data) {
  const conn = await connect();
  const users = await conn.query("SELECT IF( EXISTS( SELECT cst_customer FROM `customer` inner join `session` on ses_customer = cst_customer WHERE cst_name = '"+ data +"'), 1, 0) AS exist, (SELECT cst_customer FROM `customer` WHERE cst_name = '"+ data +"') AS id, ( SELECT ses_islogged FROM `customer` inner join `session` on ses_customer = cst_customer WHERE cst_name = '"+ data +"' ) AS status, ( SELECT cst_name FROM `customer` inner join `session` on ses_customer = cst_customer WHERE cst_name = '"+ data +"' ) AS instance", { type: conn.QueryTypes.SELECT})
  return users
}

async function getSessionNames() {
  const conn = await connect();
  const users = await conn.query("SELECT cst_name FROM `customer`", { type: conn.QueryTypes.SELECT})
  return users
}

async function setStateSession(name, status) {
  const conn = await connect();
  const users = await getSession(name)
  
  if ( users[0].exist === 0 ) {
    const res = await conn.query("insert into session (ses_customer, ses_islogged) values ("+ users[0].id +", "+ status +");")
    return res
  } 
  else {
    const res = await conn.query("update session set ses_islogged = "+ status +" where ses_customer = "+ users[0].id +";")
    return res
  }
}

export { connect, createSession, getSession, getSessionNames, setStateSession };
