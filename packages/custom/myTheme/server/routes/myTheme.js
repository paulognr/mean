'use strict';

var mean = require('meanio');

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(MyTheme, app, auth, database) {

    app.route('/api/hunter/menu/:name')
        .get(function(req, res) {
            var roles = req.user ? JSON.parse(JSON.stringify(req.acl.user.allowed)) : ['anonymous'],
                userRoles = req.user ? req.user.roles : ['anonymous'],
                menu = req.params.name,
                defaultMenu = req.query.defaultMenu || [],
                itemsRes = [],
                tmpMenu;

            var items = MyTheme.menus.get({
                roles: userRoles,
                menu: menu,
                defaultMenu: defaultMenu.map(function(item) {
                    return JSON.parse(item);
                })
            });

            items.forEach(function(item) {
                item.roles.forEach(function(menuRole){
                    if(userHasRole(menuRole)){
                        itemsRes.push(item);
                    }
                });
            });

            function userHasRole(userRole) {
                var hasRole = false;
                for (var i in userRoles) {
                    if (userRole === userRoles[i]) {
                        hasRole = true;
                        break;
                    }
                }

                return hasRole;
            }

            res.json(itemsRes);

        });
};
