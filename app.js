var botaoEnviar = document.querySelector('#app form button')
var campoCep = document.querySelector('#app form input')
var conteudo = document.querySelector('#app main')

botaoEnviar.addEventListener('click', run)

function run (event) {
    event.preventDefault()

    var cep = campoCep.value

    cep = cep.replace(' ', '')
    cep = cep.replace('.', '')
    cep = cep.trim()

    axios.get('https://viacep.com.br/ws/' + cep + '/json/')
    .then(function (response) {
        if (response.data.erro) {
            conteudo.innerHTML = ''
            throw new Error('CEP inválido!')
        }else {
            conteudo.innerHTML = ''
            criarLinha(response.data.logradouro)
            criarLinha(response.data.bairro)
            criarLinha(response.data.localidade + '/' + response.data.uf)
        }
    })
    .catch(function (error) {
        conteudo.innerHTML = ''
        criarLinha('Ops, algo deu errado!')
    })
}

function criarLinha(texto) {
    var linha = document.createElement('p')
    var texto = document.createTextNode(texto)

    linha.appendChild(texto)
    conteudo.appendChild(linha)
}