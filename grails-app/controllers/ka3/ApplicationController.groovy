package ka3

import grails.core.GrailsApplication
import grails.util.Environment
import grails.plugins.*
import groovy.xml.*

class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager

    def index() {
        [grailsApplication: grailsApplication, pluginManager: pluginManager]
    }

    def resource() {
        def contentType = request.getHeader("Accept")
        if(contentType.contains("application/x-cmdi+xml")){
            // def endpoint = grailsApplication.config.getProperty('mediapi.endpoint')
            def endpoint = "https://grails-dev.rrz.uni-koeln.de/ka3-a5-core/api/media/lac2"
            def uri = "/hdl:$params.prefix/$params.identifier"
            def url = new URL(endpoint + uri)
            render url.text, contentType: "application/x-cmdi+xml"
        } else {
            render view: '/index.gsp', model: [grailsApplication: grailsApplication, pluginManager: pluginManager]
        }
    }
}