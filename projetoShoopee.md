const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const cart = [];

// Função para formatar moeda
const formatCurrency = (value) => `R$ ${value.toFixed(2)}`;

// Funções de Gerenciamento
const actions = {
    add: (name, price, qty) => {
        const item = { 
            name, 
            price: parseFloat(price), 
            quantity: parseInt(qty),
            subtotal: function() { return this.price * this.quantity }
        };
        cart.push(item);
        console.log(`✅ [${name}] adicionado com sucesso!`);
    },
    
    list: () => {
        if (cart.length === 0) return console.log("\n📭 O carrinho está vazio.");
        
        console.log("\n--- SEU CARRINHO SHOPEE ---");
        let total = 0;
        cart.forEach((item, i) => {
            const sub = item.subtotal();
            total += sub;
            console.log(`${i + 1}. ${item.name.padEnd(15)} | ${item.quantity}x | Un: ${formatCurrency(item.price)} | Sub: ${formatCurrency(sub)}`);
        });
        console.log("----------------------------");
        console.log(`TOTAL A PAGAR: ${formatCurrency(total)}\n`);
    },

    remove: (index) => {
        const i = parseInt(index) - 1;
        if (cart[i]) {
            console.log(`🗑️  Removendo: ${cart[i].name}`);
            cart.splice(i, 1);
        } else {
            console.log("❌ Item não encontrado.");
        }
    }
};

// Menu Principal Loop
function mainMenu() {
    console.log("\nComandos: [1] Adicionar | [2] Listar | [3] Remover | [4] Sair");
    rl.question('Escolha uma opção: ', (opt) => {
        switch (opt) {
            case '1':
                rl.question('Nome do produto: ', (name) => {
                    rl.question('Preço: ', (price) => {
                        rl.question('Quantidade: ', (qty) => {
                            actions.add(name, price, qty);
                            mainMenu();
                        });
                    });
                });
                break;
            case '2':
                actions.list();
                mainMenu();
                break;
            case '3':
                actions.list();
                rl.question('Digite o número do item para remover: ', (idx) => {
                    actions.remove(idx);
                    mainMenu();
                });
                break;
            case '4':
                console.log("Obrigado por comprar na Shopee! 🧡");
                rl.close();
                break;
            default:
                console.log("Opção inválida.");
                mainMenu();
        }
    });
}

mainMenu();
