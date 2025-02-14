# 🚀 Blockchain & Frontend Integration

## Descripción
Este proyecto es una aplicación completa que combina desarrollo **frontend** con **blockchain**. Permite almacenar y consultar información privada de manera segura mediante un **contrato inteligente** y un sistema de acceso basado en **whitelist**.

## Tecnologías utilizadas
- **Frontend:** Next.js, React, TypeScript, TailwindCSS
- **Blockchain:** Solidity, Hardhat, Web3.js
- **Herramientas adicionales:** MetaMask, Vercel (para despliegue)

## Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Hardhat para el entorno local
Ejecuta el siguiente comando para iniciar un nodo local de Hardhat:
```bash
npx hardhat node
```

### 4. Desplegar el contrato inteligente en la red local
Abre otra terminal y ejecuta:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
Esto desplegará el contrato en la red local de Hardhat.

### 5. Ejecutar la aplicación Next.js
Para iniciar el servidor de desarrollo de Next.js, ejecuta:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

## Conexión con MetaMask
1. Abre MetaMask y cambia la red a **Localhost 8545**.
2. Importa una cuenta de Hardhat usando una clave privada desde la terminal.
3. Refresca la aplicación y conéctala a MetaMask.






