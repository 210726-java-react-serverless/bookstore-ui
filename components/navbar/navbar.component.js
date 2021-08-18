const NAVBAR_ELEMENT = document.getElementById('navbar');

function NavbarComponent() {

    let template = `
    <nav id="navbar-component" class="navbar navbar-expand navbar-dark bg-dark" aria-label="navbar-component">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Bookstore</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapsible" aria-controls="navbar-collapsible" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse" id="navbar-collapsible">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a id="logout" class="nav-link" href="#">Logout</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                        <ul class="dropdown-menu" aria-labelledby="dropdown03">
                            <li id="nav-to-login" class="dropdown-item" data-route="/login">Login</a></li>
                            <li id="nav-to-register" class="dropdown-item" data-route="/register">Register</a></li>
                            <li id="nav-to-dashboard" class="dropdown-item" data-route="/dashboard">Dashboard</a></li>
                        </ul>
                    </li>
                </ul>
                <form>
                    <input class="form-control" type="text" placeholder="Search" aria-label="Search">
                </form>
            </div>
        </div>
    </nav>
    `;

    function injectTemplate() {
        NAVBAR_ELEMENT.innerHTML = template;
    }

    function navigateToView(e) {
        console.log(`Navigating to ${e.target.dataset.route}`);
    }

    function logout() {
        console.log('Logging you out!');
    }

    this.render = function() {
        injectTemplate();
        document.getElementById('logout').addEventListener('click', logout);
        document.getElementById('nav-to-login').addEventListener('click', navigateToView);
        document.getElementById('nav-to-register').addEventListener('click', navigateToView);
        document.getElementById('nav-to-dashboard').addEventListener('click', navigateToView);
    }

}

export default new NavbarComponent();