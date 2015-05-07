var pg = require("pg-promise")(),
Q  = require("q"),
CN = "postgres://postgres:root@localhost:5432/lab2";
var db = pg(CN);

db.tx(function(transaction){
  return transaction.query("insert into planes values ($1, $2)", [1, 1])
  .then(function() {

