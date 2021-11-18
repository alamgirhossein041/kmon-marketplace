import { takeEvery, all, put } from 'redux-saga/effects'
import { Network } from '@kmon/schemas'
import { createWalletSaga } from '@kmon/dapps/dist/modules/wallet/sagas'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS,
  ChangeAccountAction,
  ChangeNetworkAction,
  CHANGE_ACCOUNT,
  CHANGE_NETWORK
} from '@kmon/dapps/dist/modules/wallet/actions'
import { fetchAuthorizationsRequest } from '@kmon/dapps/dist/modules/authorization/actions'
import {
  Authorization,
  AuthorizationType
} from '@kmon/dapps/dist/modules/authorization/types'

import { getContractNames } from '../vendor'
import { contracts, getContract } from '../contract/utils'
import { isPartner } from '../vendor/utils'
import { ContractName } from '@kmon/transactions'

const baseWalletSaga = createWalletSaga({
  CHAIN_ID: +(process.env.REACT_APP_CHAIN_ID || 1),
  POLL_INTERVAL: 0
})

export function* walletSaga() {
  yield all([baseWalletSaga(), fullWalletSaga()])
}

function* fullWalletSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleWallet)
  yield takeEvery(CHANGE_ACCOUNT, handleWallet)
  yield takeEvery(CHANGE_NETWORK, handleWallet)
}

function* handleWallet(
  action: ConnectWalletSuccessAction | ChangeAccountAction | ChangeNetworkAction
) {
  const { address } = action.payload.wallet

  const contractNames = getContractNames()

  const marketplace = getContract({
    name: contractNames.MARKETPLACE,
    network: Network.ETHEREUM
  })

  const erc721Bid = getContract({
    name: contractNames.ERC721Bid
  })

  const kmon = getContract({
    name: contractNames.KMONToken,
    network: Network.ETHEREUM
  })

  const authorizations: Authorization[] = []

  authorizations.push({
    address,
    authorizedAddress: marketplace.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  })

  authorizations.push({
    address,
    authorizedAddress: erc721Bid.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  })

  yield put(fetchAuthorizationsRequest(authorizations))
}
