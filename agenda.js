$(document).ready(function() {
    const agendas = $(".agenda");
    for (let i = 0; i < agendas.length; i++) {
        const jAgendas = $(agendas[i]);
        const src = jAgendas.attr("src");
        const date = jAgendas.attr("date");
        jAgendas.append(
            `<h2>Agenda ${date}</h2>
            <hr>
            <br>
            <div class="iframe" src="${src}"></div>
            <br>`
        );
    }
});