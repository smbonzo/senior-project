$(document).ready(function() {  
    $('#header').append(
        `
        <div class="header-top-bar"></div>
        <div class="header-container">
            <div class="header-text mercury">
                <h1 class="title">
                    Career Readiness Dashboard
                </h1>
                <h3>
                    SUNY Oswego
                </h3>
                <h3>
                    Partially hydrated Devs
                </h3>
            </div>

            <nav class="links">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="weekly4ups.html">Weekly 4-Ups</a></li>
                    <li><a href="agenda.html">Agenda</a></li>
                    <li><a href="timesheet.html">Timesheet</a></li>
                    <li><a href="risks.html">Risks</a></li>
                    <li><a href="metrics.html">Metrics</a></li>
                    <li><a href="presentations.html">Presentations</a></li>
                </ul>
            </nav>
        </div>`
    );

    $("#footer").append(
        `<div class="footer-container">
            Partially hydrated Devs - ${new Date().getFullYear()}
        </div>`
    );
});
