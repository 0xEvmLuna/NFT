## env install
```
yarn
```

## run  script
### .env
```
PRIVATE_KEY=142sgsd54G54s5df
```

```
deploy/deploy.ts
const wallet = new Wallet("142sgsd54G54s5df"); 
```
```
npx hardhat clean
npx hardhat compile
yarn hardhat deploy-zksync

success console:
Etheruminate was deployed to 0x547178989F3681A55ecA44e503F31112F00faEB5
```

## verify contract
### example
- --contract [file:contractname]
- --network [network] zkTestnet/zksyncnet
```
yarn hardhat verify --network zkTestnet 0x547178989F3681A55ecA44e503F31112F00faEB5 --contract contracts/Etheruminate.sol:Etheruminate

https://goerli.explorer.zksync.io/address/0x99c5100006299AdeCd2d6e072ea25500876b60d0#contract
```
