//= wrapped

angular
  .module("client.shared")
  .service("authService", authService);

authService.$inject = ['$state', "$location", "$rootScope", "$localStorage", "$log", "$http"];

function authService($state, $location, $rootScope, $localStorage, $log, $http) {

  var credentials = {};
  var accessToken;
  var idToken;
  var expiresAt;

  $localStorage.auth = credentials;
  $rootScope.auth =  $localStorage.auth;

  function getIdToken() {
    $log.info(credentials['id_token']);
    return idToken = credentials['id_token'];
  }

  function getAccessToken() {
    $log.info(credentials['access_token']);
    return accessToken = credentials['access_token'];
  }

  function login() {

    var auth = {
      authUrl: "https://orcid.org/oauth/authorize?",
      clientId: "APP-RF247QTDN0JLF4I6",
      responseType: "token",
      scope: "openid",
      redirectUri: "https://grails-dev.rrz.uni-koeln.de/ka3/login"
    };

    // redirectUri: "https://grails-dev.rrz.uni-koeln.de/ka3/login"
    //redirectUri: "http://localhost:5000/ka3"

   var orcidAuth = auth.authUrl + "client_id="+ auth.clientId + "&" + "response_type=" + auth.responseType +"&" + "scope=" + auth.scope +"&" + "redirect_uri=" + auth.redirectUri;

   window.location.replace(orcidAuth);

  }

  function handleAuthentication() {

    var hash = $location.url().split('#').pop();
    var splitted = hash.split('&');

    for (var i = 0; i < splitted.length; i++) {

      var formatJwt  = splitted[i].split('='), key    = formatJwt[0];
      credentials[key] = formatJwt[1];

      localLogin(credentials);

    }
  }

  function localLogin (authResult) {

    expiresAt = (authResult['expires_in'] * 1000) + new Date().getTime();
    accessToken = authResult['access_token'];
    idToken = authResult['id_token'];

    $localStorage.accessToken = accessToken;
    $localStorage.idToken = idToken;

    $log.info('Authenticated User-Token:', idToken);

    if(idToken) {
      $localStorage['isLoggedIn'] = 'true';
      var encoded = idToken.split(".")[1];
      var decodeToken = JSON.parse(urlBase64Decode(encoded));
      $localStorage.currentUser = decodeToken;
    }

    // $state.reload();

  }

  function renewTokens() {

  }

  function signin(data, success, error) {
    // Set the Content-Type
    // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
     $http.defaults.headers.post["Content-Type"] = "application/json";

    // Delete the Requested With Header
    // delete $http.defaults.headers.common["X-Requested-With"];   

    return $http(
        {
            url: urls.AUTH,
            method: "POST",
            data: JSON.stringify(data),
            withCredentials: true,
            headers: {
                'Authorization': '*'
            }
        })
      .then(function(response){ $log.info(response)})
      .catch(angular.noop());
  };

  function logout() {
    delete $localStorage['isLoggedIn'];
    delete $localStorage.auth;
    delete $localStorage.accessToken;
    delete $localStorage.idToken;
    delete $localStorage.currentUser;

    $state.go('index');
    // $state.reload();
  }

  function isAuthenticated() {
    if($localStorage['isLoggedIn']) {
      // $log.info('Auth:::' , $localStorage['isLoggedIn']);
      $state.go('user');
      // $state.reload();
      return $localStorage['isLoggedIn'] === 'true' && new Date().getTime() < expiresAt;
    }
  }

  function urlBase64Decode(str) {
    var output = str.replace("-", "+").replace("_", "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw "Illegal base64url string!";
    }
    return window.atob(output);
  }

  return {
    login: login,
    getIdToken: getIdToken,
    getAccessToken: getAccessToken,
    handleAuthentication: handleAuthentication,
    logout: logout,
    isAuthenticated: isAuthenticated,
    renewTokens: renewTokens
  }
}