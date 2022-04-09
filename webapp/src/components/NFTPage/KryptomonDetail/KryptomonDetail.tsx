import React, { useState, SyntheticEvent, useEffect } from 'react'
import { Container } from '@kmon/ui'
import { Dropdown, Progress } from 'semantic-ui-react'
import { t, getCurrentLocale } from '@kmon/dapps/dist/modules/translation/utils'
import Web3 from 'web3'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Props } from './KryptomonDetail.types'
import './KryptomonDetail.css'
import { NFTDetailCard } from '../../NFTDetailCard'
import { Elements } from '../Elements'
import { BreedingInfo } from "../BreedingInfo";
import { TitleBlock } from '../TitleBlock'
import { DescriptionBlock } from '../DescriptionBlock'
import { Details } from '../Details'
import { DNAChart } from '../DNAChart'
import { DNAChartDefault} from '../DNAChartDefault'
import { ElemData } from '../ElemData'
import { MetaData } from '../MetaData'
import { GameData } from '../GameData'
import { PriceChart } from '../PriceChart'
import { TradeHistory } from '../TradeHistory'
import Ice from '../../../images/egg/elem-ice.svg'
import Air from '../../../images/egg/elem-air.svg'
import Electro from '../../../images/egg/elem-electro.svg'
import Ghost from '../../../images/egg/elem-ghost.svg'
import Grass from '../../../images/egg/elem-grass.svg'
import Ground from '../../../images/egg/elem-ground.svg'
import Water from '../../../images/egg/elem-water.svg'
import Fire from '../../../images/egg/elem-fire.svg'
import Ghostimage from '../../../images/metadata/ghostimage.svg'
import Elementmain from '../../../images/metadata/elementmain.svg'
import Bodysize from '../../../images/metadata/bodysize.svg'
import Colorimage from '../../../images/metadata/color.svg'
import Gender from '../../../images/metadata/gender.svg'
import Unfreezable from '../../../images/metadata/unfreezable.svg'
import Laid from '../../../images/metadata/laid.svg'
import Speciality from '../../../images/metadata/speciality.svg'
import GeneralType from '../../../images/metadata/generaltype.svg'
import Generation from '../../../images/metadata/generation.svg'
import Egg from '../../../images/metadata/egg.svg'
import { DNARadarChart } from '../DNARadarChart'

declare var window: any

const KryptomonDetail = (props: Props) => {
  const { nft, order, breedingOrder } = props
  const [isV2, setIsV2] = useState(false)
  const [cooldownTimePercent, setCooldownTimePercent] = useState(0)
  const [breedAmountStartValue, setBreedAmountStartValue] = useState(0)
  const [breedAmountEndValue, setBreedAmountEndValue] = useState(0)
  const [cooldownTimeDay, setCooldownTimeDay] = useState(0)
  const [breedPrice, setBreedPrice] = useState('')
  const [account, setAccount] = useState('')

  const whatTheSex = (value?: string | number) => {
    if (value && +value > 5) return t('menu.keys.Male')
    else return t('menu.keys.Female')
  }

  const PRICE_DROPDOWN_VALUES = {
    DAY: t('nft_page.price_chart.day'),
    WEEK: t('nft_page.price_chart.week'),
    MONTH: t('nft_page.price_chart.month')
  }
  const [currentPriceFilter, setCurrentPriceFilter] = useState(
    PRICE_DROPDOWN_VALUES.MONTH
  )
  const toogleV2Change = () => {
    setIsV2(!isV2)
  }
  const onChangeCurrentPriceFilter = (_event: SyntheticEvent, data: any) => {
    setCurrentPriceFilter(data.text)
  }

  const PRICE_CHART = {
    [PRICE_DROPDOWN_VALUES.DAY]: {
      labels: [
        '02.09.2021',
        '03.09.2021',
        '04.09.2021',
        '05.09.2021',
        '06.09.2021',
        'Today',
        '08.09.2021'
      ],
      values: [1125, 2000, 2102, 3212, 1020, 3709]
    },
    [PRICE_DROPDOWN_VALUES.WEEK]: {
      labels: ['1st', '2nd', '3rd', '4th'],
      values: [1332, 5682, 1239, 4682]
    },
    [PRICE_DROPDOWN_VALUES.MONTH]: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Today', 'July', 'Aug'],
      values: [1625, 1332, 2322, 1239, 2223, 2578]
    }
  }

  const getIfCanBreed = () => {
    if (timeCanBreed > 0 && timeCanBreed < today) {
      return true;
    } else {
      return false;
    }
  }

  const genes = isV2 ? nft.genesV2 : nft.data.kryptomon?.genes
  const timeCanBreed = nft.data.kryptomon?.timeCanBreed || 0
  const lastTimeBred = nft.data.kryptomon?.lastTimeBred || 0
  const timeHatched = nft.data.kryptomon?.timeHatched || 0
  const isJunior = nft.data.kryptomon?.status && parseInt(nft.data.kryptomon?.status) >= 2
  const breedingCount = nft.data.kryptomon?.breedingCount || 0
  const breedingPrice = breedingOrder?.price || ''
  const maxBreedingsDuringLifePhase = nft.data.kryptomon?.maxBreedingsDuringLifePhase || 0
  const today = new Date().getTime() / 1000;
  const showCooldownTimeTemp = lastTimeBred > 0 && !getIfCanBreed()
  var options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const lastEvolvedTime = nft.data.kryptomon?.lastEvolved != null ? nft.data.kryptomon?.lastEvolved : nft.data.kryptomon?.timeHatched;
  const laidTimestamp = nft.data.kryptomon!.timeBorn * 1000
  const laid = new Date(laidTimestamp).toLocaleDateString(getCurrentLocale().locale, options)
  const lastEvolved = nft.data.kryptomon?.status == "0" ? laid : new Date(lastEvolvedTime! * 1000).toLocaleDateString(getCurrentLocale().locale, options);
  const genesArray = Object.values(genes!)
  let totalGenes = 0
  for (let i = 0; i < 16; i++) {
    totalGenes += genesArray[i] * genesArray[i + 1]
    i++
  }
  const elementTypes = [
    {
      title: 'Water',
      value: (((genes!.water * genes!.waterTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Water
    },
    {
      title: 'Grass',
      value: (((genes!.grass * genes!.grassTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Grass
    },
    {
      title: 'Fire',
      value: (((genes!.fire * genes!.fireTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Fire
    },
    {
      title: 'Electro',
      value: (
        ((genes!.electro * genes!.electroTalent) / totalGenes) *
        100
      ).toFixed(2),
      icon: Electro
    },
    {
      title: 'Ground',
      value: (
        ((genes!.ground * genes!.groundTalent) / totalGenes) *
        100
      ).toFixed(2),
      icon: Ground
    },
    {
      title: 'Ghost',
      value: (((genes!.ghost * genes!.ghostTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Ghost
    },
    {
      title: 'Ghost',
      value: (((genes!.ice * genes!.iceTalent) / totalGenes) * 100).toFixed(2),
      icon: Ice
    },
    {
      title: 'Air',
      value: (((genes!.air * genes!.airTalent) / totalGenes) * 100).toFixed(2),
      icon: Air
    }
  ]

  const elementType = elementTypes.find(
    element => element.title === nft.data.kryptomon?.elementType
  )

  const getPercentage = () => {
    if (timeCanBreed < today) {
      return 0;
    }

    const diffCanToLast = Math.abs(timeCanBreed - lastTimeBred);
    const diffTodayToLast = Math.abs(today - lastTimeBred);

    const total = Math.floor(diffCanToLast / 86400);
    const value = Math.floor(diffTodayToLast / 86400);

    const percentage = (value / total) * 100;

    return percentage;
  }

  const formatedDate = (timeInSeconds: number) => {
    const laidTimestamp = timeInSeconds * 1000
    var options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const laid = new Date(laidTimestamp).toLocaleDateString(undefined, options)
    return laid;
  }

  const maxElementType = elementTypes.reduce((prev, current) => {
    return ((prev &&
      typeof prev.value === 'string' &&
      Number.parseInt(prev.value)) ||
      0) >
      ((current &&
        typeof current.value === 'string' &&
        Number.parseInt(current.value)) ||
        0)
      ? prev
      : current
  })
  const removedMax = elementTypes.filter(item => item.title != maxElementType.title);
  const secondElementType = removedMax.reduce((prev, current) => {
    return ((prev &&
      typeof prev.value === 'string' &&
      Number.parseInt(prev.value)) ||
      0) >
      ((current &&
        typeof current.value === 'string' &&
        Number.parseInt(current.value)) ||
        0)
      ? prev
      : current
  })

  let maxValue;
  let maxValueTalent;
  let secondValue;
  let secondValueTalent;

  const genesArr = genes && Object.entries(genes)
  genesArr?.map((gen: any) => {
    if (maxElementType.title.toLowerCase() === gen[0]) {
      maxValue = gen[1];
    }
    if (secondElementType.title.toLowerCase() === gen[0]) {
      secondValue = gen[1];
    }
    if ((maxElementType.title.toLowerCase() + "Talent") === gen[0]) {
      maxValueTalent = gen[1];
    }
    if ((secondElementType.title.toLowerCase() + "Talent") === gen[0]) {
      secondValueTalent = gen[1];
    }
  })


  const GeneralTypes = [
    {
      title: t('nft_page.meta_data.general.egg_id'),
      value: nft?.tokenId,
      icon: Egg
    },
    {
      title: t('nft_page.meta_data.general.generation'),
      value: genes?.generation,
      icon: Generation
    },
    {
      title: t('nft_page.meta_data.general.Type'),
      value: nft.data.kryptomon?.elementType,
      icon: GeneralType
    },
    {
      title: t('nft_page.meta_data.general.speciality'),
      value: nft.data?.kryptomon?.speciality,
      icon: Speciality
    },
    {
      title: t('nft_page.meta_data.general.laid'),
      value: lastEvolved,
      icon: Laid
    },
    {
      title: t('nft_page.meta_data.general.UNFREEZABLE'),
      value: nft?.data?.kryptomon?.extraData?.unfreezable === 0 ? "No" : "Yes",
      icon: Unfreezable
    },
  ]

  const AppearanceTypes = [
    {
      title: t('nft_page.meta_data.appearance.Gender'),
      value: whatTheSex(genes?.sex),
      icon: Gender
    },
    {
      title: t('nft_page.meta_data.appearance.Color'),
      value: genes?.color,
      icon: Colorimage
    },
    {
      title: t('nft_page.meta_data.appearance.body_size'),
      value: genes?.bodySize,
      icon: Bodysize
    }
  ]

  const AffinityTypes = genes && [
    {
      title: 'element main',
      value: maxElementType,
      icon: Elementmain
    },
    {
      title: maxElementType.title,
      value: [maxValue, maxValueTalent],
      icon: maxElementType.icon
    },
    {
      title: secondElementType.title,
      value: [secondValue, secondValueTalent],
      icon: secondElementType.icon
    }
  ]

  const MetaDataelemtns = {
    generalType: GeneralTypes,
    appearanceType: AppearanceTypes,
    affinityType: AffinityTypes,
  }

  useEffect(() => {
    console.log('nft=>', nft)
    const start = async () => {
      setBreedAmountStartValue(breedingCount)
      setBreedAmountEndValue(maxBreedingsDuringLifePhase)
      setBreedPrice(breedingPrice)
      if (timeCanBreed && timeCanBreed > today) {
        const percentDiff: number | undefined = timeCanBreed - (lastTimeBred == 0 ? timeHatched : lastTimeBred)
        const currentPercent: number | undefined = Math.floor(today) - (lastTimeBred == 0 ? timeHatched : lastTimeBred)
        const percentTemp = currentPercent * 100 / percentDiff
        const leftDay = Math.ceil((timeCanBreed - today) / 3600 / 24)
        setCooldownTimeDay(leftDay)
        setCooldownTimePercent(percentTemp)
      }

      let web3 = new Web3(window?.ethereum)
      const accounts = await web3.eth.getAccounts()
      console.log('account=>', accounts)
      setAccount(accounts[0])
    }
    start()
  }, [])

  return (
    <Container className="product-container">
      <Row className="Row-space-between">
        <Column>
          <Row className="Row-space-between">
            <NFTDetailCard
              elementType={elementType}
              nft={nft}
              isV2={isV2}
              toogleV2={toogleV2Change}
              canBreed={getIfCanBreed()}
            />
          </Row>
          {isJunior &&
            <Row className="Row-space-between ">
              <TitleBlock title={t('nft_page.breeding_info.title')}>
                <BreedingInfo
                  nft={nft}
                  showCooldownTime={showCooldownTimeTemp}
                  cooldownTimePercent={cooldownTimePercent}
                  cooldownTimeDay={cooldownTimeDay}
                  breedAmountStartValue={breedAmountStartValue}
                  breedAmountEndValue={breedAmountEndValue}
                  breedPrice={breedPrice}
                  account={account}
                />
              </TitleBlock>
            </Row>
          }
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.elements.title')}>
              <Elements
                elementTypes={elementTypes}
                maxElementType={maxElementType}
                nft={nft}
              />
            </TitleBlock>
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.description')}>
              <DescriptionBlock nft={nft} />
            </TitleBlock>
            {/* <TitleBlock title={t('nft_page.trade_history.title')}>
              <TradeHistory nft={nft} />
            </TitleBlock> */}
          </Row>
        </Column>
        <Column>
          <Row className="Row-space-between">
            <Details nft={nft} order={order} />
          </Row>
          {/* <Row className="Row-space-between">
            <TitleBlock title="DNA Radar Chart">
              <DNARadarChart nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row> */}
          {/* {(lastTimeBred && !getIfCanBreed()) ? <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.dna_chart.breeding')}>
              <div className="next-breeding">
                <Row className="Row-space-between">
                  <div className="progress-last-bred-box">{t('nft_page.dna_chart.last')}</div>
                  <div className="progress-can-breed-box">{t('nft_page.dna_chart.next')}</div>
                </Row>
                <Row className="Row-space-between">
                  <div className="progress-last-bred">{formatedDate(lastTimeBred)}</div>
                  <div className="progress-can-breed">{formatedDate(timeCanBreed)}</div>
                </Row>
                <div className="ui red active indicating inverted progress next-breeding-progress" data-percent={getPercentage()}>
                  <div className="bar" style={{ width: `${getPercentage()}%` }}>
                    <div className={getPercentage() > 15 ? "progress" : "progress-low"}>{formatedDate(today)}</div>
                  </div>
                </div>
              </div>
            </TitleBlock>
          </Row> : null} */}
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.dna_chart.title')}>
              {/* <DNAChartDefault nft={nft} isV2={isV2} /> */}
              <DNAChart nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title="">
              <MetaData nft={nft} isV2={isV2} elements={MetaDataelemtns} />
            </TitleBlock>
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.metadata')}>
              <ElemData nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.gamestats')}>
              <GameData nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row>
        </Column>
      </Row>
    </Container>
  )
}

export default React.memo(KryptomonDetail)
