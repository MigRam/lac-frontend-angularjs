<nav class="navbar has-background-dark is-fullwidth" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item navbar-logo" ui-sref="index" ui-sref-opts="{reload: true}">
            <img src="./assets/logo-LAC.png" alt="LAC Language Archive Cologne Logo"/>
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="lacNavMenu">
            <span aria-hidden="true"></span> <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="lacNavMenu" class="navbar-menu">
        <div class="navbar-start"><div class="navbar-item"></div></div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-light is-outlined" ui-sref="index" ui-sref-opts="{reload: true}">Home</a>
                    <a class="button is-light is-outlined" ui-sref="guides">User Guides</a>
                    <!--
                    <a class="button is-light is-outlined" ui-sref="deposit">Deposit</a>
                    <a class="button is-light is-outlined" ui-sref="services">Services</a>
                    -->

                    <a class="button is-primary is-outlined" ui-sref="login" ui-sref-opts="{reload: true}">
                        <span class="icon">
                            <i class="fas fa-sign-in-alt"></i>
                        </span>
                        <span> Log In </span>
                    </a>

                    <!--
                   {%--
                    <sec:ifNotLoggedIn>
                        <a href='${request.contextPath}/samlLogin' class="button is-primary" target="_self">
                            <span class="icon">
                            <i class="fas fa-sign-in-alt"></i>
                            </span>
                            <span> Log In </span>
                        </a>
                    </sec:ifNotLoggedIn>
                    <sec:ifLoggedIn>
                        <a ui-sref="services" class="button is-primary"> Services </a>
                        <a href='${request.contextPath}/samlLogout' class="button is-danger target="_self">Log Out [<sec:username/>]</a>
                    </sec:ifLoggedIn>
                    --%}
                    -->
                </div>
            </div>
        </div>
    </div>
</nav>


<script>
    document.addEventListener('DOMContentLoaded', function() {
        var $navbarBurgers = Array.prototype.slice.call(
            document.querySelectorAll(".navbar-burger"),
            0
        );

        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach(function(element) {
                element.addEventListener("click", function() {
                    var target = element.dataset.target;
                    var $target = document.getElementById(target);

                    element.classList.toggle("is-active");
                    $target.classList.toggle("is-active");
                });
            });
        }
    });
</script>