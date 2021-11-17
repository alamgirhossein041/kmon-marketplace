import React from 'react'
import { fromWei } from 'web3x-es/utils'
import { Page } from '@kmon/ui'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet as WalletProvider } from '../Wallet'
import { NFTProviderPage } from '../NFTProviderPage'
import { isOwnedBy } from '../../modules/nft/utils'
import { Order } from '../../modules/order/types'
import { NFT } from '../../modules/nft/types'
import { BuyModal } from './BuyModal'
import { Props } from './BuyPage.types'
import './BuyPage.css'

const BuyPage = (props: Props) => {
  const {
    authorizations,
    isLoading,
    onNavigate,
    onExecuteOrder,
    isExecutingOrder
  } = props

  const isInsufficientKMON = (wallet: Wallet, nft: NFT, order: Order | null) =>
    !!order &&
    wallet.networks[nft.network].kmon < +fromWei(order.price, 'ether')

  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">
        <WalletProvider>
          {wallet => (
            <NFTProviderPage>
              {(nft, order) => (
                <BuyModal
                  nft={nft}
                  order={order}
                  wallet={wallet}
                  authorizations={authorizations}
                  isLoading={isLoading || isExecutingOrder}
                  onNavigate={onNavigate}
                  onExecuteOrder={onExecuteOrder}
                  isOwner={isOwnedBy(nft, wallet)}
                  hasInsufficientKMON={isInsufficientKMON(wallet, nft, order)}
                />
              )}
            </NFTProviderPage>
          )}
        </WalletProvider>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyPage)
