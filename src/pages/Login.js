import React from "react";
import * as api from '../Api'
import {Link} from 'react-router-dom';
export default function Error() {

  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')

  const username = (event) =>{
    setName(event.target.value)
  }

   const userpassword = (event) =>{
    setPassword(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username:name,
      password:password
    }
    console.log(user)
    api.clientLogin(user)
    .then(res=>{
    console.log(res)
    const {data:{result}} = res
    console.log(result.access_token)
    console.log(result.refresh_token)
    localStorage.setItem('access_token', result.access_token)
    localStorage.setItem('refresh_token', result.refresh_token)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return <section className="container">
      <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" className="form-control" name="username" value={name} onChange={username}/>
        </div>
        <div>
        <label>Password</label>
        <input type="password" className="form-control" name="password" value={password} onChange={userpassword} />
        </div>
        {/* <Link to="/home"><button type="submit" className="btn btn-primary" >Login</button></Link> */}
        <button type="submit" className="btn btn-primary" >Login</button>
        </form>

      </div>
        <div className="login-component">
            
        </div>
  </section>;
}