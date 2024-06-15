import React, { useEffect, useState } from 'react'
import './Components.css'
import { ArcElement, Tooltip, Chart } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement, Tooltip);

interface DisplayBoxProps {
    label: string,
    datapoints: Array<any>,
    datalabels: Array<any>,
    datacolours: Array<any>,
    datasalary: Array<any>
}

const DisplayBox: React.FC<DisplayBoxProps> = ({label, datapoints, datalabels, datacolours, datasalary}) => {
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
            <div id='canvasdisplay'>
                <Doughnut data={data} />
            </div>
            <div id='textdisplay'>
                <span className='subtitle'>{label}</span>
                <hr id='displayhr' />
                <div id='datadisplay'>
                    <div id='innerdisplayL'>
                        <span>SALARY</span>
                        {datapoints.map((points, index) => {
                            if (isNaN(points) || points === 0) {
                                return null; // Don't render anything if points is NaN
                            }
                            return <span key={'l' + index}>{datalabels[index].toUpperCase()}</span>;
                        })}
                    </div>
                    <div id='innerdisplayR'>
                        <span>${parseFloat(datasalary[0]).toFixed(2)}</span>
                        {datapoints.map((points, index) => {
                            if (isNaN(points) || points === 0) {
                                return null; // Don't render anything if points is NaN
                            }
                            return <span key={'p' + index}>${points.toFixed(2)}</span>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayBox