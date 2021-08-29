import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

const HistoryResult = () => {
    let query = useQuery();
    let fromdate = query.get("start");
    let todate = query.get("end")
    
    const [history,setHistory] = useState<string[]>([])
    const [loading,setLoading] = useState(false)
    const [Err,setErr] = useState(false)
    
    const fetchApi = async () => {
        try {
            const resp = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${fromdate}&end=${todate}`)
            let arrbpi = []
                for(const [date,value] of Object.entries(resp.data.bpi)){
                    arrbpi.push(`${date} - ${Number(value).toLocaleString()} THB`)
                }
            setHistory(arrbpi)
            setLoading(false)
        }   
        catch(err){
            setLoading(false)
            setErr(true)
        }
    }
    useEffect(() => {
        setLoading(true)
        fetchApi()
    },[])
    const render = () => {
        if(loading) {return(
        <div className='text-center space-y-3'>
        <p className='text-2xl font-semibold'>Historical price</p>
        <p className='text-2xl'>Loading ...</p>
        </div>
        )}else if(Err){return(
            <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Historical price</p>
            <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
            </div>
        )}else {return(
            <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Historical price</p>
            <p className='text-xl font-semibold'> ( From {fromdate} To {todate})</p>
            <p className='text-xl'>{history.map(x=> <p>{x}</p>)}</p>
            </div>
        )}
    }
    return (
        <div>{render()}</div>
    )
}

export default HistoryResult;