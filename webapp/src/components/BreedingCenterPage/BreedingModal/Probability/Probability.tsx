import React from 'react'
import { Radar } from 'react-chartjs-2'

import { Props } from './Probability.types'
import './Probability.css'
import { DNA_CONSTANTS } from '../../../../modules/nft/constants'

const Probability = (props: Props) => {
  const { myNFT, selectedNFT, simulatedGenes, mutationFactor } = props

  const DNAParams = myNFT.metadata.attributes?.filter(elem =>
    DNA_CONSTANTS.includes(elem.trait_type)
  )
  const sortedDNAParams = DNA_CONSTANTS.map(title => {
    return DNAParams?.find(elem => {
      return elem.trait_type === title
    })
  })

  const DNALabels = sortedDNAParams?.map(elem => {
    return elem?.trait_type
  })

  const data = {
    labels: DNALabels,
    datasets: [
      {
        label: myNFT.metadata.name,
        data: [
          myNFT.data.kryptomon?.genes.constitution,
          myNFT.data.kryptomon?.genes.affections,
          myNFT.data.kryptomon?.genes.crazyness,
          myNFT.data.kryptomon?.genes.instinct,
          myNFT.data.kryptomon?.genes.hunger,
          myNFT.data.kryptomon?.genes.laziness,
          myNFT.data.kryptomon?.genes.brave,
          myNFT.data.kryptomon?.genes.smart
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
      {
        label: selectedNFT.metadata.name,
        data: [
          selectedNFT.data.kryptomon?.genes.constitution,
          selectedNFT.data.kryptomon?.genes.affections,
          selectedNFT.data.kryptomon?.genes.crazyness,
          selectedNFT.data.kryptomon?.genes.instinct,
          selectedNFT.data.kryptomon?.genes.hunger,
          selectedNFT.data.kryptomon?.genes.laziness,
          selectedNFT.data.kryptomon?.genes.brave,
          selectedNFT.data.kryptomon?.genes.smart
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
      {
        label: 'Simulated',
        data: simulatedGenes,
        backgroundColor: 'rgba(217, 225, 160, 0.2)',
        borderColor: 'rgb(217, 225, 160)',
        pointBackgroundColor: 'rgb(217, 225, 160)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(217, 225, 160)'
      }
    ]
  }

  const options = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 20
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }

  const classes = ['kryptomon', 'breeding-modal-probability']
  return (
    <div className={classes.join(" ")}>
      <div className="value">
        Mutation factor {mutationFactor !== null ? mutationFactor.toFixed(2) : ''}%
      </div>
      <div className="probability-chart-box">
        <div className="probability-chart">
          <Radar data={data} options={options}/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Probability)
