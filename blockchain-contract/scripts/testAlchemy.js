const alchemy = require("../alchemyConfig.js");


async function testAlchemy() {
  try {
    const latestBlock = await alchemy.core.getBlockNumber();
    console.log("Último bloque en la red:", latestBlock);
  } catch (error) {
    console.error("Error al conectar con Alchemy:", error);
  }
}

testAlchemy();
