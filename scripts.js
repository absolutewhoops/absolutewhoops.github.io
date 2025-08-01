document.querySelectorAll("button").forEach(function (botao) {
    let corpoLista = document.body.classList;

    if(botao.className != "FakeShady" && botao.className != "popup__botao") {
        botao.addEventListener("click", function () {
            corpoLista.toggle("popup--aberto");
        });
    }
    if(botao.className == "popup__botao popup__botao--fechar") {
        botao.addEventListener("click", function () {
            fecharPopupComAnim("popup");
        });
    }
    if(botao.className == "popupSorry__botao popupSorry__botao--fechar") {
        botao.addEventListener("click", function () {
            fecharPopupComAnim("popupSorry");
        });
    }
    if(botao.className == "popup__botao") {
        botao.addEventListener("click", function () {
            const input = document.querySelector(".popup__input");

            input.addEventListener("input", () => {
                if (input.value.trim()) {
                    input.classList.remove("erro");
                }
                else if (!input.value.trim()) {
                    input.classList.add("erro");
                }
            });   

            if (!input.value.trim()) {
                input.classList.add("erro");
                return;
            }
            input.classList.remove("erro");
            corpoLista.remove("popup--aberto");
            corpoLista.add("popupSorry--aberto");
        });
    }
    if (botao.className == "popupSorry__botao"){
        botao.addEventListener("click", function () {
            navigator.clipboard.writeText("contatofischario@gmail.com");
            mostrarMensagemCopiada();
            corpoLista.remove("popupSorry--aberto")
            corpoLista.remove("popup--aberto");
        });
    }
});

function mostrarMensagemCopiada() {
    document.body.classList.add("msgEmailCopiado--aberto");

    const classeEmail = document.querySelector(".msgEmailCopiado");
    if (!classeEmail) return;

    function onAnimationEnd(e) {
        if (e.animationName == "in-out") {
        document.body.classList.remove("msgEmailCopiado--aberto");
        classeEmail.removeEventListener("animationend", onAnimationEnd);
        }
    }

    classeEmail.addEventListener("animationend", onAnimationEnd);
}

function fecharPopupComAnim(nome) {
    const classeAberta = `${nome}--aberto`;
    const classeFechando = `${nome}--fechando`;

    document.body.classList.add(classeFechando);
    document.body.classList.remove(classeAberta);

    const seletor = nome == "popup" ? ".popup" : ".popupSorry";
    const elemento = document.querySelector(seletor);
    if (!elemento) {
        document.body.classList.remove(classeFechando);
        return;
    }

    function onAnimationEnd(e) {
        if (e.animationName == "out") {
        document.body.classList.remove(classeFechando);
        elemento.removeEventListener("animationend", onAnimationEnd);
        }
    }

    elemento.addEventListener("animationend", onAnimationEnd);
}