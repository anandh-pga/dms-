import React from "react";
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
export default function Home() {
  return <>
      <section className="bg-img">
        <div className="container">
            <div className="card">
            <div className="card-body">
                <div className="row justify-content-center">
                <div className="col-md-6">
                    <img src={logo} className="img"/>
                </div>
                <div className="col-md-6 btn-res">
                    <div className="row justify-content-center">
                    <div className="col-md-12">
                        <h3 className="h3 d-block p-4">DMS</h3>
                    </div>
                    <div className="col-md-7">
                        <Link to="/newcustomer" className="btn btn-lg btn-block">
                        <span>NEW</span>
                        </Link>
                    </div>
                    <div className="col-md-7">
                            <Link to="/existcustomer" className="btn btn-lg btn-block mt-4">
                        <span>EXISTING</span>
                        </Link>
                    </div>
                    </div>
                </div>
                </div>     
            </div>  
        </div>
        </div>
        <div className="home-component">

        </div>
</section>
  </>;
}
