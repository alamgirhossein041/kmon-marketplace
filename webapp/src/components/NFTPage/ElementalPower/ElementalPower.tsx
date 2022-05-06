import React from 'react'
import { Props } from './ElementalPower.types'
import './ElementalPower.css'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const ElementalPower = (props: Props) => {
    const { elements } = props

    return (
        <div className="elem-power-container">
            {
                elements.affinityType.slice(1).map((item: any, index: number) => (
                    <div key={index} className="flex-direction-row elem-power-item img-title">
                        <div className="flex-direction-row">
                            <img className="stats-icon" src={item.icon} />
                            <div>
                                <p className="elem-title">{t(`nft_page.elements.${item.title}`)}</p>
                                <div className="flex-direction-row">
                                    <h6 className="elem-power-row-text">{t('nft_page.meta_data.affinity.gens')}</h6>
                                    <h6 className="value-text">{item.value[0]}</h6>
                                    <h6 className="elem-power-row-text">{t('nft_page.meta_data.affinity.talent')}</h6>
                                    <h6 className="value-text">{item.value[1]}</h6>
                                </div>
                            </div>
                        </div>
                        <p className="elem-power-percent">{parseInt(item.value[2])}%</p>
                    </div>
                ))
            }
        </div>
    )
}

export default React.memo(ElementalPower)
