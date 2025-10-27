// Dados dos móveis (10 por material, com tipos variados)
const moveis = [
    { id: 1, nome: 'Cadeira Madeira', preco: 150, material: 'madeira', tipo: 'cadeira', vendas: 120 },
    { id: 2, nome: 'Mesa de Jantar Madeira', preco: 500, material: 'madeira', tipo: 'mesa', vendas: 80 },
    { id: 3, nome: 'Estante Madeira', preco: 300, material: 'madeira', tipo: 'estante', vendas: 65 },
    { id: 4, nome: 'Cama Madeira', preco: 800, material: 'madeira', tipo: 'cama', vendas: 100 },
    { id: 5, nome: 'Armário Madeira', preco: 1500, material: 'madeira', tipo: 'armário', vendas: 70 },
    { id: 6, nome: 'Cadeira Metal', preco: 180, material: 'metal', tipo: 'cadeira', vendas: 110 },
    { id: 7, nome: 'Mesa Metal', preco: 550, material: 'metal', tipo: 'mesa', vendas: 90 },
    { id: 8, nome: 'Estante Metal', preco: 350, material: 'metal', tipo: 'estante', vendas: 60 },
    { id: 9, nome: 'Cama Metal', preco: 900, material: 'metal', tipo: 'cama', vendas: 50 },
    { id: 10, nome: 'Armário Metal', preco: 1600, material: 'metal', tipo: 'armário', vendas: 55 },
    { id: 11, nome: 'Cadeira Plástico', preco: 120, material: 'plastico', tipo: 'cadeira', vendas: 130 },
    { id: 12, nome: 'Mesa Plástico', preco: 400, material: 'plastico', tipo: 'mesa', vendas: 100 },
    { id: 13, nome: 'Estante Plástico', preco: 250, material: 'plastico', tipo: 'estante', vendas: 75 },
    { id: 14, nome: 'Cama Plástico', preco: 700, material: 'plastico', tipo: 'cama', vendas: 40 },
    { id: 15, nome: 'Armário Plástico', preco: 1100, material: 'plastico', tipo: 'armário', vendas: 45 }
];

let carrinho = [];
let usuarioLogado = null;

// Função para criar os principais vendidos
function criarPrincipais() {
    const principaisDiv = document.getElementById('principaisVendas');
    const ordenados = [...moveis].sort((a, b) => b.vendas - a.vendas).slice(0, 6);
    principaisDiv.innerHTML = '';
    ordenados.forEach(item => {
        const div = document.createElement('div');
        div.className = 'móvel';
        div.innerHTML = `
            <h3>${item.nome}</h3>
            <p>Preço: R$ ${item.preco}</p>
            <button onclick="adicionarAoCarrinho(${item.id})">Adicionar</button>
        `;
        principaisDiv.appendChild(div);
    });
}

// Filtrar móveis
function filtrarProdutos() {
    const tipo = document.getElementById('tipoMóvel').value;
    const material = document.getElementById('materialFiltro').value;
    let filtrados = [...moveis];

    if (tipo !== 'todos') {
        filtrados = filtrados.filter(i => i.tipo === tipo);
    }
    if (material !== 'todos') {
        filtrados = filtrados.filter(i => i.material === material);
    }

    exibirProdutos(filtrados);
}

// Exibir lista de produtos
function exibirProdutos(lista) {
    const container = document.getElementById('listaProdutos');
    container.innerHTML = '';

    if (lista.length === 0) {
        container.innerHTML = '<p>Nenhum produto encontrado com esses filtros.</p>';
        return;
    }

    lista.forEach(item => {
        const div = document.createElement('div');
        div.className = 'móvel';
        div.innerHTML = `
            <h3>${item.nome}</h3>
            <p>Preço: R$ ${item.preco}</p>
            <button onclick="adicionarAoCarrinho(${item.id})">Adicionar ao Carrinho</button>
        `;
        container.appendChild(div);
    });
}

// Adicionar ao carrinho
function adicionarAoCarrinho(id) {
    const item = moveis.find(i => i.id === id);
    if (item) {
        carrinho.push(item);
        atualizarCarrinho();
    }
}

// Atualizar carrinho
function atualizarCarrinho() {
    document.getElementById('qtCarrinho').innerText = carrinho.length;
}

// Mostrar modal
function mostrarModal(id) {
    document.getElementById(id).style.display = 'block';
}

// Fechar modal
function fecharModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Eventos de botões
document.getElementById('cadastroBtn').onclick = () => mostrarModal('modalCadastro');
document.getElementById('loginBtn').onclick = () => mostrarModal('modalLogin');
document.getElementById('verCarrinho').onclick = () => {
    mostrarModal('modalCarrinho');
    mostrarItensCarrinho();
};
document.getElementById('fecharCadastro').onclick = () => fecharModal('modalCadastro');
document.getElementById('fecharLogin').onclick = () => fecharModal('modalLogin');
document.getElementById('fecharCarrinho').onclick = () => fecharModal('modalCarrinho');

window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
};

// Cadastro
document.getElementById('formCadastro').onsubmit = function(e) {
    e.preventDefault();
    usuarioLogado = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };
    alert('Cadastro realizado com sucesso!');
    fecharModal('modalCadastro');
};

// Login
document.getElementById('formLogin').onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;
    if (usuarioLogado && usuarioLogado.email === email && usuarioLogado.senha === senha) {
        alert('Login bem-sucedido!');
        fecharModal('modalLogin');
    } else {
        alert('Credenciais inválidas.');
    }
};

// Mostrar itens do carrinho
function mostrarItensCarrinho() {
    const div = document.getElementById('itensCarrinho');
    div.innerHTML = '';
    if (carrinho.length === 0) {
        div.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }
    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        div.innerHTML += `<p>${item.nome} - R$ ${item.preco} <button onclick="removerDoCarrinho(${index})">Remover</button></p>`;
    });
    div.innerHTML += `<h3>Total: R$ ${total}</h3>`;
}

// Remover do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    mostrarItensCarrinho();
    atualizarCarrinho();
}

// Finalizar compra
document.getElementById('finalizarCompra').onclick = () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio.');
    } else {
        alert('Compra finalizada! Obrigado pela preferência.');
        carrinho = [];
        fecharModal('modalCarrinho');
        atualizarCarrinho();
    }
};

// Evento do botão de filtrar
document.getElementById('filtrarBtn').onclick = filtrarProdutos;

// Inicializar principais e produtos
criarPrincipais();
exibirProdutos(moveis);
