/* =================================
   VARIÁVEIS
================================= */

let usuario = null;

let valorSaque = 0;


/* =================================
   PEGAR CONTAS
================================= */

function contas() {

    let dados =
        localStorage.getItem("contasBanco");


    if (dados === null) {

        return [];

    }


    try {

        return JSON.parse(dados);

    } catch (erro) {

        return [];

    }

}


/* =================================
   SALVAR CONTAS
================================= */

function salvar(lista) {

    localStorage.setItem(
        "contasBanco",
        JSON.stringify(lista)
    );

}


/* =================================
   MOSTRAR CADASTRO
================================= */

function mostrarCadastro() {

    document
        .getElementById("login")
        .style.display = "none";


    document
        .getElementById("cadastro")
        .style.display = "block";


    document
        .getElementById("erroCadastro")
        .innerHTML = "";

}


/* =================================
   VOLTAR LOGIN
================================= */

function voltarLogin() {

    document
        .getElementById("cadastro")
        .style.display = "none";


    document
        .getElementById("login")
        .style.display = "block";


    document
        .getElementById("erroLogin")
        .innerHTML = "";

}


/* =================================
   CADASTRAR
================================= */

function cadastrar() {

    let nome =
        document
        .getElementById("nome")
        .value
        .trim();


    let email =
        document
        .getElementById("email")
        .value
        .trim();


    let senha =
        document
        .getElementById("senha")
        .value;


    let senha2 =
        document
        .getElementById("senha2")
        .value;


    let erro =
        document
        .getElementById("erroCadastro");


    /* CAMPOS VAZIOS */

    if (
        nome === "" ||
        email === "" ||
        senha === "" ||
        senha2 === ""
    ) {

        erro.innerHTML =
            "Preencha todos os campos.";

        return;

    }


    /* EMAIL */

    if (!email.includes("@")) {

        erro.innerHTML =
            "Digite um e-mail válido.";

        return;

    }


    /* SENHA */

    if (senha.length < 4) {

        erro.innerHTML =
            "A senha precisa ter pelo menos 4 caracteres.";

        return;

    }


    /* CONFIRMAR SENHA */

    if (senha !== senha2) {

        erro.innerHTML =
            "As senhas não são iguais.";

        return;

    }


    /* PEGAR CONTAS */

    let lista = contas();


    /* VERIFICAR EMAIL */

    for (
        let i = 0;
        i < lista.length;
        i++
    ) {

        if (
            lista[i].email.toLowerCase() ===
            email.toLowerCase()
        ) {

            erro.innerHTML =
                "Este e-mail já está cadastrado.";

            return;

        }

    }


    /* CRIAR CONTA */

    let novaConta = {

        nome: nome,

        email: email,

        senha: senha,

        saldo: 1000

    };


    /* SALVAR */

    lista.push(novaConta);

    salvar(lista);


    /* ENTRAR AUTOMATICAMENTE */

    usuario = novaConta;


    abrirBanco();

}


/* =================================
   LOGIN
================================= */

function entrar() {

    let email =
        document
        .getElementById("emailLogin")
        .value
        .trim();


    let senha =
        document
        .getElementById("senhaLogin")
        .value;


    let erro =
        document
        .getElementById("erroLogin");


    /* CAMPOS VAZIOS */

    if (
        email === "" ||
        senha === ""
    ) {

        erro.innerHTML =
            "Digite seu e-mail e sua senha.";

        return;

    }


    /* PEGAR CONTAS */

    let lista = contas();


    /* PROCURAR CONTA */

    for (
        let i = 0;
        i < lista.length;
        i++
    ) {

        if (
            lista[i].email.toLowerCase() ===
            email.toLowerCase()
        ) {


            /* SENHA */

            if (
                lista[i].senha === senha
            ) {

                usuario = lista[i];

                abrirBanco();

                return;

            }


            erro.innerHTML =
                "Senha incorreta.";

            return;

        }

    }


    /* EMAIL NÃO EXISTE */

    erro.innerHTML =
        "Este e-mail não está cadastrado.";

}


/* =================================
   ABRIR BANCO
================================= */

function abrirBanco() {

    document
        .getElementById("login")
        .style.display = "none";


    document
        .getElementById("cadastro")
        .style.display = "none";


    document
        .getElementById("confirmar")
        .style.display = "none";


    document
        .getElementById("banco")
        .style.display = "block";


    document
        .getElementById("nomeUsuario")
        .innerHTML =
        usuario.nome;


    document
        .getElementById("saldo")
        .innerHTML =
        usuario.saldo.toFixed(2);


    document
        .getElementById("resultado")
        .innerHTML = "";

}


/* =================================
   PEDIR SAQUE
================================= */

function sacar() {

    let valor =
        Number(
            document
            .getElementById("valor")
            .value
        );


    let resultado =
        document
        .getElementById("resultado");


    /* VALOR INVÁLIDO */

    if (
        !Number.isFinite(valor) ||
        valor <= 0
    ) {

        resultado.innerHTML =
            "<span class='erro'>" +
            "Digite um valor válido." +
            "</span>";

        return;

    }


    /* SALDO INSUFICIENTE */

    if (
        valor > usuario.saldo
    ) {

        resultado.innerHTML =

            "<span class='erro'>" +

            "Saldo insuficiente." +

            "</span><br>" +

            "Valor disponível: R$ " +

            usuario.saldo.toFixed(2);

        return;

    }


    /* VALOR DO SAQUE */

    valorSaque = valor;


    /* ESCONDE BANCO */

    document
        .getElementById("banco")
        .style.display = "none";


    /* MOSTRA SENHA */

    document
        .getElementById("confirmar")
        .style.display = "block";


    /* LIMPA SENHA */

    document
        .getElementById("senhaSaque")
        .value = "";


    document
        .getElementById("erroSaque")
        .innerHTML = "";


    /* COLOCA O CURSOR NA SENHA */

    document
        .getElementById("senhaSaque")
        .focus();

}


/* =================================
   CONFIRMAR SAQUE
================================= */

function confirmarSaque() {

    let senha =
        document
        .getElementById("senhaSaque")
        .value;


    let erro =
        document
        .getElementById("erroSaque");


    /* SENHA VAZIA */

    if (senha === "") {

        erro.innerHTML =
            "Digite sua senha.";

        return;

    }


    /* SENHA ERRADA */

    if (senha !== usuario.senha) {

        erro.innerHTML =
            "Senha incorreta.";

        return;

    }


    /* =========================
       NOTAS DISPONÍVEIS
    ========================== */

    let notas =
        [100, 50, 20, 10, 5, 2];


    let restante =
        valorSaque;


    let texto = "";


    /* CALCULAR NOTAS */

    for (
        let nota of notas
    ) {

        let quantidade =
            Math.floor(
                restante / nota
            );


        if (
            quantidade > 0
        ) {

            texto +=

                quantidade +

                " nota(s) de R$ " +

                nota +

                "<br>";


            restante =
                restante % nota;

        }

    }


    /* VALOR SEM NOTAS */

    if (restante !== 0) {

        erro.innerHTML =
            "Esse valor não pode ser sacado com as notas disponíveis.";

        return;

    }


    /* =========================
       RETIRAR DINHEIRO
    ========================== */

    usuario.saldo =
        usuario.saldo -
        valorSaque;


    /* =========================
       ATUALIZAR CONTA
    ========================== */

    let lista =
        contas();


    for (
        let i = 0;
        i < lista.length;
        i++
    ) {

        if (
            lista[i].email.toLowerCase() ===
            usuario.email.toLowerCase()
        ) {

            lista[i].saldo =
                usuario.saldo;

            break;

        }

    }


    /* SALVAR */

    salvar(lista);


    /* =========================
       ESCONDER CONFIRMAÇÃO
    ========================== */

    document
        .getElementById("confirmar")
        .style.display = "none";


    /* =========================
       MOSTRAR BANCO
    ========================== */

    document
        .getElementById("banco")
        .style.display = "block";


    /* =========================
       ATUALIZAR SALDO
    ========================== */

    document
        .getElementById("saldo")
        .innerHTML =
        usuario.saldo.toFixed(2);


    /* =========================
       MOSTRAR INFORMAÇÕES
    ========================== */

    document
        .getElementById("resultado")
        .innerHTML =

        "<h3 class='verde'>" +
        "Saque realizado com sucesso!" +
        "</h3>" +

        "<strong>Cliente:</strong> " +
        usuario.nome +
        "<br>" +

        "<strong>Valor sacado:</strong> R$ " +
        valorSaque.toFixed(2) +
        "<br><br>" +

        "<strong>Notas:</strong><br>" +

        texto +

        "<br>" +

        "<strong>Saldo restante:</strong> R$ " +
        usuario.saldo.toFixed(2);


    /* LIMPAR VALOR */

    document
        .getElementById("valor")
        .value = "";


    /* LIMPAR SENHA */

    document
        .getElementById("senhaSaque")
        .value = "";


    /* ZERAR VALOR DO SAQUE */

    valorSaque = 0;

}


/* =================================
   CANCELAR SAQUE
================================= */

function cancelar() {

    document
        .getElementById("confirmar")
        .style.display = "none";


    document
        .getElementById("banco")
        .style.display = "block";


    document
        .getElementById("senhaSaque")
        .value = "";


    document
        .getElementById("erroSaque")
        .innerHTML = "";

}


/* =================================
   SAIR
================================= */

function sair() {

    usuario = null;

    valorSaque = 0;


    document
        .getElementById("banco")
        .style.display = "none";


    document
        .getElementById("confirmar")
        .style.display = "none";


    document
        .getElementById("login")
        .style.display = "block";


    document
        .getElementById("emailLogin")
        .value = "";


    document
        .getElementById("senhaLogin")
        .value = "";


    document
        .getElementById("erroLogin")
        .innerHTML = "";

}