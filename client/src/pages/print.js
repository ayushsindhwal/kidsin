import { cssNumber } from 'jquery'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getDataAPI } from '../utils/fetchData'

const Print = () => {
    const {auth} = useSelector(state => state )
    const history=useHistory()
    const [Data, setData] = useState([]);
    const getReciept=async()=>{
        const res=await getDataAPI('/getreciept',auth.token)
        console.log(res.data)
        setData(res.data)
    }
useEffect(() => {
    getReciept()  
}, [])


if(auth.user.role==='student')
{
    history.push('/')
}



    return (
        <>
       {Data.map(data=>
        <div>
            plan purchase:{data.plan.name}
            <br />
            plan price:{data.plan.price}
            <br />
            purchased by:{data.email}
            <br />
            order id:{data.order_id}
            <br />
            contact:{data.contact}
            <br />
            purchased on:{moment(data.createdAt).format("MMMM Do, YYYY")}

        </div>)}

        </>
        
    )
}

export default Print
