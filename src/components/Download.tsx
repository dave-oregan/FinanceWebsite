import React, { useEffect } from 'react'
import DomToImage from 'dom-to-image'
import saveAs from 'file-saver'
import './Components.css'

interface DownloadProps {
}

const download = () => {
    const report = document.getElementById('displayholder') as HTMLElement
    DomToImage.toBlob(report).then((blob) => {
        saveAs(blob, 'FinanceReport.png');
    })
    return 'done'
}

const Download: React.FC<DownloadProps> = () => {
    // useEffect(() => {
    //     // Adds event listener for download functionality
    //     (document.getElementById('downloadbutton') as HTMLElement).addEventListener('click', () => {
    //             const report = document.getElementById('displayholder') as HTMLElement
    //             DomToImage.toBlob(report).then((blob) => {
    //             saveAs(blob, 'FinanceReport.png');
    //         })
    //     });
    // })
    return (
        <span id='downloadbutton' className='Button' onClick={download}> DOWNLOAD </span>
    )
}

export default Download