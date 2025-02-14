"use client"; 

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";


declare global {
  interface Window {
    ethereum: {
      request: (args: { method: string }) => Promise<unknown>;
    };
  }
}
import { ethers } from "ethers";
import { motion } from "framer-motion"; 


const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Dirección del contrato desplegado localmente puede cambiar actualizar aqui

const HomePage = () => {
  const [ethProvider, setEthProvider] = useState<ethers.JsonRpcProvider | null>(
    null
  );
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userData, setUserData] = useState<string>("");
  const [newUserData, setNewUserData] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  useEffect(() => {
    const init = async () => {
      const _provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      setEthProvider(_provider);

      const contractABI = [
        "function storePrivateInfo(string memory _info) public",
        "function getPrivateInfo(address _address) public view returns (string memory)",
        "function whitelist(address) public view returns (bool)",
      ];
      const _contract = new ethers.Contract(
        contractAddress,
        contractABI,
        _provider
      );
      console.log("Contrato cargado:", _contract);
      setContract(_contract);
    };

    init();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress((accounts as string[])[0]);
        console.log("Cuenta conectada:", (accounts as string[])[0]);
      } catch (err) {
        console.error("Error al conectar la billetera:", err);
      }
    } else {
      console.log("MetaMask no está instalado");
    }
  };

  const storeUserData = async () => {
    if (!contract || !ethProvider) {
      console.error(
        "⚠️ No se encontró el contrato o el proveedor de Ethereum."
      );
      return;
    }

    if (!newUserData.trim()) {
      console.warn("⚠️ No se puede almacenar un dato vacío.");
      return;
    }

    try {
      
      const signer = await ethProvider.getSigner();
      const contractWithSigner = contract.connect(signer) as ethers.Contract;

      console.log("🚀 Enviando transacción para almacenar información...");

      const tx = await contractWithSigner.storePrivateInfo(newUserData);
      console.log(" Transacción enviada:", tx.hash);

      await tx.wait();
      
      localStorage.setItem("userStoredData", newUserData);

      setNewUserData("");
      setShowModal2(true);

      setTimeout(() => {
        setShowModal2(false);
      }, 4000);
    } catch (err) {
      console.error(" Error al almacenar los datos:", err);
    }
  };

  const getUserData = async () => {
    setShowModal(true);
    setTimeout(async () => {
      setShowModal(false);

      if (!contract || !userAddress) {
        setUserData("Error: Datos no disponibles.");
        return;
      }

      try {
        const isWhitelisted = await contract.whitelist(userAddress);
        if (!isWhitelisted) {
          setUserData("Acceso denegado: No estás en la whitelist.");
          return;
        }

        const storedData = localStorage.getItem("userStoredData");
        setUserData(storedData ? storedData : "No se encontraron datos.");
      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setUserData("Error al obtener los datos.");
      }
    }, 3000);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-green-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-white">
          Conectar Billetera
        </h1>
        <motion.button
          onClick={connectWallet}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-green-700 to-green-900 text-white rounded-lg text-lg shadow-md hover:bg-green-800 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Conectar Wallet
        </motion.button>

        {userAddress && (
          <div className="mt-4 flex items-center justify-center gap-2 font-medium text-gray-400 text-sm">
            <p>
              Cuenta conectada: {showAddress ? userAddress : "••••••••••••••••"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="focus:outline-none"
            >
              {showAddress ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        )}
      </motion.div>

      <motion.div className="mt-12 w-full max-w-md">
        <h3 className="text-xl font-medium text-gray-200">
          Almacenar Información Privada
        </h3>
        <input
          type="text"
          value={newUserData}
          onChange={(e) => setNewUserData(e.target.value)}
          placeholder="Introduce datos privados"
          className="mt-4 w-full p-4 text-gray-800 bg-gray-200 border border-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600"
        />
        <motion.button
          onClick={storeUserData}
          className="mt-6 px-6 py-3 w-full bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg text-lg shadow-md hover:bg-green-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Almacenar Datos
        </motion.button>
      </motion.div>
      {showModal2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg font-semibold">
              Datos almacenados con éxito.
            </p>
          </motion.div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Obteniendo datos...</p>
          </motion.div>
        </div>
      )}

      <motion.div className="mt-12 w-full max-w-md">
        <h3 className="text-xl font-medium text-gray-200">
          Consultar Información Privada
        </h3>
        <motion.button
          onClick={getUserData}
          className="mt-6 px-6 py-3 w-full bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg text-lg shadow-md hover:bg-green-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Obtener Datos
        </motion.button>
        <p className="mt-4 text-gray-400">Datos: {userData}</p>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
