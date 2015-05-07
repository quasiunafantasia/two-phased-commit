var pg = require("pg-promise")(),
Q  = require("q"),
CN = "postgres://postgres:root@localhost:5432/lab2";
var db = pg(CN);

db.tx(function(transaction){
  return transaction.query("insert into planes values ($1, $2)", [1, 1])
  .then(function() {
    return transaction.query("prepare foo AS insert into hotels values (1, 1)");
  })
  .then(function() {
     console.log('success');
     return transaction.one('COMMIT PREPARED foo');

  }, function(reason) {
   console.error('err');
    console.log(reason);
   return transaction.one('ROOLBACK PREPARED foo')
});
});
