var _ = require('underscore');
var math = require('./math.js')
var qb = {Roethlisberger: {salary: 8600, team: 'Steelers'}, Wentz: {salary: 7500, team: 'Eagles'}, Carr: {salary: 8100, team: 'Raiders'}}
var rb = {West: {salary: 6400, team: 'Ravens'}, Washington: {salary: 4700, team: 'Raiders'}, Howard: {salary: 7200, team: 'Bears'}, Anderson: {salary: 8000, team: 'Broncos'}}
var wr = {Shepard: {salary: 6900, team: 'Giants'}, Benjamin: {salary: 6500, team: 'Chargers'}, Crabtree: {salary: 6900, team: 'Raiders'}, Cooper: {salary: 7200, team: 'Raiders'}, Coates: {salary: 5300, team: 'Steelers'}, Brown: {salary: 9600, team: 'Steelers'}, Benjamin: {salary: 6500, team: 'Chargers'}}
var te = {Rudolph: {salary: 5500, team: 'Vikings'}, Ertz: {salary: 5600, team: 'Eagles'}, Uzomah: {salary: 5100, team: 'Bengals'}}
var def = {Bills: {salary: 4600, team: 'Bills'}}
var ki = {Crosby: {salary: 4500, team: 'Packers'}}
var budget = 60000
var opponents = [['Packers', 'Giants'], ['Vikings', 'Texans'], ['Chargers', 'Raiders'],['Broncos', 'Falcons'],['Steelers', 'Jets'],['Bengals', 'Cowboys'],['Redskins', 'Ravens'],['Bills', 'Rams'],['Bears', 'Colts'],['Eagles', 'Lions']]
var teams = []
var teamCheck = []

for (q in qb) {
  for (r1 in rb) {
    for(r2 in _.omit(rb, r1)) {
      for (w1 in wr) {
        for (w2 in _.omit(wr, w1)) {
          for (w3 in _.omit(wr, w1, w2)) {
            for (t in te) {
              for (d in def) {
                for (k in ki) {
                  var team = [qb[q],rb[r1],rb[r2],wr[w1],wr[w2],wr[w3],te[t],ki[k],def[d]]
                  // if total salary is within budget
                  if ( math.sum(_.pluck(team, 'salary')) <= budget && math.sum(_.pluck(team, 'salary')) >= budget - 2000) {
                    // if no more than 4 players from the same team // uncomment for low game touraments
                     // if(Math.max.apply( Math, _.map(_.groupBy(team, 'team'), function(g) {return g.length})) < 5) {
                      // if at least 1 catching player is on the same team as qb
                      if(_.contains(_.pluck([wr[w1],wr[w2],wr[w3],te[t]], 'team'), qb[q].team)) {
                        // if no more than 1 non-QB/DEF player per team // uncomment for high game touraments
                        if(_.uniq(_.pluck([rb[r1],rb[r2],wr[w1],wr[w2],wr[w3],te[t]], 'team')).length == _.pluck([rb[r1],rb[r2],wr[w1],wr[w2],wr[w3],te[t]], 'team').length) {
                          // if no players are opposing the defense
                          if(!(_.contains(_.pluck(_.without(team, def[d]), 'team'), _.without(_.flatten(_.filter(opponents, function(i) {return _.contains(i, d)})), d)[0]))) {
                            // if team was not already generated
                            if(!(_.contains(teamCheck, [q, r1, r2, w1, w2, w3, t, d, k].sort().join()))) {
                              teams.push([q, r1, r2, w1, w2, w3, t, d, k])
                              teamCheck.push([q, r1, r2, w1, w2, w3, t, d, k].sort().join())
                            }
                          }
                        }
                      } // uncomment for high game touraments
//                   } // uncomment for low game touraments
                  } 
                }
              }
            }
          }
        }
      }
    }
  }
};

console.log(teams.length + ' teams generated.')
for(t in teams) {
  console.log((parseInt(t) + 1) + ') ' + teams[t].join())
}

