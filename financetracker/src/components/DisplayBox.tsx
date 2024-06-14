import React, { useEffect, useState } from 'react'
import './Components.css'
import { ArcElement, Tooltip, Chart } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement, Tooltip);

interface DisplayBoxProps {
    label: string,
    datapoints: Array<any>,
    datalabels: Array<any>,
    datacolours: Array<any>
}

const DisplayBox: React.FC<DisplayBoxProps> = ({label, datapoints, datalabels, datacolours}) => {
    const [data, setData] = useState({
        labels: datalabels,
        datasets: [{
        label: '$',
        data: datapoints,
        backgroundColor: datacolours,
        hoverOffset: 3
        }]
    })

    useEffect(() => {
        setData({
            labels: datalabels,
            datasets: [{
                label: '$',
                data: datapoints,
                backgroundColor: datacolours,
                hoverOffset: 3
            }]
        });
    }, [datapoints, datalabels, datacolours]);

    return (
        <div id='displayholder'>
            <Doughnut data={data} />
            <div>
                <span className='subtitle'>{label}</span>
                <hr id='displayhr' />
            </div>
        </div>
    )
}

export default DisplayBox