async function buscaEndereco(cep){
    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try{
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaJson = await consultaCep.json();  
        if(consultaJson.erro){
            throw Error('CEP não existente!')
        }

        const cidade = document.getElementById('cidade');
        const bairro = document.getElementById('bairro');
        const logradouro = document.getElementById('endereco');
        const estado = document.getElementById('estado');

        cidade.value = consultaJson.localidade;
        bairro.value = consultaJson.bairro;
        logradouro.value = consultaJson.logradouro;
        estado.value = consultaJson.uf;
        console.log(consultaJson)
        return consultaJson;
    } catch(erro){
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
} 


const cep = document.querySelector('#cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));
