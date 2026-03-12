// ===============================
// Configuração dos Jogadores
// ===============================

const player1 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
  TEM_ESTRELA: false,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
  TEM_ESTRELA: false,
};

// ===============================
// Funções Utilitárias
// ===============================

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
  const random = Math.random();

  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

function logRollResult(name, attribute, dice, value) {
  console.log(`${name} 🎲 rolou ${dice} + ${attribute} (${value}) = ${dice + value}`);
}

// ===============================
// Sorteio de Item de Ataque
// ===============================

function drawAttackItem() {
  if (Math.random() < 0.5) {
    return {
      nome: "CASCO",
      dano: 1,
      emoji: "🐢",
    };
  }

  return {
    nome: "BOMBA",
    dano: 2,
    emoji: "💣",
  };
}

// ===============================
// Sistema de Confronto
// ===============================

function handleBattle(character1, character2, dice1, dice2) {
  const power1 = dice1 + character1.PODER;
  const power2 = dice2 + character2.PODER;

  console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

  logRollResult(character1.NOME, "PODER", dice1, character1.PODER);
  logRollResult(character2.NOME, "PODER", dice2, character2.PODER);

  let winner = null;
  let loser = null;

  if (power1 > power2) {
    winner = character1;
    loser = character2;
  } else if (power2 > power1) {
    winner = character2;
    loser = character1;
  }

  if (!winner) {
    console.log("Confronto empatado! 🤝");
    return;
  }

  console.log(`${winner.NOME} venceu o confronto!`);

  // Turbo
  console.log(`🚀 ${winner.NOME} ganhou um TURBO! (+1 ponto)`);
  winner.PONTOS++;

  // Chance de ganhar estrela
  if (Math.random() < 0.25) {
    winner.TEM_ESTRELA = true;
    console.log(`🌟 ${winner.NOME} ganhou uma ESTRELA de proteção!`);
  }

  // Penalidade para perdedor
  if (loser.TEM_ESTRELA) {
    console.log(`🌈 ${loser.NOME} usou a ESTRELA e ignorou o ataque!`);
    loser.TEM_ESTRELA = false;
  } else {
    const item = drawAttackItem();

    console.log(
      `${loser.NOME} foi atingido por ${item.nome}! ${item.emoji} (-${item.dano} ponto(s))`
    );

    loser.PONTOS = Math.max(0, loser.PONTOS - item.dano);
  }
}

// ===============================
// Mecânica da Corrida
// ===============================

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);

    const block = getRandomBlock();
    console.log(`Bloco: ${block}`);

    const dice1 = rollDice();
    const dice2 = rollDice();

    let total1 = 0;
    let total2 = 0;

    if (block === "RETA") {
      total1 = dice1 + character1.VELOCIDADE;
      total2 = dice2 + character2.VELOCIDADE;

      logRollResult(character1.NOME, "VELOCIDADE", dice1, character1.VELOCIDADE);
      logRollResult(character2.NOME, "VELOCIDADE", dice2, character2.VELOCIDADE);
    }

    if (block === "CURVA") {
      total1 = dice1 + character1.MANOBRABILIDADE;
      total2 = dice2 + character2.MANOBRABILIDADE;

      logRollResult(character1.NOME, "MANOBRABILIDADE", dice1, character1.MANOBRABILIDADE);
      logRollResult(character2.NOME, "MANOBRABILIDADE", dice2, character2.MANOBRABILIDADE);
    }

    if (block === "CONFRONTO") {
      handleBattle(character1, character2, dice1, dice2);
    }

    if (block !== "CONFRONTO") {
      if (total1 > total2) {
        console.log(`${character1.NOME} ganhou vantagem! (+1 ponto)`);
        character1.PONTOS++;
      } else if (total2 > total1) {
        console.log(`${character2.NOME} ganhou vantagem! (+1 ponto)`);
        character2.PONTOS++;
      } else {
        console.log("Empate na rodada!");
      }
    }

    console.log("---------------------------------------------");
  }
}

// ===============================
// Resultado Final
// ===============================

function declareWinner(character1, character2) {
  console.log("\n🏁 Resultado Final");

  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`🏆 ${character1.NOME} venceu a corrida!`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`🏆 ${character2.NOME} venceu a corrida!`);
  } else {
    console.log("🤝 A corrida terminou em empate!");
  }
}

// ===============================
// Execução
// ===============================

(async function main() {
  console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

  await playRaceEngine(player1, player2);

  declareWinner(player1, player2);
})();

👻
