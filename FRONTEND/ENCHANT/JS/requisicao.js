// Validação de Formulário - Requisição e Gratuidade ONG
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do formulário
    const form = document.getElementById('formEtapa1');
    const nomeCompleto = document.getElementById('nome-completo');
    const email = document.getElementById('email');
    const cep = document.getElementById('numero-cep');
    const cnpj = document.getElementById('numero-cnpj');
    const complemento = document.getElementById('complemento');
    const btnContinuar = document.getElementById('continuar1');
    
    // Função para mostrar modal de erro
    function mostrarErro(mensagem) {
        const modal = document.getElementById('erroSenhaModal');
        const modalBody = document.getElementById('erroSenhaModalBody');
        const modalTitle = document.getElementById('erroSenhaModalLabel');
        
        modalTitle.textContent = 'Erro de Validação';
        modalBody.innerHTML = `<p>${mensagem}</p>`;
        
        // Mostrar modal usando Bootstrap
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }
    
    // Função para validar nome da ONG
    function validarNome(nome) {
        if (!nome || nome.trim().length < 3) {
            return 'O nome da ONG deve ter pelo menos 3 caracteres.';
        }
        if (nome.trim().length > 100) {
            return 'O nome da ONG deve ter no máximo 100 caracteres.';
        }
        // Verificar se contém apenas letras, números, espaços e alguns caracteres especiais
        const regex = /^[a-zA-ZÀ-ÿ0-9\s\-\.\_\&\(\)]+$/;
        if (!regex.test(nome.trim())) {
            return 'O nome da ONG contém caracteres inválidos.';
        }
        return null;
    }
    
    // Função para validar email
    function validarEmail(email) {
        if (!email || email.trim().length === 0) {
            return 'O campo e-mail é obrigatório.';
        }
        
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email.trim())) {
            return 'Por favor, insira um e-mail válido.';
        }
        
        if (email.trim().length > 100) {
            return 'O e-mail deve ter no máximo 100 caracteres.';
        }
        
        return null;
    }
    
    // Função para validar CEP
    function validarCEP(cep) {
        if (!cep || cep.toString().trim().length === 0) {
            return 'O campo CEP é obrigatório.';
        }
        
        // Remove caracteres não numéricos
        const cepLimpo = cep.toString().replace(/\D/g, '');
        
        if (cepLimpo.length !== 8) {
            return 'O CEP deve conter exatamente 8 dígitos.';
        }
        
        // Verifica se não é uma sequência repetida (ex: 00000000)
        if (/^(\d)\1{7}$/.test(cepLimpo)) {
            return 'Por favor, insira um CEP válido.';
        }
        
        return null;
    }
    
    // Função para validar CNPJ
    function validarCNPJ(cnpj) {
        if (!cnpj || cnpj.toString().trim().length === 0) {
            return 'O campo CNPJ é obrigatório.';
        }
        
        // Remove caracteres não numéricos
        const cnpjLimpo = cnpj.toString().replace(/\D/g, '');
        
        if (cnpjLimpo.length !== 14) {
            return 'O CNPJ deve conter exatamente 14 dígitos.';
        }
        
        // Verifica se não é uma sequência repetida
        if (/^(\d)\1{13}$/.test(cnpjLimpo)) {
            return 'Por favor, insira um CNPJ válido.';
        }
        
        // Algoritmo de validação do CNPJ
        if (!validarDigitosCNPJ(cnpjLimpo)) {
            return 'O CNPJ informado não é válido.';
        }
        
        return null;
    }
    
    // Função auxiliar para validar dígitos verificadores do CNPJ
    function validarDigitosCNPJ(cnpj) {
        const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        
        // Cálculo do primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 12; i++) {
            soma += parseInt(cnpj.charAt(i)) * pesos1[i];
        }
        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;
        
        // Cálculo do segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(cnpj.charAt(i)) * pesos2[i];
        }
        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;
        
        return (parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2);
    }
    
    // Função para validar complemento
    function validarComplemento(complemento) {
        if (!complemento || complemento.trim().length < 10) {
            return 'A descrição deve ter pelo menos 10 caracteres.';
        }
        if (complemento.trim().length > 500) {
            return 'A descrição deve ter no máximo 500 caracteres.';
        }
        return null;
    }
    
    // Função para aplicar máscara ao CEP
    function aplicarMascaraCEP(valor) {
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
        return valor;
    }
    
    // Função para aplicar máscara ao CNPJ
    function aplicarMascaraCNPJ(valor) {
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
        return valor;
    }
    
    // Event listeners para aplicar máscaras em tempo real
    if (cep) {
        cep.addEventListener('input', function(e) {
            e.target.value = aplicarMascaraCEP(e.target.value);
        });
    }
    
    if (cnpj) {
        cnpj.addEventListener('input', function(e) {
            e.target.value = aplicarMascaraCNPJ(e.target.value);
        });
    }
    
    // Função para remover estilos de erro
    function removerErroVisual(campo) {
        campo.style.borderColor = '';
        campo.style.backgroundColor = '';
    }
    
    // Função para adicionar estilos de erro
    function adicionarErroVisual(campo) {
        campo.style.borderColor = '#ff4444';
        campo.style.backgroundColor = '#fff5f5';
    }
    
    // Event listeners para remover erro visual quando o usuário começar a digitar
    [nomeCompleto, email, cep, cnpj, complemento].forEach(campo => {
        if (campo) {
            campo.addEventListener('input', function() {
                removerErroVisual(this);
            });
        }
    });
    
    // Função principal de validação
    function validarFormulario() {
        let temErro = false;
        let mensagensErro = [];
        
        // Validar nome da ONG
        const erroNome = validarNome(nomeCompleto.value);
        if (erroNome) {
            mensagensErro.push(erroNome);
            adicionarErroVisual(nomeCompleto);
            temErro = true;
        } else {
            removerErroVisual(nomeCompleto);
        }
        
        // Validar email
        const erroEmail = validarEmail(email.value);
        if (erroEmail) {
            mensagensErro.push(erroEmail);
            adicionarErroVisual(email);
            temErro = true;
        } else {
            removerErroVisual(email);
        }
        
        // Validar CEP
        const erroCEP = validarCEP(cep.value);
        if (erroCEP) {
            mensagensErro.push(erroCEP);
            adicionarErroVisual(cep);
            temErro = true;
        } else {
            removerErroVisual(cep);
        }
        
        // Validar CNPJ
        const erroCNPJ = validarCNPJ(cnpj.value);
        if (erroCNPJ) {
            mensagensErro.push(erroCNPJ);
            adicionarErroVisual(cnpj);
            temErro = true;
        } else {
            removerErroVisual(cnpj);
        }
        
        // Validar complemento
        const erroComplemento = validarComplemento(complemento.value);
        if (erroComplemento) {
            mensagensErro.push(erroComplemento);
            adicionarErroVisual(complemento);
            temErro = true;
        } else {
            removerErroVisual(complemento);
        }
        
        // Se houver erros, mostrar modal
        if (temErro) {
            const mensagemCompleta = '<strong>Por favor, corrija os seguintes erros:</strong><br><br>' +
                mensagensErro.map(msg => '• ' + msg).join('<br>');
            mostrarErro(mensagemCompleta);
            return false;
        }
        
        return true;
    }
    
    // Event listener para o botão continuar
    if (btnContinuar) {
        btnContinuar.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validarFormulario()) {
                // Se a validação passou, você pode prosseguir para a próxima etapa
                console.log('Formulário válido! Dados prontos para envio.');
                
                // Aqui você pode adicionar a lógica para ir para a próxima etapa
                // Por exemplo, mostrar a próxima seção do formulário
                mostrarProximaEtapa();
            }
        });
    }
    
    // Event listener para o formulário (caso seja submetido via Enter)
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validarFormulario()) {
                console.log('Formulário válido! Dados prontos para envio.');
                mostrarProximaEtapa();
            }
        });
    }
    
    // Função para mostrar próxima etapa (placeholder)
    function mostrarProximaEtapa() {
        // Aqui você implementaria a lógica para ir para o próximo passo
        // Por exemplo, ocultar a etapa atual e mostrar a próxima
        
        const modal = document.getElementById('erroSenhaModal');
        const modalBody = document.getElementById('erroSenhaModalBody');
        const modalTitle = document.getElementById('erroSenhaModalLabel');
        
        modalTitle.textContent = 'Sucesso!';
        modalBody.innerHTML = '<p><i class="fas fa-check-circle" style="color: green;"></i> Dados validados com sucesso! Prosseguindo para a próxima etapa...</p>';
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Simular transição para próxima etapa após 2 segundos
        setTimeout(() => {
            bsModal.hide();
            // Aqui você adicionaria a lógica real para ir para a próxima etapa
        }, 2000);
    }
    
    // Função para buscar CEP na API dos Correios (opcional)
    async function buscarCEP(cep) {
        try {
            const cepLimpo = cep.replace(/\D/g, '');
            if (cepLimpo.length === 8) {
                const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    console.log('Endereço encontrado:', data);
                    // Aqui você pode preencher outros campos com os dados do endereço
                    return data;
                }
            }
        } catch (error) {
            console.log('Erro ao buscar CEP:', error);
        }
        return null;
    }
    
    // Event listener para buscar CEP quando o campo perde o foco
    if (cep) {
        cep.addEventListener('blur', async function() {
            const endereco = await buscarCEP(this.value);
            if (endereco) {
                // Feedback visual de que o CEP foi encontrado
                this.style.borderColor = '#28a745';
                this.style.backgroundColor = '#f8fff8';
            }
        });
    }
    
    // Contador de caracteres para o campo complemento
    if (complemento) {
        const contador = document.createElement('small');
        contador.className = 'form-text text-muted';
        contador.style.textAlign = 'right';
        contador.style.display = 'block';
        contador.style.marginTop = '5px';
        
        complemento.parentNode.appendChild(contador);
        
        function atualizarContador() {
            const caracteres = complemento.value.length;
            contador.textContent = `${caracteres}/500 caracteres`;
            
            if (caracteres > 500) {
                contador.style.color = '#ff4444';
            } else if (caracteres > 450) {
                contador.style.color = '#ff8800';
            } else {
                contador.style.color = '#666';
            }
        }
        
        complemento.addEventListener('input', atualizarContador);
        atualizarContador(); // Inicializar contador
    }
});