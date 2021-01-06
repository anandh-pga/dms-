import React,{useEffect} from 'react';
import { useLocation } from "react-router";
import * as api from '../Api';
import {Link} from 'react-router-dom';
import { FiXCircle } from "react-icons/fi";
import { Document, Page, pdfjs  } from 'react-pdf';

import FileViewer from 'react-file-viewer';
// import { CustomErrorComponent } from 'custom-error';



/* eslint-disable */


export default function EditCustomer() {

    const location = useLocation();
    const customer_id_details = location?.state?.customer;
    
    const [editcustomerid, setEditCustomerId] = React.useState(customer_id_details._id)
    const [accounttype, setAccounttype] = React.useState(customer_id_details.account_type);
    const [accountno, setAccountno] = React.useState(customer_id_details.account_number);
    const [documenttype, setDocumenttype] = React.useState(customer_id_details.document_type);
    const [doctags, setDoctags] = React.useState(customer_id_details.document_tags);
    const [addtag, setAddtag] = React.useState('');
    const [newtag, setNewtag] = React.useState([]);
    const [oldtag, setOldtag] = React.useState([]);
    const [totaldoc, setTotaldoc] = React.useState([...customer_id_details.documents]);
    const [numPages, setNumofpages] = React.useState(null);
    const [pageNumber,setPagenumber] = React.useState(1);
      const [documentfiles, setDocumentfiles] = React.useState([
    {label:'Document',type:'file', value:''},
  ]);

    useEffect(() => {
      return () => {
      };
    }, []);

     const addNewFile = (e) =>{
    e.preventDefault();
    setDocumentfiles([...documentfiles,{label:'Document',type:'file'}])
  }


  const handleAddTag = e => {
    setAddtag(e.target.value)
}

  const addingTag = (e) => {
  e.preventDefault();
  setDoctags([...doctags, addtag])
  setAddtag("")
}

const documentUpload = (e) => {
  e.preventDefault();
  const newfile = e.target.files[0];
  console.log(newfile)  
  console.log(totaldoc)
  setNewtag([...newtag,newfile])
}
console.log(totaldoc)

const existingFileUpload = (file_key,e) => {
  let key = file_key
  console.log(e.target.files)
  const old_file = {[key]:e.target.files[0]}
  console.log(old_file)
  setOldtag([...oldtag,old_file])
}

const removeFile = (i) => {
  let doc = [...totaldoc];
  const index = doc.filter((_,index)=> index !== i)
  console.log(index)
  return setTotaldoc(index)
}



// form submit
  const handlingSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let doclength = totaldoc.length
    formData.append('account_type',accounttype);
    formData.append('account_number',accountno);
    formData.append('document_type',documenttype);
    formData.append('document_tags',doctags);

    if(newtag){
    newtag.forEach((file,i)=>{
    console.log(file)
    formData.append(`newfile ${i+1}`,file)
    })
    if(oldtag){
      oldtag.forEach((file)=>{
        let new_file_key = Object.keys(file)[0]
        const my_file = file[new_file_key]
        formData.append(new_file_key,my_file)
      })
    }
  }
    console.log(totaldoc)
    api.clientEdit(formData,editcustomerid)
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
  }

   const onDocumentLoadSuccess = ({ numPages }) => {
    setNumofpages(numPages)
  }
   
  return (
    <section className="bg-img">
    <nav className="navbar navbar-light shadow">
      <span className="navbar-brand mb-0 h1 text-white">DMS</span>
      <div className="form-inline">
        <button className="btn btn-danger my-2 my-sm-0"><Link to="/">Back</Link></button>
      </div>
    </nav>
     <form onSubmit={handlingSubmit}>
    <div className="container">
    <div className="row">
    <div className="col-md-6">

        <div>
        <label>Document ID</label>
        <input type="text" name="account_no" value={editcustomerid}  readOnly={true}/>
        </div>

      <div>
        <label>Account Type</label>
        <select defaultValue={accounttype} onChange={(e)=>setAccounttype(e.target.value)}>
          <option disabled  >select</option>
          <option value="individual">individual</option>
          <option value="joint">joint</option>
        </select>
      </div>

      <div>
        <label>Account Number</label>
        <input type="text" name="account_no" value={accountno} onChange={(e)=>setAccountno(e.target.value)}/>
      </div>

      <div>
        <label>Document Type</label>
        <select defaultValue={documenttype} onChange={(e)=>setDocumenttype(e.target.value)}>
          <option disabled >select</option>
          <option value="individual">individual</option>
          <option value="joint">joint</option>
        </select>
      </div>
      
        <div>
        <label>Document tags</label>
        <input type="text" name="account_tags" value={addtag} onChange={handleAddTag}/>
        <span><button className="btn btn-primary" onClick={addingTag}>ADD</button></span>
      </div>

      {
       doctags.length >0?(
             <div style={{maxHeight:'5rem',maxWidth:'15rem',border:'1px solid black',overflowY:'scroll'}} >
        {
          doctags.map((tag,index)=> <p key={index} >{tag}<FiXCircle onClick={()=>removeTag(index)}/></p>
          )
        }
      </div>
       ):(
         <div style={{minHeight:'5rem',maxWidth:'15rem',border:'1px solid black'}}>Enter your tags</div>
       )
       }
    </div>

    <div className="col-md-6" >
      <div>
        <label>Add New File</label>
        <button type="btn" className="btn btn-primary"  onClick={addNewFile}>add</button>
        </div>
           {
          documentfiles.map((doc,index)=>{
            return(
              <div key={index} className="d-flex justify-content-between align-items-center">
                <label>{doc.label} {index+1}</label>
                <input type={doc.type} value={doc.value} onChange={documentUpload}/>
                </div>
            )
          })
        }
        {
          totaldoc.map((doc,index)=>{
            console.log(doc)
            const file_key = Object.keys(doc)[0]
            const file = doc[file_key]
            const file_ext = file.split(".").pop();
            console.log(file_ext)
            console.log(typeof(file_ext))

              // return  <div key={index}>
              //             <Document
              //             file={file}
              //             onLoadSuccess={onDocumentLoadSuccess}>
              //             <Page pageNumber={pageNumber} />
              //             </Document>
              //             <p>Page {pageNumber} of {numPages}</p>
              //         </div>
             return <div key={index} className="files_view_div">
                <div className="file_div">
                     <FileViewer
                      fileType={file_ext}
                       filePath={file}
               />
                   </div>
               <input type="file" value={""} name={file_key} onChange={(e)=>existingFileUpload(file_key,e)}/>
               </div>
          })
        }

      {/* <div className="files_view_div">
      {
          totaldoc.map((doc,index)=>{
          console.log(doc)
          let index_val = index +1
          let file_name = "file"+index_val
        
          return (
            <div className="file_div" key={index_val}> 
              <FileViewer
              fileType={"pdf"}
              filePath={"http://13.233.25.140/static/files/55555-16093374324sample.pdf"}
              // errorComponent={CustomErrorComponent}
              // onError={this.onError}
              />
            <div className="delete_file_circle">
              <FiXCircle onClick={()=>removeFile(index)}/>
              </div>  
            </div>
          )
        })
      }
      </div> */}
      </div>
  
      </div>
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      </form>
    </section>
  );
}

