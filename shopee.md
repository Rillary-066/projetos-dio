// ==========================================
// 🛒 SISTEMA DE CARRINHO SHOPEE (TERMINAL)
// ==========================================

/**
 * 📦 Fábrica de Itens
 * Cria a estrutura de um produto com cálculo de subtotal
 */
async function createItem(name, price, quantity) {
    return {
        name,
        price,
        quantity,
        subtotal: function () {
            return this.price * this.quantity;
        },
    };
}

/**
 * ⚙️ Cart Service
 * Gerencia todas as regras de negócio do carrinho
 */
const cartService = {
    FRETE_FIXO: 15.00,
    VALOR_MINIMO_FRETE_GRATIS: 100.00,

    // Adiciona item ao carrinho
    async addItem(cart, item) {
        cart.push(item);
        console.log(`✅ Adicionado ao carrinho: ${item.name}`);
    },

    // Remove uma unidade ou exclui se chegar a zero
    async removeItem(cart, itemName) {
        const index = cart.findIndex((item) => item.name === itemName);

        if (index === -1) {
            console.log("❌ Item não encontrado no carrinho.");
            return;
        }

        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            console.log(`➖ Removida 1 unidade de: ${itemName}`);
        } else {
            cart.splice(index, 1);
            console.log(`🗑️ ${itemName} foi removido do carrinho.`);
        }
    },

    // Deleta o item completamente
    async deleteItem(cart, itemName) {
        const index = cart.findIndex((item) => item.name === itemName);
        if (index !== -1) {
            cart.splice(index, 1);
            console.log(`🚮 Item deletado: ${itemName}`);
        }
    },

    // Exibe o resumo do carrinho e cálculos de frete
    async displayCart(cart) {
        console.log("\n" + "=".repeat(50));
        console.log("🧡 SHOPEE CLONE - SEU CARRINHO");
        console.log("=".repeat(50));

        if (cart.length === 0) {
            console.log("Seu carrinho está vazio. Que tal umas comprinhas? 🛍️");
            return;
        }

        cart.forEach((item, index) => {
            console.log(
                `${index + 1}. ${item.name.padEnd(15)} | R$ ${item.price.toFixed(2)} | Qtd: ${item.quantity} | Sub: R$ ${item.subtotal().toFixed(2)}`
            );
        });

        // Lógica de Totais e Frete
        const totalProdutos = cart.reduce((acc, item) => acc + item.subtotal(), 0);
        const temFreteGratis = totalProdutos >= this.VALOR_MINIMO_FRETE_GRATIS;
        const custoFrete = temFreteGratis ? 0 : this.FRETE_FIXO;
        const totalPagar = totalProdutos + custoFrete;

        console.log("-".repeat(50));
        console.log(`Subtotal Produtos: R$ ${totalProdutos.toFixed(2)}`);
        console.log(`Frete:             ${temFreteGratis ? "GRÁTIS! 🎉" : "R$ " + custoFrete.toFixed(2)}`);
        
        if (!temFreteGratis) {
            const faltaParaGratis = this.VALOR_MINIMO_FRETE_GRATIS - totalProdutos;
            console.log(`💡 Dica: Adicione mais R$ ${faltaParaGratis.toFixed(2)} para ganhar FRETE GRÁTIS!`);
        }

        console.log("-".repeat(50));
        console.log(`💰 TOTAL FINAL:     R$ ${totalPagar.toFixed(2)}`);
        console.log("=".repeat(50) + "\n");
    }
};

/**
 * 🚀 Execução da Simulação
 */
(async function main() {
    const meuCarrinho = [];

    // Criando produtos
    const produto1 = await createItem("Fone Bluetooth", 45.90, 1);
    const produto2 = await createItem("Capa Silicone", 12.00, 2);
    const produto3 = await createItem("Mouse Pad RGB", 120.00, 1);

    // Adicionando ao carrinho
    await cartService.addItem(meuCarrinho, produto1);
    await cartService.addItem(meuCarrinho, produto2);
    
    // Mostra carrinho com frete pago
    await cartService.displayCart(meuCarrinho);

    // Adiciona item caro para liberar frete grátis
    console.log("--- Adicionando item para liberar frete grátis ---");
    await cartService.addItem(meuCarrinho, produto3);
    await cartService.displayCart(meuCarrinho);

    // Removendo um item
    await cartService.removeItem(meuCarrinho, "Capa Silicone");
    await cartService.displayCart(meuCarrinho);

    console.log("Obrigado por comprar na Shopee! 😊");
})();
