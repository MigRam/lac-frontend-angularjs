package ka3

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration

//Add these imports
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.security.SecurityFilterAutoConfiguration
//Add this autoconfiguration to INSTALL SAML
@EnableAutoConfiguration(exclude = [SecurityFilterAutoConfiguration])

class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        GrailsApp.run(Application, args)
    }
}