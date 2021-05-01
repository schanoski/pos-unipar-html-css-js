/* Permite a realização do Drop */
let allowDrop = (ev) => {
    ev.preventDefault();
    ev.currentTarget.style.background = "#eee";
    ev.currentTarget.style.border = "5px dotted #ccc";
}

/* não permite o drop */
let denyDrop = (ev) => {
    ev.stopPropagation();
}

/* Permite arrastar */
let drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
}

/* termino/saída de arrastamento */
let leave = (ev) =>{
    ev.preventDefault();
    ev.target.style.background = "";
    ev.currentTarget.style.border = "";
}

/* função para soltar e chama a função de calculo() e inicialCampoQuantidade sempre que for soltado um produto */
let drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    ev.currentTarget.style.border = "";
    ev.target.style.background = "inherit";
    calculo();
    inicialCampoQuantidade();
}

/* busca a função calculo sempre que alterar a quantidade dentro dos produtos */
$('article').change(function() {
    calculo();  
});

/* Nesta função realiza os cálculos e ativa o campo para alterar a quantidade */
const calculo = () => {
    var totalQuantidade = 0;
    var valorTotal = 0;    
    var carrinho = $('#carrinho').find('article');

    carrinho.each(function() {  
        var campoQuantidade = $(this).find("input[name='qtde']")
        var quantidade = campoQuantidade.val();
        campoQuantidade.prop('disabled', false);
        var valorProduto = $(this).find("input[name='valor']").val();
        totalQuantidade = parseInt(quantidade) + totalQuantidade;
        var mult = quantidade * valorProduto;
        valorTotal = valorTotal + mult;
    })

    var valorMoeda = valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    resultadoFinal(totalQuantidade, valorMoeda);   
}

/* Imprime o resultado final */
const resultadoFinal = (quantidade, valor) =>{
    $('#total-itens').html('&nbsp;' + quantidade);
    $('#valor-total').html('&nbsp;' + valor);
}

/* a função initialCampoQuantidade realiza o processo de voltar os produtos no valor inicial e desativa a edição dos campos de quantidade */
const inicialCampoQuantidade = () =>{
    var produtos = $('#produtos').find('article');
    produtos.each(function(){
        var quantidade = $(this).find("input[name='qtde']");
        quantidade.val(1);
        quantidade.prop('disabled', true);
    })
}