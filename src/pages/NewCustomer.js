import React,{useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import * as api from '../Api';
import { FiXCircle } from "react-icons/fi";
import {CustomerContext} from '../context/customer/Customer';


export default function NewCustomer() {

  const [accounttype, setAccounttype] = React.useState('');
  const [accountno, setAccountno] = React.useState('');
  const [documenttype, setDocumenttype] = React.useState('');
  const [doctags, setDoctags] = React.useState([])
  const [addtag, setAddtag] = React.useState('')  
  const [documentfiles, setDocumentfiles] = React.useState([
    {label:'Document',type:'file', value:''},
    {label:'Document',type:'file', value:''},
    {label:'Document',type:'file', value:''},
    {label:'Document',type:'file', value:''},
  ]);
  const [totaldoc, setTotaldoc] = React.useState([])
  const {sampletest} = useContext(CustomerContext);
  

  useEffect(() => { 
    
  },[]);


 

  // add new file in dynamic
  const addNewFile = (e) =>{
    e.preventDefault();
    setDocumentfiles([...documentfiles,{label:'Document',type:'file'}])
  }

// input fields setState

//    const documentUpload = (e) => {
//     e.preventDefault();
//     const newfile = e.target.files[0];
//     console.log(newfile)
//      setFileuploaderror("");
//   if(newfile){
//     console.log(newfile)
//     if(!isFileFormatSupported(newfile.name)){
//       setFileuploaderror("File Format not Supported")
//       setImage("")
//     }else{
//     setTotaldoc([...totaldoc, newfile])

//     }
//     // setTotaldoc([...totaldoc, newfile],()=>{
//     //   console.log(totaldoc)
//     // })
//     console.log(totaldoc)
//   }
// }


const documentUpload = (e) => {
  e.preventDefault();
  const newfile = e.target.files[0];
  // console.log(newfile)
  // console.log(totaldoc)
  // setTotaldoc(e.target.files[0],()=>{
  // console.log(totaldoc)
    setTotaldoc([newfile,...totaldoc])
}
// }
const handleAccontType = (e) => {
  setAccounttype(e.target.value)
}
const handleAccountno = (e) => {
  setAccountno(e.target.value)  
}

const handleDocumenttype = (e) => {
  setDocumenttype(e.target.value)
}
const handleAddTag = e => {
    setAddtag(e.target.value)
}

// const finaltag = () => {
//   // const newtag = addtag
//   setDoctags([...doctags, addtag])
// }
const addingTag = (e) => {
  e.preventDefault();
  setDoctags([...doctags, addtag])
  setAddtag("")
}


// remove tag
const removeTag = (i) => {
  let doc = [...doctags];
  const index = doc.filter((_,index)=> index !== i)
  console.log(index)
  return setDoctags(index)
}

// file supported

// const isFileFormatSupported = (filename) =>{
//   let supportedFormats = ["png", "jpeg", "jpg"];
//   let ext = filename.split(".").pop();
//   return supportedFormats.some((extension)=>{
//     return extension === ext ;
//   });
// }

//  const handleImageUpload = e => {
//   e.preventDefault();
//   let file = e.target.files[0];
//   let image_url = URL.createObjectURL(file)
//   setFileuploaderror("");
//   if(file){
//     console.log(file)
//     if(!isFileFormatSupported(file.name)){
//       setFileuploaderror("File Format not Supported")
//       setImage("")
//     }else{
//   let reader = new FileReader();
//   let fileUrl;
//   reader.readAsDataURL(file)
//   reader.onload = (e) => {
//     fileUrl = reader.result
//     console.log(fileUrl)
//   }
//   setImage(file);
//   setFileuploaderror("");
//   setImageurl(image_url)
//     }
//   }
//   }


// form submit
  const handlingSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let doclength = totaldoc.length
    formData.append('account_type',accounttype);
    formData.append('account_number',accountno);
    formData.append('document_type',documenttype);
    formData.append('document_tags',doctags);
    if(doclength){
    totaldoc.forEach((file,i)=>{
    console.log(file)
    formData.append(`file ${i+1}`,file)
    })
    api.customerInsert(formData)
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
  }
}


  return <>
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
        <input type="text" name="account_no"  readOnly={true}/>
      </div>

      <div>
        <label>Account Type</label>
        <select defaultValue={'select'} onChange={handleAccontType}>
          <option disabled  >select</option>
          <option value="individual">individual</option>
          <option value="joint">joint</option>
        </select>
      </div>

      <div>
        <label>Account Number</label>
        <input type="text" name="account_no" value={accountno} onChange={handleAccountno}/>
      </div>

      <div>
        <label>Document Type</label>
        <select defaultValue={'select'}  onChange={handleDocumenttype}>
          <option disabled  >select</option>
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
      <div className="d-flex justify-content-between align-items-center mb-3">
      <span><h2>For more files to upload</h2></span><button className="btn" onClick={addNewFile}>Add</button>
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
      </div>
      </div>
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      </form>
</section>
  </>
}