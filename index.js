var pg = require("pg-promise")(),
Q  = require("q"),
CN = "postgres://postgres:root@localhost:5432/lab2";
var db = pg(CN);
() {
     console.log('success');
     return transaction.one('COMMIT PREPARED foo');

  }, function(reason) {
   console.error('err');
    console.log(reason);
   return transaction.one('ROOLBACK PREPARED foo')
});
});
