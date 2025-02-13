const hre = require("hardhat");

async function main() {
  console.log("Desplegando contrato...");

  // Obtener el contrato compilado
  const Contract = await hre.ethers.getContractFactory("PrivateInfoStorage");

  // Desplegar el contrato
  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  console.log("Contrato desplegado en:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
