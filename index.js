var pg = require("pg-promise")(),
Q  = require("q"),
CN = "postgres://postgres:root@localhost:5432/lab2";
var db = pg(CN);

db.tx(function(transaction){
  var q1 = transaction.query("insert into planes values ($1, $2)", [1, 1]);
  var q2 = transaction.query("insert into hotels values ($1, $2)", [1, 1]);
  //return Q.all([q1, q2]);
  throw new err('asd');
})
.then(function(data) {
  console.log("success");
})
.done(null, function(reason) {
  console.error('err');
  console.log(reason);
});
