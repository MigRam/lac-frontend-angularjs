// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'com.local.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'com.local.UserRole'
grails.plugin.springsecurity.authority.className = 'com.local.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
        [pattern: '/', access: ['permitAll']],
        [pattern: '/error', access: ['permitAll']],
        [pattern: '/index', access: ['permitAll']],
        [pattern: '/services', access: ['permitAll']],
        [pattern: '/docs/**', access: ['permitAll']],
        [pattern: '/resource/**', access: ['permitAll']],
        [pattern: '/index.gsp', access: ['permitAll']],
        [pattern: '/shutdown', access: ['permitAll']],
        [pattern: '/assets/**', access: ['permitAll']],
        [pattern: '/**/js/**', access: ['permitAll']],
        [pattern: '/**/css/**', access: ['permitAll']],
        [pattern: '/**/images/**', access: ['permitAll']],
        [pattern: '/**/favicon.ico', access: ['permitAll']],
        [pattern: '/collection/**', access: ['permitAll']],
        [pattern: '/bundle/**', access: ['permitAll']],
        [pattern: '/deposit/**', access: ['permitAll']],
        [pattern: '/login/**', access: ['permitAll']],
        [pattern: '/user/**', access: ['permitAll']],
        [pattern: '/datenschutz', access: ['permitAll']],
        [pattern: '/saml/**', access: ['permitAll']],
        [pattern: '/sitemap', access: ['permitAll']],
        [pattern: '/robots', access: ['permitAll']],
        [pattern: '/metrics', access: ['permitAll']],
        [pattern: '/trace', access: ['permitAll']],
        [pattern: '/health', access: ['permitAll']],
        [pattern: '/info', access: ['permitAll']],
]

grails.plugin.springsecurity.filterChain.chainMap = [
        [pattern: '/assets/**', filters: 'none'],
        [pattern: '/docs/**', filters: 'none'],
        [pattern: '/resource/**', filters: 'none'],
        [pattern: '/bundle/**', filters: 'none'],
        [pattern: '/collection/**', filters: 'none'],
        [pattern: '/**/js/**', filters: 'none'],
        [pattern: '/**/css/**', filters: 'none'],
        [pattern: '/**/images/**', filters: 'none'],
        [pattern: '/**/favicon.ico', filters: 'none'],
        [pattern: '/**', filters: 'JOINED_FILTERS']
]

//Add this external config
//storeFile, storePass, passwords and defaultKey on auth file
//SAML configuration on conf file
grails.config.locations = [
        "classpath:auth-saml.groovy",
        "file:///etc/opt/grails/ka3-saml.groovy",
        "~/.grails/auth-saml.groovy",
        "~/.grails/auth-samlTEST.groovy",
        "api5_config.yml", // local configuration to enable seperate config-file "api5_config.yml" with API5 endpoints
        "file:///etc/opt/grails/ka3-fe.groovy"
]

//Add samlAuthenticationprovider to providerNames (if other configured)
grails.plugin.springsecurity.providerNames = ['samlAuthenticationProvider', 'daoAuthenticationProvider']
//Override login form URL
grails.plugin.springsecurity.auth.loginFormUrl = '/samlLogin'
//Override after logout URL
grails.plugin.springsecurity.logout.afterLogoutUrl = '/samlLogout'
