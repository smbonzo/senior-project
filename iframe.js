$(document).ready(function() {
    console.log($(".iframe"));
    const frames = $(".iframe");
    for (let i = 0; i < frames.length; i++) {
        const jIframe = $(frames[i]);
        const src = jIframe.attr("src")
        jIframe.append(
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
    }
   
});