$(document).ready(function() {
    console.log($("#iframe"));
    const src = $("#iframe").attr("src")
    $("#iframe").append(
        `<div class="iframe-content">
            <iframe 
                id="embedded-document"
                src="${src}"
                height="100%"
                width="100%"
                frameborder="0"
            ></iframe>
        </div>`
    );
});