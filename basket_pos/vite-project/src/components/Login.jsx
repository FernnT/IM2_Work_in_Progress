import { useEffect, useState } from 'react'
import Axios from 'axios'
import '../App.css'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const[loginStatus,setLoginStatus]= useState("")
  
    Axios.defaults.withCredentials = true;
  
    const login = ()=>{
      Axios.post("http://localhost:3001/login",{
        employee_eMail: email,
        employee_password: password,
      }).then((response)=>{
        console.log(response);
  
        if(response.data.message){
          setLoginStatus(response.data.message);
        }else{
          console.log(response.data[0]);
          //setLoginStatus(response.data[0].employee_name);
           navigate("/pos");
        }

      });
    };
  
    useEffect(()=>{
      Axios.get("http://localhost:3001/login").then((response)=>{
        if(response.data.loggedIn == true){
          //setLoginStatus(response.data.user[0].employee_name)
          //console.log(response.data)
          navigate("/pos");
        }
        
      });
  
    },[])
  


    return ( 
<div className='App'>
    


    <div className="Login">

    <h1>LOGIN</h1>
    Email:<input type="text" placeholder='EMAIL...'
    onChange={(e)=>{setEmail(e.target.value);
    }}
    />
    <br /> 
    Password:<input type="password" placeholder='PASSWORD...'
    onChange={(e)=>{setPassword(e.target.value);
    }}
    />
    <br /> 
    <button onClick={login}>LOGIN</button>

    </div>
   
    <h1>{loginStatus}</h1>  
    </div>
     );
}
 
export default Login;