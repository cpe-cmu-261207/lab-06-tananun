import axios, {AxiosResponse} from 'axios'
import { useEffect, useState } from 'react'

type currPrice = {
    time: any;
    THB: any;
    bpi:any;
}

const Current = () => {
    const [cur,setCur] = useState<currPrice | null>(null)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        setCur(null)
        setLoading(true)
        axios.get(`https://api.coindesk.com/v1/bpi/currentprice/thb.json`)
        .then((resp: AxiosResponse<currPrice>) => {
            console.log(resp.data);
            setCur(resp.data)
            setLoading(false)
        })    
        .catch(err => console.log(err))
        setLoading(false)
    },[])

    const render = () => {
        if(loading) return <p className='text-2xl'>Loading ...</p>
        else return(
            <div>
            <p className='text-2xl'>{cur?.bpi.THB.rate_float.toLocaleString()} THB</p>
            <br />
            <p> (Last updated {cur?.time.updated}) </p>
            </div>
        )
    }
    return(
        <div className='text-center space-y-3'>
        <p className='text-2xl font-semibold'>Current price</p>
        {render()}
        </div>
    )
}


// type Parmas = {
//     id: string
// }

// type cur = {
//     cur_p: string;
//     curr_date: string;
// }

// const current = () => {
//     const {id} = useParams<Parmas>()
//     const fetchApi = async () => {
//         try{
//             const resp = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice/thb.json`)
//             console.log(resp.data);
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
//     useEffect(()=>{
//         fetchApi()
//     },[])
//     return(
//         <div className='text-center space-y-3'>
//             <p className='text-2xl font-semibold'>Current price</p>

//         </div>
//     )
// } 

export default Current