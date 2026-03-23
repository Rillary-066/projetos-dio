/**
 * GERADOR DE QR CODE PARA E-COMMERCE (CLI)
 * Dependências: npm install qrcode inquirer
 */

const QRCode = require('qrcode');
const inquirer = require('inquirer');
const fs = require('fs');

async function gerarQRCodeEcommerce() {
    console.log('\n=========================================');
    console.log('🛒 GERADOR DE QR CODE - VENDAS ONLINE');
    console.log('=========================================\n');

    try {
        // Perguntas interativas no terminal
        const dados = await inquirer.prompt([
            {
                type: 'input',
                name: 'url',
                message: 'Cole a URL do produto/página de vendas:',
                validate: (input) => {
                    return input.startsWith('http') ? true : '⚠️ Digite uma URL válida (começando com http ou https)';
                }
            },
            {
                type: 'input',
                name: 'arquivo',
                message: 'Dê um nome para o arquivo (sem extensão):',
                default: 'qrcode_produto'
            },
            {
                type: 'list',
                name: 'cor',
                message: 'Escolha a cor do QR Code:',
                choices: [
                    { name: 'Preto (Padrão)', value: '#000000' },
                    { name: 'Azul E-commerce', value: '#0056b3' },
                    { name: 'Verde Sucesso', value: '#28a745' }
                ]
            }
        ]);

        const caminhoFinal = `${dados.arquivo}.png`;

        // Configurações técnicas do QR Code
        const opcoes = {
            errorCorrectionLevel: 'H', // Alta resiliência para impressão
            margin: 2,
            scale: 10, // Define uma boa resolução para impressão
            color: {
                dark: dados.cor,
                light: '#FFFFFF'
            }
        };

        // Geração do arquivo
        await QRCode.toFile(caminhoFinal, dados.url, opcoes);

        console.log('\n-----------------------------------------');
        console.log(`✨ QR Code gerado com sucesso!`);
        console.log(`📂 Arquivo: ${caminhoFinal}`);
        console.log(`🔗 Link: ${dados.url}`);
        console.log('-----------------------------------------\n');

    } catch (erro) {
        console.error('\n❌ Ocorreu um erro ao gerar o código:', erro.message);
    }
}

// Inicializa a aplicação
gerarQRCodeEcommerce();
