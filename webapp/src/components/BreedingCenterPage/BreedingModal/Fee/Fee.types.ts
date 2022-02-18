import { NFT } from '../../../../modules/nft/types'

export type Props = {
  myNFT: NFT,
  selectedNFT: NFT
  isBreeding: boolean
  onBreed: () => void
  onCancel: () => void
}