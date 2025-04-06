/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de encomendas do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const listarEncomendas = async () => {
  let url = 'http://127.0.0.1:5000/listar_encomendas';
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.encomendas.forEach(item =>
        incluirListaEnc(item.nome, item.casa, item.quantidade_p, item.pacote, item.cep, item.endereco)
      )
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Ocorreu um erro no serviço. Favor entrar em contato.');
    });
}

/*
  --------------------------------------------------------------------------------------
  Carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
listarEncomendas()

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma encomenda
  --------------------------------------------------------------------------------------
*/
const adicionarEncomenda = async () => {
  const nome = document.getElementById("newNomeEncomenda").value.trim();
  const casa = document.getElementById("newCasa").value.trim();
  const cep = document.getElementById("newCep").value.trim();
  const endereco = document.getElementById("newEndereco").value.trim();
  const quantidadeStr = document.getElementById("newQuantidade_p").value.trim();
  const quantidade_p = parseInt(quantidadeStr);

  const pacoteSelect = document.getElementById("newPacote");
  const pacote = pacoteSelect.options[pacoteSelect.selectedIndex].value;

  if (!nome || !casa || !cep || !endereco || isNaN(quantidade_p) || quantidade_p <= 0 || !["P", "M", "G"].includes(pacote)) {
    alert("Por favor, preencha todos os campos corretamente antes de adicionar.");
    return;
  }

  const dados = { nome, casa, cep, endereco, quantidade_p, pacote };
  console.log("📤 Enviando dados:", dados);

  fetch('http://127.0.0.1:5000/encomenda', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        console.log("✅ Resposta do backend:", data);
        incluirListaEnc(nome, casa, quantidade_p, pacote, cep, endereco);

        alert('Encomenda adicionada com sucesso!');
        limparCamposCadastro();
      } else {
        alert(data.mensagem || "Erro desconhecido ao adicionar a encomenda.");
      }
    })
    .catch((error) => {
      alert("Erro ao conectar com o servidor: " + error.message);
    });
  }
  

/*
  --------------------------------------------------------------------------------------
  Função para limpar os campos após adicionar encomenda
  --------------------------------------------------------------------------------------
*/
const limparCamposCadastro = () => {
  document.getElementById("newNomeEncomenda").value = "";
  document.getElementById("newCasa").value = "";
  document.getElementById("newCep").value = "";
  document.getElementById("newEndereco").value = "";
  document.getElementById("newQuantidade_p").value = "";
  document.getElementById("newPacote").selectedIndex = 0;
}

/*
  --------------------------------------------------------------------------------------
  Função para incluir encomendas na tabela da interface
  --------------------------------------------------------------------------------------
*/
const incluirListaEnc = (nome, casa, quantidade_p, pacote, cep = "", endereco = "") => {
  var table = document.getElementById('tab_enc');
  var row = table.insertRow();
  row.setAttribute('data-encomenda', nome);

  let tipo_pacote = "-";
  if (pacote === "P") tipo_pacote = "Pequeno";
  else if (pacote === "M") tipo_pacote = "Médio";
  else if (pacote === "G") tipo_pacote = "Grande";

  var item = [nome, casa, quantidade_p, tipo_pacote, cep, endereco];
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButtonExclusao(row.insertCell(-1));
  configuraOpEncomenda();
}

/*
  --------------------------------------------------------------------------------------
  Botão de exclusão de encomenda
  --------------------------------------------------------------------------------------
*/
const insertButtonExclusao = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
  span.title = "Excluir encomenda";
}

/*
  --------------------------------------------------------------------------------------
  Define evento de clique no botão de exclusão
  --------------------------------------------------------------------------------------
*/
const configuraOpEncomenda = () => {
  let close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML;
      if (confirm("Deseja realmente excluir " + nomeItem + "?")) {
        deleteEncomenda(nomeItem);
        div.remove();
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar encomenda
  --------------------------------------------------------------------------------------
*/
const deleteEncomenda = (item) => {
  let url = 'http://127.0.0.1:5000/encomenda?nome=' + item;

  fetch(url, { method: 'DELETE' })
    .then((response) => {
      if (response.status === 200) {
        alert('Encomenda excluída com sucesso');
      } else {
        response.json().then((data) => {
          alert(data.mensagem || "Erro desconhecido ao remover o item.");
        });
      }
    })
    .catch((error) => {
      console.log('Error: ', error);
      alert('Erro na solicitação: ' + error.message);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar encomenda via PUT
  --------------------------------------------------------------------------------------
*/
const atualizarEncomenda = () => {
  let data = {
    nome: document.getElementById("putNome").value.trim(),
    casa: document.getElementById("putCasa").value.trim(),
    cep: document.getElementById("putCep").value.trim(),
    endereco: document.getElementById("putEndereco").value.trim(),
    quantidade_p: parseInt(document.getElementById("putQuantidade").value.trim()),
    pacote: document.getElementById("putPacote").value
  };

  if (!data.nome || !data.casa || !data.cep || !data.endereco || isNaN(data.quantidade_p) || !["P", "M", "G"].includes(data.pacote)) {
    alert("Todos os campos são obrigatórios para atualização.");
    return;
  }

  fetch("http://127.0.0.1:5000/encomenda", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        alert("Encomenda atualizada com sucesso!");
        location.reload();
      } else {
        response.json().then((data) => {
          alert(data.mensagem || "Erro ao atualizar encomenda.");
        });
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao atualizar encomenda.");
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para consultar endereço pela API externa ViaCEP (campo de busca por fora)
  --------------------------------------------------------------------------------------
*/
const buscarEndereco = () => {
  let cep = document.getElementById("buscarCepInput").value.trim();

  // Remove qualquer caractere que não seja número
  cep = cep.replace(/\D/g, "");

  console.log("🔍 CEP formatado:", cep); // Para debug

  if (cep.length !== 8) {
    alert("Por favor, insira um CEP válido com 8 dígitos.");
    return;
  }

  fetch(`http://127.0.0.1:5000/endereco?cep=${cep}`)
    .then(response => response.json())
    .then(data => {
      if (data.logradouro) {
        const endereco = `${data.logradouro}, ${data.bairro}, ${data.cidade} - ${data.estado}`;
        document.getElementById("resultadoCep").innerText = endereco;
      } else if (data.mensagem) {
        alert(data.mensagem);
        document.getElementById("resultadoCep").innerText = "";
      } else {
        alert("Erro ao buscar endereço.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao buscar endereço.");
    });
}

