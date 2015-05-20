var pg = require("pg"),
q  = require("q"),
HOTELS = "postgres://postgres:root@localhost:5432/hotels"
PLANES = "postgres://postgres:root@localhost:5432/planes1";


var planes = new pg.Client(PLANES),
  hotels = new pg.Client(HOTELS);
planes.connect();
hotels.connect();

var planesDefer = q.nfcall(planes.query.bind(planes, 'begin'))
.then(function() {
  return q.nfcall(planes.query.bind(planes, 'insert into planes values (1, 1)'));
})
.then(function() {
  console.log('preparing planes');

  return q.nfcall(planes.query.bind(planes, 'prepare transaction \'planes\''))
});

var hotelsDefer = q.nfcall(hotels.query.bind(hotels, 'begin'))
.then(function() {
  console.log('started hotels');
  return q.nfcall(hotels.query.bind(hotels, 'insert into hotels values (1, 1)'));
})
.then(function() {
  console.log('preparing hotels');
  return q.nfcall(hotels.query.bind(hotels, 'prepare transaction \'hotels\''))
});

q.all([planesDefer, hotelsDefer])
.then(function() {
  console.log('all');
  return q.all([
    q.nfcall(hotels.query.bind(hotels, 'commit prepared \'hotels\'')),
    q.nfcall(planes.query.bind(planes, 'commit prepared \'planes\''))
    ]);
}, function(err) {
  console.log('all err', err);
   hotels.query('rollback prepared \'hotels\'');
   planes.query('rollback prepared \'planes\'');
})
.done(function() {
  console.log('done');
  hotels.end();
  planes.end();
}, function() {
 console.log('err');
  hotels.end();
  planes.end();
});
