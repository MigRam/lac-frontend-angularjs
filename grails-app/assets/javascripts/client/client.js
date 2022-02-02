//= wrapped

// lac client
//= require /client/client.core
//= require /client/client.routes
//= require /client/discovery/client.discovery
//= require /client/services/client.services
//= require /client/deposit/client.deposit
//= require /client/guides/client.guides
//= require /client/shared/client.shared
//= require /client/admin/client.admin
//= require /client/user/client.user
//= require /client/elanplayer/client.elanplayer

angular
    .module("client", [
        "client.core",
        "client.routes",
        "client.discovery",
        "client.services",
        "client.deposit",
        "client.guides",
        "client.shared",
        "client.admin",
        "client.user",
        "client.elanplayer"
    ]);