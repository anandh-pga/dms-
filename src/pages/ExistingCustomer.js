import React from "react"; 
import {Link} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import {CustomerContext} from '../context/customer/Customer';
// import ModalOpenModal from '../components/editModal';
import ModalOpen  from '../components/EditModal';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import EditCustomer from "./EditCustomer";
import NewCustomer from "./NewCustomer";

/* eslint-disable */

const headers_GUD = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage['access_token']}`
}

class ExistingCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       loading:false,
       tableLoading:false,
       customers:[],
       page:1,
       query:"",
       totalpage:"",
       modal:false,
       viewCustomer:[],
       editcustomer:false,
    }
  }
  componentDidMount(){
     this.getCustomers();
  }

  editCustomer = (customer) =>{
    this.props.history.push({pathname:"/editcustomer",state:{customer:customer}})
  }

  getCustomers = async () => {
      this.setState({tableLoading:true})
      axios.get('http://13.233.25.140/list_records',{
                headers:headers_GUD,
                params: {
                  page: this.state.page,
                  no_of_items: 10
                }
              })
              .then( (response) => {
                this.setState({
                    customers: [...response?.data?.data],
                    totalpage: response?.data?.total_no_of_pages,
                    tableLoading:false
                })
              }) 
    }

    targetScroll(e){
     if(e.target.scrollTop === 0){
      return
     }else if(e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight){
      console.log("bottom")
        if(this.state.page < this.state.totalpage){
                        console.log(this.state.page, this.state.totalpage)

            this.setState({
              page:this.state.page + 1,
              tableLoading:true
            },()=>{
            axios.get('http://13.233.25.140/list_records',{
                      headers:headers_GUD,
                      params: {
                        page: this.state.page,
                        no_of_items: 10
                      }
                    })
                   .then( (response) => {
                      this.setState(prevState=>({
                          customers: [...prevState.customers, ...response?.data?.data],
                          totalpage: response?.data?.total_no_of_pages,
                          tableLoading:false
                      }),()=>{
                        let table = document.getElementById("customerTable");
                                if (table) {
                                    let height = table.scrollHeight;
                                    table.scrollTo(0, height / 2);
                                }
                        console.log(this.state.customers)
                      })
                    })
                 
            })
            
           
            
        }
    }
  }
  viewCustomer = (cus) => {
    this.setState({viewCustomer:cus});
    this.setState({modal:!this.state.modal});
  }
  modalOpenClose = (close) =>{
    this.setState({modal:close})
  }

  render() {
    return (
      <div>
  <section className="bg-img">  
  <nav className="navbar navbar-light shadow">
    <span className="navbar-brand mb-0 h1 text-white">DMS</span>
    <div className="form-inline">
      <button className="btn btn-danger my-2 my-sm-0">Back</button>
    </div>
  </nav>
  <div className="container-fluid overall-flow">
    <div className="row mt-4">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header bg-primary">
            <div className="d-flex justify-content-between">
              <span className="title">Exsiting Customer</span>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.query} onChange={(e)=>
                  this.setState({query:e.target.value})}/>
                 <button type="submit" className="submit-btn"></button>
              </form>
            </div>
          </div>
          <div className="card-body table" id="customerTable" onScroll={this.targetScroll.bind(this)}> 
            <table className="table table-bordered table-hover">
              <thead className="table-primary">
                <tr>
                  <th scope="col">S.NO</th>
                  <th scope="col">AccountNumber</th>
                  <th scope="col">AccoutType</th>
                  <th scope="col">DocumentType</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {!this.state.tableLoading ?
                 this.state.customers?.map((cus,index)=>{
                  const{account_number,account_type,document_type,_id} = cus;
                  return  (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{account_number}</td>
                  <td>{account_type}</td>
                  <td>{document_type}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-primary text-uppercase mr-2"
                      onClick={()=>this.editCustomer(cus)} >edit</button>
                      {/* <button type="button" className="btn btn-primary text-uppercase mr-2"
                      ><Link to = {{pathname:"/editcustomer",state:cus}}>Edit</Link></button> */}
                      <button type="button" className="btn btn-primary text-uppercase mr-2">delete</button>
                       <button type="button" className="btn btn-primary text-uppercase" onClick={()=>this.viewCustomer(cus)}>view</button>
                    </div>
                  </td>
                </tr> 
                  )
                }): <tr><td colSpan={5}>...loading</td></tr>}
              </tbody>
            </table> 
          </div>
          {this.state.modal?<ModalOpen customer={this.state.viewCustomer} modalOpenClose={this.modalOpenClose}/>:null} 
        </div>
      </div>
    </div>   
  </div>
</section>
      </div>
    );
  }
}

export default withRouter(ExistingCustomer);

