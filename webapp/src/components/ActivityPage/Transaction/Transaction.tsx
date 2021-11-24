import React from 'react'
import { Link } from 'react-router-dom'
import { T, t } from '@kmon/dapps/dist/modules/translation/utils'
import { TransactionLink, Profile } from '@kmon/dapps/dist/containers'
import {
  GrantTokenSuccessAction,
  GRANT_TOKEN_SUCCESS,
  REVOKE_TOKEN_SUCCESS
} from '@kmon/dapps/dist/modules/authorization/actions'
import { fromWei } from 'web3x-es/utils'

import { getNFTName } from '../../../modules/nft/utils'
import {
  CREATE_ORDER_SUCCESS,
  CANCEL_ORDER_SUCCESS,
  EXECUTE_ORDER_SUCCESS
} from '../../../modules/order/actions'
import { TRANSFER_NFT_SUCCESS } from '../../../modules/nft/actions'
import {
  PLACE_BID_SUCCESS,
  ACCEPT_BID_SUCCESS,
  CANCEL_BID_SUCCESS
} from '../../../modules/bid/actions'
import { locations } from '../../../modules/routing/locations'
import { getContract } from '../../../modules/contract/utils'
import { NFTProvider } from '../../NFTProvider'
import { Kmon } from '../../Kmon'
import { TransactionDetail } from './TransactionDetail'
import { Props } from './Transaction.types'
import { BUY_LOOTBOX_SUCCESS } from '../../../modules/lootbox/actions'
import { toStringLootboxType } from '../../../modules/lootbox/utils'

const Transaction = (props: Props) => {
  const { tx } = props
  switch (tx.actionType) {
    case GRANT_TOKEN_SUCCESS: {
      const { authorization } = tx.payload as GrantTokenSuccessAction['payload']
      const authorized = getContract({
        address: authorization.authorizedAddress
      })
      const contract = getContract({ address: authorization.contractAddress })
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.approve_token"
              values={{
                action: t('transaction.action.approved'),
                contract: (
                  <TransactionLink
                    chainId={authorization.chainId}
                    address={authorized.address}
                    txHash=""
                  >
                    {authorized.name}
                  </TransactionLink>
                ),
                token: (
                  <TransactionLink
                    chainId={authorization.chainId}
                    address={contract.address}
                    txHash=""
                  >
                    {contract.name}
                  </TransactionLink>
                )
              }}
            />
          }
          tx={tx}
        />
      )
    }
    case REVOKE_TOKEN_SUCCESS: {
      const { authorization } = tx.payload as GrantTokenSuccessAction['payload']
      const authorized = getContract({
        address: authorization.authorizedAddress
      })
      const contract = getContract({ address: authorization.contractAddress })
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.approve_token"
              values={{
                action: t('transaction.action.not_approved'),
                contract: (
                  <TransactionLink
                    chainId={authorization.chainId}
                    address={authorized.address}
                    txHash=""
                  >
                    {authorized.name}
                  </TransactionLink>
                ),
                token: (
                  <TransactionLink
                    chainId={authorization.chainId}
                    address={contract.address}
                    txHash=""
                  >
                    {contract.name}
                  </TransactionLink>
                )
              }}
            />
          }
          tx={tx}
        />
      )
    }
    case CREATE_ORDER_SUCCESS: {
      const { tokenId, contractAddress, network, name, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.create_order"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: (
                      <Kmon network={network} inline>
                        {price.toLocaleString()}
                      </Kmon>
                    )
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case CANCEL_ORDER_SUCCESS: {
      const { tokenId, contractAddress, network, name, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.cancel_order"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: (
                      <Kmon network={network} inline>
                        {price.toLocaleString()}
                      </Kmon>
                    )
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case EXECUTE_ORDER_SUCCESS: {
      const { tokenId, contractAddress, network, name, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.execute_order"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: (
                      <Kmon network={network} inline>
                        {price.toLocaleString()}
                      </Kmon>
                    )
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case TRANSFER_NFT_SUCCESS: {
      const { tokenId, contractAddress, name, address } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.transfer"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    address: (
                      <Link to={locations.account(address)}>
                        <Profile address={address} />
                      </Link>
                    )
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case PLACE_BID_SUCCESS: {
      const { tokenId, contractAddress, price } = tx.payload

      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.place_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price: <Kmon inline>{price.toLocaleString()}</Kmon>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case ACCEPT_BID_SUCCESS: {
      const { tokenId, contractAddress, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.accept_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price: <Kmon inline>{price.toLocaleString()}</Kmon>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case CANCEL_BID_SUCCESS: {
      const { tokenId, contractAddress, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.cancel_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price: <Kmon inline>{price.toLocaleString()}</Kmon>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case BUY_LOOTBOX_SUCCESS: {
      const { boxType, boxPrice } = tx.payload
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.buy_lootbox"
              values={{
                name: (
                  toStringLootboxType(boxType)
                ),
                price: <Kmon inline>{fromWei(boxPrice, 'ether').toLocaleString()}</Kmon>
              }}
            />
          }
          tx={tx}
        />
      )
    }
    default:
      return null
  }
}

export default React.memo(Transaction)
