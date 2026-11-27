
// Endereço base da API Flask
const API_URL = "http://127.0.0.1:5000";

// Elementos HTML utilizados na busca
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const fishList = document.getElementById("fishList");
const fishDetails = document.getElementById("fishDetails");
const fishInfo = document.getElementById("fishInfo");

// Elementos HTML utilizados nos relatos
const fishingReports = document.getElementById("fishingReports");
const reportList = document.getElementById("reportList");

// Elementos HTML utilizados no cadastro de relatos
const addReportBtn = document.getElementById("addReportBtn");
const reportFormSection = document.getElementById("reportFormSection");
const reportForm = document.getElementById("reportForm");
const cancelBtn = document.getElementById("cancelBtn");

// Armazena o ID do peixe selecionado
let peixeSelecionado = null;

// Executa a busca ao clicar no botão
searchBtn.addEventListener("click", buscarPeixes);

// Abre o formulário de cadastro
addReportBtn.addEventListener("click", () => {
    if (peixeSelecionado !== null) {
        reportFormSection.hidden = false;
    }
});

// Cancela o cadastro do relato
cancelBtn.addEventListener("click", () => {
    reportForm.reset();
    reportFormSection.hidden = true;
});

// Consulta os peixes cadastrados na API
async function buscarPeixes() {
    const nome = searchInput.value.trim();

    fishList.innerHTML = "";
    // Limpa os detalhes e relatos da busca anterior
    fishDetails.hidden = true;
    fishInfo.textContent = "";

    fishingReports.hidden = true;
    reportList.textContent = "";
    // Reinicia o formulário e a seleção do peixe
    reportFormSection.hidden = true;
    reportForm.reset();
    peixeSelecionado = null;

    try {
        const response = await fetch(
            `${API_URL}/peixes?nome=${encodeURIComponent(nome)}`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar peixes.");
        }

        const peixes = await response.json();

        // Exibe automaticamente os detalhes de um único peixe
        if (peixes.length === 1) {
            await detalharPeixe(peixes[0].id_peixe);
        } else {
            exibirPeixes(peixes);
        }

    } catch (erro) {
        fishList.textContent = "Não foi possível consultar a API.";
        console.error(erro);
    }
}

// Cria os cards dos peixes encontrados
function exibirPeixes(peixes) {
    if (peixes.length === 0) {
        fishList.textContent = "Nenhum peixe encontrado.";
        return;
    }

    peixes.forEach(peixe => {
        const card = document.createElement("div");
        card.className = "fish-card";

        const titulo = document.createElement("h3");
        titulo.textContent = peixe.nome_peixe;

        const tipoAgua = document.createElement("p");
        tipoAgua.textContent = `Tipo de água: ${peixe.tipo_agua}`;

        card.appendChild(titulo);
        card.appendChild(tipoAgua);

// Botão para consultar os detalhes do peixe
const botao = document.createElement("button");
botao.textContent = "Ver detalhes";

botao.addEventListener("click", () => {
    detalharPeixe(peixe.id_peixe);
});

card.appendChild(botao);
        fishList.appendChild(card);
    });
}


// Consulta os detalhes do peixe selecionado
async function detalharPeixe(idPeixe) {
    fishDetails.hidden = true;
    fishInfo.textContent = "";
    // Limpa a seleção e o formulário anteriores
    peixeSelecionado = null;
    reportFormSection.hidden = true;
    reportForm.reset();

    try {
        const response = await fetch(
            `${API_URL}/peixes/${idPeixe}`
        );

        if (!response.ok) {
            throw new Error("Erro ao consultar o peixe.");
        }

        const peixe = await response.json();
        // Armazena o ID do peixe consultado
        peixeSelecionado = peixe.id_peixe;

        const detalhes = [
            ["Nome", peixe.nome_peixe],
            ["Tipo de água", peixe.tipo_agua],
            ["Região", peixe.regiao],
            ["Descrição", peixe.descricao],
            ["Iscas naturais", peixe.isca_natural],
            ["Iscas artificiais", peixe.isca_artificial],
            ["Dicas de pesca", peixe.dicas]
        ];

        detalhes.forEach(([titulo, valor]) => {
            const paragrafo = document.createElement("p");

            paragrafo.textContent =
                `${titulo}: ${valor || "Não informado"}`;

            fishInfo.appendChild(paragrafo);
        });
        
        fishDetails.hidden = false;
        // Consulta os relatos associados ao peixe
        await listarPescarias(idPeixe);

    } catch (erro) {
        fishInfo.textContent =
            "Não foi possível consultar os detalhes do peixe.";

        fishDetails.hidden = false;
        console.error(erro);
    }
}

// Consulta os relatos associados ao peixe
async function listarPescarias(idPeixe) {
    fishingReports.hidden = true;
    reportList.textContent = "";

    try {
        const response = await fetch(
            `${API_URL}/peixes/${idPeixe}/pescarias`
        );

        if (!response.ok) {
            throw new Error("Erro ao consultar relatos.");
        }

        const pescarias = await response.json();

        exibirPescarias(pescarias);
        fishingReports.hidden = false;

    } catch (erro) {
        reportList.textContent =
            "Não foi possível consultar os relatos.";

        fishingReports.hidden = false;
        console.error(erro);
    }
}


// Cria os cards dos relatos de pescarias
function exibirPescarias(pescarias) {
    if (pescarias.length === 0) {
        reportList.textContent = "Nenhum relato cadastrado.";
        return;
    }

    pescarias.forEach(pescaria => {
        const card = document.createElement("div");
        card.className = "report-card";

        const titulo = document.createElement("h3");
        titulo.textContent = pescaria.nome_pescador;

        card.appendChild(titulo);

        const detalhes = [
            ["Isca utilizada", pescaria.isca_utilizada],
            ["Data", pescaria.data],
            ["Local", pescaria.local],
            ["Observação", pescaria.observacao]
        ];

        detalhes.forEach(([titulo, valor]) => {
            const paragrafo = document.createElement("p");
            paragrafo.textContent =
                `${titulo}: ${valor || "Não informado"}`;

            card.appendChild(paragrafo);
        });

        reportList.appendChild(card);
    });
}


