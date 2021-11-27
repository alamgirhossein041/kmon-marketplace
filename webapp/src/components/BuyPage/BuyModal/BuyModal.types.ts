import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'
import { NFT } from '../../../modules/nft/types'
import { Order } from '../../../modules/order/types'
import { executeOrderRequest } from '../../../modules/order/actions'

export type Props = {
  nft: NFT
  order: Order | null
  wallet: Wallet | null
  authorizations: Authorization[]
  isLoading: boolean
  isOwner: boolean
  hasInsufficientCoin: boolean
  onNavigate: (path: string) => void
  onExecuteOrder: typeof executeOrderRequest
}
