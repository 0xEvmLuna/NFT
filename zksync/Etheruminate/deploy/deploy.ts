import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
require("dotenv").config()

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {

  // Initialize the wallet.
  const wallet = new Wallet("517a2ddd5f34f09aa835985ec24766115532bdf0a6d2db1c48bca949d746fd6f");
                             
  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Etheruminate");

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  const deploymentFee = await deployer.estimateDeployFee(artifact, []);
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: deploymentFee,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  const EtheruminateContract = await deployer.deploy(artifact, []);

  // Show the contract info.
  const contractAddress = EtheruminateContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
