import React, { useEffect,useState } from "react";
import Navbar from "../Navbar.jsx";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./signup.jsx";
var username = "";

function Login() {
  const[signuppage, setSign]=useState(false);
  //
  const[data,setData]=useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:8003/users')
    .then(res=>res.json())
    .then(data=>setData(data))
    .catch(err=>console.log(err));
  })
  const [username,setName]=useState("");
    function handleChangeUsername(e){
      setName(e.target.value);
    }
  const[password,setpassword]=useState("");
  const handlepasschange =(e)=>{
    setpassword(e.target.value);
  }
  const [semail, setEmail] = useState("");
  const [spassword, setPassword] = useState("");
  
  //

  const Navigate = useNavigate();

    const [sname,setSName]=useState("");
    function handleChangeSignupUsername(e){
      setSName(e.target.value);
    }
    function handleChangeSignupEmail(e){
      setEmail(e.target.value);
    }
    function handleChangeSignupPassword(e){
      setPassword(e.target.value);
    }

    //


  const Signuppressed = async (e) => {
    e.preventDefault();
    window.localStorage.setItem('username',JSON.stringify(sname))
    try {
      
        const response = await axios.post('http://localhost:8003/signup', {
            username: sname,
            email: semail,
            password: spassword
        }, {
          headers: {
              'Content-Type': 'application/json'
          }});
        alert(response.data.message);
        
       setSign(true);
    } catch (error) {
        alert(error.response?.data?.message || "Signup failed");
    }
};
  
  const [coverStyle, setCoverStyle] = useState({
    transform: "translateX(100%)",
    backgroundColor: "black",
    position: "absolute",
    borderTopRightRadius: "40px",
    borderBottomRightRadius: "40px",
    transition: "0.5s",
  });

  const trans = () => {
    setCoverStyle({
      transform: "translateX(100%)",
      backgroundColor: "black",
      position: "absolute",
      borderTopRightRadius: "40px",
      borderBottomRightRadius: "40px",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
      transition: "0.5s",
    });
  };
  const trans1 = () => {
    setCoverStyle({
      backgroundColor: "black",
      position: "absolute",
      borderTopLeftRadius: "40px",
      borderBottomLeftRadius: "40px",
      transition: "0.5s",
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginpressed = () => {
      const user = data.find(u => u.username === username && u.password === password);
      if (user) {
        window.localStorage.setItem('username',JSON.stringify(username))
        setIsLoggedIn(true);
      } else {
        alert("Invalid username or password");
        document.getElementById('username').value="";
        document.getElementById('password').value="";
      }
  };
  if(signuppage) return <Signup username={sname} email={semail} />

  if (!isLoggedIn)
    return (
<>
    <Navbar logout={"false"} />
      <div className="loginbox">
        <div className="logincontainer">
          <div
            className="movingcover"
            id="movingcover"
            style={coverStyle}
          ></div>
          <div className="login">
            <input
              className="infoinput"
              type="text"
              id="username"
             defaultValue=""
              alt="username"
              onChange={handleChangeUsername}
              placeholder="Username"
            />
            <input
              className="infoinput"
              type="password"
              alt="password"
              id="password"
              onChange={handlepasschange}
              placeholder="Password"
            />
            <button onClick={loginpressed}>Login</button>
            <div>
              Don't have an account? <b onClick={trans1}>Sign-up</b>
            </div>
          </div>
          <form onSubmit={Signuppressed} className="signup">
            <input
              className="infoinput"
              type="email"
              onChange={handleChangeSignupEmail}
              alt="email"
              placeholder="Email"
            />
            <input
              className="infoinput"
              type="text"
              onChange={handleChangeSignupUsername}
              alt="username"
              placeholder="Username"
              required
            />
            <input
              className="infoinput"
              type="password"
              alt="password"
              onChange={handleChangeSignupPassword}
              placeholder="Password"
              required
            />
            <input
              className="infoinput"
              type="password"
              alt="retype-password"
              placeholder="Retype Password"
              required
            />
            <button className="signupbutton" type="submit">Signup</button>
            <div>
              Already have an account? <b onClick={trans}>Login</b></div>
            </form>
          
        </div>
      </div>
      </>);
  else{
    Navigate('/home');
  }
}

export default Login;
export { username };
