import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router';



function loadScript(src){

    return new Promise((resolve=>{

  
    const script=document.createElement('script')
    script.src=src
    script.onload=()=>{
        resolve(true)
    }
    script.onerror=()=>{
        resolve(false)
    }
    document.body.appendChild(script)

}))
   
    
}


 const Packages = () => {
const {auth} = useSelector(state => state)
const [Plans, setPlans] = useState([]);
const getPlans=async()=>{
const res=await axios.get('/api/plans')

setPlans(res.data.data)
}
useEffect(() => {
    getPlans()
  
}, []);

const history=useHistory()



async function displayRazorpay(e,planid)
{
    const res=await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res)
    {
        alert('check your connection')
        return
    }
    

    const {data}=await axios.post(`/api/razorpay/${planid}`,{"hello":"world"},{
        headers: { Authorization: auth.token },
      })
    
    var options = {
        "key": "rzp_test_wMYjuHKt9WDnpF", // Enter the Key ID generated from the Dashboard
        "currency":data.currency,
        "amount":data.amount.toString(),
        "order_id":data.id,
        "name":data.name,
        "description": "Pay for this plan",
        "image": "/images/logo.png",
        //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            history.push('/print')
             },
        "prefill": {
            "name": auth.user.fullname,
            "email":auth.user.email,
            "contact": auth.user.mobile
        },
        "notes":data.notes,
        "theme": {
            "color": "#3399cc"
        }
    };
    var paymentObject = new window.Razorpay(options);
    
    paymentObject.open();


    
}
if(auth.user.role==='student')
{
    history.push('/')
}




    return (
        <section className="card container grid">
            <div className="card__container grid">
                {/* <!--==================== CARD 1 ====================--> */}
                {
                    Plans.map(plan=><article className="card__content grid">
                    <div className="card__pricing" key={plan.price}>
                        <div className="card__pricing-number">
                            <span className="card__pricing-symbol">$</span>{plan.price}
                        </div>
                        <span className="card__pricing-month">/month</span>
                    </div>
    
                    <header className="card__header">
                        <div className="card__header-circle grid">
                            <img src="images/Pro-coin.png" alt="" className="card__header-img"/>
                        </div>
                        
                        <h1 className="card__header-title">{plan.name}</h1>
                    </header>
                    

                    {plan.benefits.length>0?plan.benefits.map(beni=>(<ul className="card__list grid">
                        <li className="card__list-item">
                            <i className="uil uil-check card__list-icon"></i>
                            <p className="card__list-description">{beni}</p>
                        </li>
                    </ul>)):null}
    
                    <button className="card__button" onClick={(e)=>displayRazorpay(e,plan._id)}>Buy this plan</button>
                </article>)
 }

      </div>
        </section>
    )
}


export default Packages

