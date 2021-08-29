import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import HistoryResult from './HistoryResult'

const HistorySelect = () => {

    let historyhook = useHistory()
    const [fromdate, setFromdate] = useState("")
    const [todate, setTodate] = useState("")
    const check = (fromdate: string,todate: string) =>{
        let from = new Date(fromdate)
        let to = new Date(todate)
        if(fromdate === "" || todate === "" || from > to){
            alert("Plese select start date and end date correctly")
        }else{
            historyhook.push("result?start="+fromdate+"&end="+todate);
            <HistoryResult/>
        }
            
    }
    
    return (
        <div className='text-center space-y-3 space-x-3'>
            <p className='text-2xl font-semibold'>Select historical range</p>
            <span>From date</span>
            <input type='date' onChange={e => setFromdate(e.target.value)}></input>
            <span>To date</span>
            <input type='date' onChange={e => setTodate(e.target.value)}></input>
            <br />
            <button onClick={() => check(fromdate,todate)}>Get data</button>
        </div>
    )
}

export default HistorySelect;