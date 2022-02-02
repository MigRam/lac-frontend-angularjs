<!doctype html>
<html lang="en" class="no-js">
    <head>
        <base href="${request.contextPath}/"/>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

        <meta name="fragment" content="!">

        <title>Language Archive Cologne (LAC)</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <style type="text/css">
        [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
            display: none !important;
        }
        </style>

        <asset:stylesheet src="application.css"/>

        <asset:link rel="icon" href="favicon.ico" type="image/x-ico"/>

        <script type="text/javascript">
            window.contextPath = "${request.contextPath}";
        </script>

        <link rel="stylesheet" 
              href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
              integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" 
              crossorigin="anonymous">
    </head>

    <body ng-app="client">

        %{-- <g:render template="/shared/navigation" /> --}%

        <navigation></navigation>

            <section class="hero is-fullheight has-background-white">
                <div class="hero body">
                    <div ui-view></div>
                </div>
            </section>

        <g:render template="/shared/footer" />
        
        <asset:javascript src="/client/client.js"/>
    </body>
</html>
