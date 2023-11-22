import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../App.css'
import React from 'react';
import PopUPgarment from './PopUPgarment';

//TO DO 
//UPLOAD ORDER TO BACKEND
//DATE
//CUSTOMER
//EMPLOYEE
//PAYMENTMETHOD
//DELETE
//EDIT
//SEARCH



const posPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [services,setwServices] = useState ([]);
    const [open,setOpen] = useState (false);
    const [garmentCart,setgarmentCart] = useState([]);
    const [serviceCart,setServiceCart] = useState([]);
    const [savedService,setsavedService] = useState();
    const [customers,setCustomers] = useState([]);
    const [selectedCus,setSelectedCus] = useState();
    const [total, setTotal] = useState(0);
    const [pickUpDate,setPickUpDate] = useState('');
    const [paidAmount,setPaidAmount] = useState(0);
    const [change,setChange]= useState(0);

    Axios.defaults.withCredentials = true;


    useEffect(()=>{ //sets the logged in user and redirect if not loggedIN
      Axios.get("http://localhost:3001/login")
      .then((response)=>{
        if(response.data.loggedIn == true){
        //  console.log(response.data)
          setUser(response.data.user[0]);
        }else{
          navigate("/");
        }
  
      });
  
    },[])


    useEffect(()=>{ //retrieve services
      Axios.get("http://localhost:3001/services")
      .then((response)=>{
        if(response.err){
          console.log(response.err)
        }else{
          
          setwServices(response.data);
         
        }

      })
      
      
    },[])

    
    useEffect(()=>{
      Axios.get('http://localhost:3001/customers')
      .then((response)=>{
        if(response.err){
          console.log(response.err)
        }else{
          setCustomers(response.data);
        }
      })
    },[])



    useEffect(() => {
      // Calculate the total when serviceCart changes
      const newTotal = serviceCart.reduce((acc, ordered) => acc + ordered.amount, 0);
      setTotal(newTotal);

      console.log("Service cart:",serviceCart)
    }, [serviceCart]);

    useEffect(()=>{
      const newChange = (paidAmount-total);
      setChange(newChange);

    },[paidAmount,total])





    function onServiceCLick(service) {
      setOpen(!open);

      setsavedService(service);  //to "save" what service was selected  
    }

    function addService() {
      setOpen(!open);
    
      let newServiceCart = [...serviceCart];
     
      if (garmentCart.length !== 0) {
        let newService = {
          ...savedService,
          garmentsIn: [...garmentCart], // Use the copied version of garmentCart
          qty:0,
          amount:0

        };
        newServiceCart.push(newService);
        setServiceCart(newServiceCart);

        setgarmentCart([]); //set it back to empty since it is back assigned to a service
      }

    }
  

  function addGarment(garment) {
  
    console.log(garment);
    let newCart = [...garmentCart]; // Copy the existing cart to avoid mutating state directly
    let found = false;
  
    newCart.forEach((clothing, index) => {
      if (clothing.garment_ID === garment.garment_ID) {
        newCart[index] = {
          ...clothing,
          quantity: clothing.quantity + 1
        };
        found = true;
      }
    });
  
    if (!found) {
      let addingGarment = {
        ...garment,
        quantity: 1
      };
      newCart.push(addingGarment);
    }
  
    setgarmentCart(newCart);
    console.log(newCart);


  }

    function handleQtyChange(index, event) {
      const newQty = event.target.value;
      const newServiceCart = [...serviceCart];
      const updatedService = {
        ...newServiceCart[index],
        qty: newQty,
        amount: newQty * newServiceCart[index].service_price,
      };
      newServiceCart[index] = updatedService;
      setServiceCart(newServiceCart);
    }

    function handleConfirmOrder(){ ///confirm order
      Axios.post("http://localhost:3001/addOrder", { 
        newOrder:serviceCart,
        customer: selectedCus,
        employee: user,
        total: total,
        order_pickUP: pickUpDate,
        order_paidAmount: paidAmount })
      .then((response)=>{
        console.log(response);
      })
    }

    function changeCustomer(e){
      setSelectedCus(e.target.value);
    }
    

    //console.log(services); // services works

///////////////////////////////////////////////////////////////////DELETE LATER
//sample code for setData from child
    const [dataFromChild, setDataFromChild] = useState(null);

    const handleChildData = (childData) => {
      // Do something with the data received from the child
      console.log('Data from child:', childData);
      setDataFromChild(childData);
    };
    

//////////////////////////////////////////////////////
    return (  
        <div className="pos">
            <h1>POS </h1>
            { user && <h1>{user.employee_name}</h1>}


          <div className="wrapper">

            <div className="Wservice">
              {services && services.filter(services => services.chargePer === "Weight").map(weightServices => (
               
                  <div className="serve" key = {weightServices.service_ID} onClick={()=>onServiceCLick(weightServices)}>
                 <h2>{weightServices.service_name}</h2>
                  </div>
              ))}
            </div>
            <PopUPgarment trigger={open} setOpen={setOpen} addGarment={addGarment} onDataFromChild={handleChildData} addService={addService} garmentCart={garmentCart} setGarmentCart={setgarmentCart}/>
              
          </div>
          
          <div className="selectCustomer">
          <select value={selectedCus} onChange={changeCustomer}>
                <option>--Customer--</option>
              {customers && customers.map(cus=>(
                <option value={cus.customer_name} key={cus.customer_ID}>{cus.customer_name}</option>

              ))}

        </select>

        <h1>{selectedCus}</h1>
        </div>

        <div className="selectDate">
          <h3>PICKUP DATE:</h3>
          <input type="date" value={pickUpDate} onChange={e=>setPickUpDate(e.target.value)}/>

          <h1>{pickUpDate}</h1>
        </div>
        



<div id="coursology-root" ></div>
<table className="greyGridTable">
        <thead>
          <tr>
            <th>Service</th>
            <th>ChargeBy</th>
            <th>Rate</th>
            <th>Qty/Weight</th>
            <th>amount</th>
            <th></th>
          </tr>
        </thead>
    
        <tbody>
          {serviceCart &&
            serviceCart.map((ordered, index) => (
              <tr key={index}>
                <td>
                  {ordered.service_name} <br /> Contents
                </td>
                <td>{ordered.chargePer}</td>
                <td>{ordered.service_price}</td>
                <td>
                  <input
                    type="number"
                    placeholder={ordered.qty}
                    onChange={(event) => handleQtyChange(index, event)}
                  />
                </td>
                <td>{ordered.amount}</td>
                <td>
                  <button>delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Total: {total}</h3>
      <h3>Paid Amount: <input type="number" value={paidAmount} onChange={(e)=>setPaidAmount(e.target.value)}/></h3>
      <h3>{paidAmount}</h3>
      <h3>Change: {change}</h3>
      <button>Cancel</button>
      <button onClick={handleConfirmOrder}>Confirm</button>
      
    </div>
  );
};
 
export default posPage;