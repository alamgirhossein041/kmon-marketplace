import { ChainId, Network } from '@kmon/schemas'
import { getContract, ContractName as CN } from '@kmon/transactions'
import {
  Contract,
  ContractService as ContractServiceInterface
} from '../services'
import { Network as AppNetwork } from '../../contract/types'
import { TransferType } from '../types'
import { nftAPI } from './nft'

const network = process.env.REACT_APP_NETWORK! as AppNetwork

export enum ContractName {
  KMONToken = 'KMON',
  MARKETPLACE = 'Marketplace',
  ERC721Bid = 'ERC721Bid',
  Lootbox = 'Lootbox',
  WBNB = 'WBNB'
}

const contracts = ({
  [AppNetwork.RINKEBY]: [
    {
      name: ContractName.KMONToken,
      address: getContract(CN.KMONToken, ChainId.ETHEREUM_RINKEBY).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_RINKEBY
    },
    {
      name: ContractName.ERC721Bid,
      address: getContract(CN.ERC721Bid, ChainId.ETHEREUM_RINKEBY).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_RINKEBY
    },
    {
      name: ContractName.MARKETPLACE,
      address: getContract(CN.Marketplace, ChainId.ETHEREUM_RINKEBY).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_RINKEBY
    },
    {
      name: ContractName.Lootbox,
      address: getContract(CN.Lootbox, ChainId.ETHEREUM_RINKEBY).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_RINKEBY
    },
    {
      name: ContractName.WBNB,
      address: getContract(CN.WBNB, ChainId.ETHEREUM_RINKEBY).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_RINKEBY
    }
  ],
  [AppNetwork.BSC_MAINNET]: [
    {
      name: ContractName.KMONToken,
      address: getContract(CN.KMONToken, ChainId.BSC_MAINNET).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.BSC,
      chainId: ChainId.BSC_MAINNET
    },
    {
      name: ContractName.ERC721Bid,
      address: getContract(CN.ERC721Bid, ChainId.BSC_MAINNET).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.BSC,
      chainId: ChainId.BSC_MAINNET
    },
    {
      name: ContractName.MARKETPLACE,
      address: getContract(CN.Marketplace, ChainId.BSC_MAINNET).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.BSC,
      chainId: ChainId.BSC_MAINNET
    },
    {
      name: ContractName.Lootbox,
      address: getContract(CN.Lootbox, ChainId.BSC_MAINNET).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.BSC,
      chainId: ChainId.BSC_MAINNET
    },
    {
      name: ContractName.WBNB,
      address: getContract(CN.WBNB, ChainId.BSC_MAINNET).address,
      vendor: 'kryptomon',
      category: null,
      network: Network.BSC,
      chainId: ChainId.BSC_MAINNET
    }
  ],
  [AppNetwork.BSC_TESTNET]: []
} as Record<AppNetwork, Contract[]>)[network]

export class ContractService implements ContractServiceInterface {
  contracts = contracts

  hasFetched = false

  async build() {
    if (this.hasFetched) {
      return
    }

    const contracts = await nftAPI.fetchContracts()
    for (const contract of contracts) {
      this.contracts.push(contract)
    }

    this.hasFetched = true
  }

  getContracts() {
    return this.contracts
  }

  getTransferType(_address: string) {
    return TransferType.SAFE_TRANSFER_FROM
  }
}
