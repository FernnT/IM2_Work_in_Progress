import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./popUP.css"




const PopUPgarment = (props) => {

    const [garments,setGarments] = useState([])
    
    
    useEffect(()=>{ //retrieve data garments
        Axios.get("http://localhost:3001/garments")
        .then((response)=>{
          if(response.err){
            console.log(response.err)
          }else{
            setGarments(response.data);
          }
  
        })
      },[])

     // console.log(garments); //garments works







/////////////////////////////////////////////////////////////////////////DELETE LATER
//sample code for setData from child
      const childData='Hello from childdd!';

      function handleClick(){
        props.onDataFromChild(childData);
      }
////////////////////////////////////////////////////////////////////////



function garmentClick(garmentsItem){
  props.addGarment(garmentsItem);
}

function handleQuantityChange(index, event) {
  const newQuantity = event.target.value;
  const updatedGarmentCart = [...props.garmentCart];
  updatedGarmentCart[index].quantity = newQuantity;
  props.setGarmentCart(updatedGarmentCart);
}





return (props.trigger) ? (

    <div className="popup">
        <div className="popup-inner">     
            <button className='close-btn' onClick={() => props.setOpen(false)}>CLOSE</button>
        {garments && garments.map(garmentsItem => ( 
            <div className="clothes" key={garmentsItem.garment_ID} onClick={()=>garmentClick(garmentsItem)}>
                    <h2>{garmentsItem.garment_name}</h2>
            </div>
        ))}
        <button className='btn' onClick={props.addService}>Confirm</button>  
        {/* make it where you cant press confirm if empty */}
        </div>

        <h3>Garment Cart Contents:</h3>
          
        <table className="greyGridTable">  
            
                <thead>
                   <tr>
                      <th>Garment</th>
                      <th>Count</th>
                  </tr>
                </thead>

                <tbody>
                  {props.garmentCart.map((garmentSelected,index)=>(
                    <tr key={index}>
                      <td>{garmentSelected.garment_name}</td>
                      <td> <input
                  type="number"
                  value={garmentSelected.quantity}
                  onChange={(e) => handleQuantityChange(index, e)}
                /></td>

                    </tr>


                  ))}


                </tbody>
             
          

         </table>
        


        

    </div>

 ) : "";
}


export default PopUPgarment;