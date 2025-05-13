$(document).ready(() => {
    // cookieConsent();
    helloWorldNv();

    $(document).keyup((event) => {
        if (event.key === "/") {
            $("#nv-search-features").focus();
        }
    });
});

$(".nv-btn-cookie-consent").click(() => {
    const banner = $(".nv-cookie-consent-banner");
    banner.fadeOut(0);

    localStorage.setItem("cookie-consent-hide", true);
});

function cookieConsent() {
  const hide = localStorage.getItem("cookie-consent-hide");

  if (!hide) {
      setTimeout(() => {
          const banner = $(".nv-cookie-consent-banner");
          banner.fadeIn(1000);
      }, 8000);
  }
}

function getBaseUrlApi() {
    const host = window.location.host;
    return host === "localhost"
        ? "http://localhost/geradornv/wp-json"
        : "https://geradornv.com.br/wp-json"
}

$(".nv-btn-share-whatsapp").click((e) => {
    const url = window.location.href;
    const msg = encodeURIComponent(`Olá, acabei de ver essa ferramenta e quero compartilhar com você! Confira: ${url}`);
    $(".nv-btn-share-whatsapp").attr("href", `https://api.whatsapp.com/send?text=${msg}`);
});

$(".nv-btn-share-facebook").click((e) => {
    const url = encodeURIComponent(window.location.href);
    $(".nv-btn-share-facebook").attr("href", `https://www.facebook.com/sharer/sharer.php?u=${url}`);
});

$(".nv-btn-share-linkedin").click((e) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const summary = encodeURIComponent("Olá, acabei de ver essa ferramenta e quero compartilhar com você!");
    $(".nv-btn-share-linkedin").attr("href", `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}$summary=${summary}`);
});

$(".nv-btn-share-twitter").click((e) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Acabei de ver essa ferramenta e quero compartilhar com vocês! Confira:");
    $(".nv-btn-share-twitter").attr("href", `https://twitter.com/intent/tweet?url=${url}&text=${text}`);
});

$(".nv-btn-share-telegram").click((e) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Olá, acabei de ver essa ferramenta e quero compartilhar com você! Confira:");
    $(".nv-btn-share-telegram").attr("href", `https://telegram.me/share/url?url=${url}&text=${text}`);
});

$(".nv-btn-share-pinterest").click((e) => {
    const url = window.location.href;
    $(".nv-btn-share-pinterest").attr("href", `https://br.pinterest.com/pin/create/button/?url=${url}`);
});

$(".nv-btn-copy").click(() => {
    copy(".nv-field-copy");
});

$("#nv-search-features").keyup(() => {
    searchFeatures();
    toggleFieldsetFeatures();
    workaroundColumnCountFieldsetFeatures();
    toggleWrapperSearchFeaturesNotFound();
});

function searchFeatures() {
    const search = $("#nv-search-features").val().toLowerCase();

    $(".wrapper-masonry-features a").each(function() {
        const linkText = $(this).text().toLowerCase();
        const linkTextAccent = removeAccent($(this).text().toLowerCase());
        const pattern = new RegExp(search.replace(" ", ".*"), "i");
        const match = pattern.test(linkText) || pattern.test(linkTextAccent);
        
        if (!match) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

function removeAccent(word) {
    const mapAccents = {
        "a": "á|à|ã|â|À|Á|Ã|Â",
        "e": "é|è|ê|É|È|Ê",
        "i": "í|ì|î|Í|Ì|Î",
        "o": "ó|ò|õ|ô|Ó|Ò|Õ|Ô",
        "u": "ú|ù|û|ü|Ú|Ù|Û|Ü",
        "c": "ç|Ç",
        "n": "ñ|Ñ"
    };
  
    for (let letter in mapAccents) {
        const expression = new RegExp(mapAccents[letter], "g");
        word = word.replace(expression, letter);
    }
  
    return word;
}

function toggleFieldsetFeatures() {
    $(".fieldset-masonry-features").each(function() {
        const originalLinks = $(this).find("a");
        const hideLinks = originalLinks.filter(function() {
          return $(this).css("display") === "none";
        });
    
        if (hideLinks.length === originalLinks.length) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

function workaroundColumnCountFieldsetFeatures() {
    let countOriginalFieldset = 0;
    let countHideFieldset = 0;

    $(".fieldset-masonry-features").each(function() {
        countOriginalFieldset++;

        if ($(this).css("display") === "none") {
            countHideFieldset++;
        }
    });
    
    const diffCountFieldset = countOriginalFieldset - countHideFieldset;

    if (diffCountFieldset === 1) {
        $(".wrapper-masonry-features").addClass("wrapper-masonry-features-by-script");
    } else {
        $(".wrapper-masonry-features").removeClass("wrapper-masonry-features-by-script");
    }
}

function toggleWrapperSearchFeaturesNotFound() {
    const originalFieldsets = $(".fieldset-masonry-features");
    const hideFieldsets = originalFieldsets.filter(function() {
        return $(this).css("display") === "none";
    });

    if (hideFieldsets.length === originalFieldsets.length) {
        $(".nv-wrapper-search-features-not-found").show();
    } else {
        $(".nv-wrapper-search-features-not-found").hide();
    }
}

function copy(identification) {
    let text = "";

    if ($(identification).is("label")) {
        text = $(identification).text();
    }

    if ($(identification).is("textarea")) {
        text = $(identification).val();
    }

    if (text === "" || text === " ") {
        return;
    }

    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    window.getSelection().removeAllRanges();

    reportToastrGlobal("Copiado com sucesso!", "success", 1500);
}

function helloWorldNv() {
    const str = String.raw`
  _____                    _              _   ___      __
 / ____|                  | |            | \ | \ \    / /
| |  __  ___ _ __ __ _  __| | ___  _ __  |  \| |\ \  / /
| | |_ |/ _ \ '__/ _' |/ _' |/ _ \| '__| | . ' | \ \/ /
| |__| |  __/ | | (_| | (_| | (_) | |    | |\  |  \  /
 \_____|\___|_|  \__,_|\__,_|\___/|_|    |_| \_|   \/

>> olá, obrigado pela visita, volte sempre!
>> se achar algum bug, avisa!? :porfavorzinho:
>> página para contato: https://geradornv.com.br/contato/
  `;
    console.log(str.replaceAll("'", "`"));
}

function setCookie(name, value, expiresDays = 7, path = null) {
    if (path !== null) {
        path = `;path=${path}`;
    }

  	let data = new Date();
  	data.setDate(data.getDate() + expiresDays);
  	let cookie = name + "=" + escape(value) + "; expires=" + data + path;
    document.cookie = cookie;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

$(".nv-theme-btn").click(() => {
    changeThemeCurrent();
});

$(document).keypress((e) => {
    const keyPressed = e.key;
    const target = e.target.tagName.toLowerCase();
    const arrStop = ['input', 'textarea'];

    if (keyPressed.toLowerCase() === 't' && arrStop.indexOf(target) === -1) {
        changeThemeCurrent();
    }
});

function changeThemeCurrent() {
    const themeDark = $("body").hasClass("theme-dark");
    themeDark
        ? renderThemeLight()
        : renderThemeDark();
}

function renderThemeLight() {
    setCookie("nv-theme", "light", 30, "/");
    localStorage.setItem("nv-theme", "light");
    $("body").removeClass("theme-dark");
    $("body").addClass("theme-light");
}

function renderThemeDark() {
    setCookie("nv-theme", "dark", 30, "/");
    localStorage.setItem("nv-theme", "dark");
    $("body").removeClass("theme-light");
    $("body").addClass("theme-dark");
}

function reportToastrGlobal(msg, type, timeOut) {
    const arguments = {
      "positionClass": "toast-bottom-right",
      timeOut: timeOut,
      "closeButton": false,
      "debug": false,
      "newestOnTop": true,
      "progressBar": false,
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut",
      "tapToDismiss": false
    };
  
    if (type === "error") {
      toastr.error("", msg, arguments);
    }
  
    if (type === "success") {
      toastr.success("", msg, arguments);
    }
  }