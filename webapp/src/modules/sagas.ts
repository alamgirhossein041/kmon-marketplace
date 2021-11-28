import { all } from 'redux-saga/effects'
import { createAuthorizationSaga } from '@kmon/dapps/dist/modules/authorization/sagas'
import { createAnalyticsSaga } from '@kmon/dapps/dist/modules/analytics/sagas'
import { createProfileSaga } from '@kmon/dapps/dist/modules/profile/sagas'
import { transactionSaga } from '@kmon/dapps/dist/modules/transaction/sagas'

import { bidSaga } from './bid/sagas'
import { nftSaga } from './nft/sagas'
import { orderSaga } from './order/sagas'
import { proximitySaga } from './proximity/sagas'
import { routingSaga } from './routing/sagas'
import { tileSaga } from './tile/sagas'
import { toastSaga } from './toast/sagas'
import { translationSaga } from './translation/sagas'
import { uiSaga } from './ui/sagas'
import { walletSaga } from './wallet/sagas'
import { lootboxSaga } from './lootbox/sagas'
import { lootboxPriceSaga } from './lootbox_price/sagas'

const analyticsSaga = createAnalyticsSaga()
// const profileSaga = createProfileSaga({
//   peerUrl: process.env.REACT_APP_PEER_URL!
// })
const authorizationSaga = createAuthorizationSaga()

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    authorizationSaga(),
    bidSaga(),
    nftSaga(),
    orderSaga(),
    //profileSaga(),
    proximitySaga(),
    routingSaga(),
    //tileSaga(),
    toastSaga(),
    transactionSaga(),
    translationSaga(),
    uiSaga(),
    walletSaga(),
    lootboxSaga(),
    lootboxPriceSaga()
  ])
}
