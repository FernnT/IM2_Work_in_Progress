import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../App.css'

const posPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [services,setwServices] = useState ([]);

    Axios.defaults.withCredentials = true;


    useEffect(()=>{
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


    useEffect(()=>{
      Axios.get("http://localhost:3001/services")
      .then((response)=>{
        if(response.err){
          console.log(response.err)
        }else{
          
          setwServices(response.data);
         
        }

      })
      
      
    },[])


    console.log(services);

    return (  
        <div className="pos">
            <h1>POS BLABLABLA</h1>
            { user && <h1>{user.employee_name}</h1>}


          <div className="wrapper">

            <div className="Wservice">
              {services && services.filter(services => services.chargePer === "Weight").map(weightServices => (
               
                  <div className="serve" key = {weightServices.service_ID}  >
                      <h2>{weightServices.service_name}</h2>
                  </div>





              ))}


            </div>



          </div>

        </div>
    );
}
 
export default posPage;