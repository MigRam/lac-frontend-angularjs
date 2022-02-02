package ka3

class UrlMappings {

    static mappings = {

        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")


        "/"(view: '/index')
        "/bundle/$prefix/$identifier"(controller: 'Application', action: 'resource')
        "/collection/$prefix/$identifier"(controller: 'Application', action: 'resource')
        "/resource/$prefix/$identifier"(controller: 'Application', action: 'resource')
        "/docs/**"(view: '/index')
        "/services"(view:'/index')
        "/elan-player"(view:'/index')
        "/deposit"(view:'/index')
        "/admin"(view:'/index')
        "/user"(view:'/index')
        "/login"(view:'/index')
        "/logout"(view:'/index')
        "/impressum"(view: '/index')
        "/sitemap.xml"(view: '/sitemap')
        "/robots.txt" (view: "/robots")
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
