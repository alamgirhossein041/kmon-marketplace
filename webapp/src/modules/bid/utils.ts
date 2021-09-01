import { Address } from 'web3x-es/address'
import { Eth } from 'web3x-es/eth'
import { getConnectedProvider } from '@kmon/dapps/dist/lib/eth'
import { Network } from '@kmon/schemas'
import { MANA } from '../../contracts/MANA'
import { Bid } from './types'
import { getContractNames } from '../vendor'
import { getContract } from '../contract/utils'

export async function isInsufficientMANA(bid: Bid) {
  try {
    const provider = await getConnectedProvider()
    if (!provider) {
      throw new Error('Could not connect to provider')
    }
    const eth = new Eth(provider)

    const contractNames = getContractNames()

    const { address } = getContract({
      name: contractNames.MANA,
      network: Network.ETHEREUM
    })

    const mana = new MANA(eth, Address.fromString(address))

    const balance = await mana.methods
      .balanceOf(Address.fromString(bid.bidder))
      .call()

    return +balance < +bid.price
  } catch (error) {
    // @ts-ignore
    console.warn(error.message)
  }
  return false
}

export function checkFingerprint(bid: Bid, fingerprint: string | undefined) {
  if (fingerprint && bid.fingerprint) {
    return fingerprint === bid.fingerprint
  }
  return true
}

export function toBidObject(bids: Bid[]) {
  return bids.reduce((obj, bid) => {
    obj[bid.id] = bid
    return obj
  }, {} as Record<string, Bid>)
}
