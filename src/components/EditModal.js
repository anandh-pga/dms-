import React, { PureComponent,Fragment } from 'react';
import Modal from 'react-modal';
// import FileViewer from 'react-file-viewer';
import { Document, Page, pdfjs  } from 'react-pdf';
Modal.setAppElement('#root');

export class EditModal extends PureComponent  {
    constructor(props) {
      super(props)
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      this.state = {
         toggleOpen : true,
         customer : this.props.customer,
         numPages : null,
         pageNumber : 1,
      }
    }
    hideToggle = () =>{
      this.setState({toggleOpen:!this.state.toggleOpen})
    }

   onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({numPages:numPages});
  }
  
    componentDidMount(){
   pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }
  
  render() {
    console.log(this.props.customer)
    const {_id,account_number, account_type, document_tags, document_type} = this.props.customer
    const {documents} = this.props.customer
    // console.log(_id)
    // console.log(account_number)
    // console.log(account_type)
    // console.log(document_tags)
    // console.log(document_type)
    // console.log(documents)


    // const viewCustomer = this.props.customer
    // console.log(viewCustomer)
    // console.log("cust : ",this.props.customer)
    // const newArray = Object.keys(this.props.customer)
    // console.log(newArray)
    // this.fileShow(newArray)
    return (
      <Fragment>
      <div>
        <Modal 
        isOpen={this.state.toggleOpen}
        onRequestClose={()=>{this.setState({toggleOpen:!this.state.toggleOpen})}}
        style={{
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  }}
    >
          <div>
            <button className="btn btn-primary" onClick={this.props.modalOpenClose.bind(this,false)}>close</button>
            </div>
            <h2>Customer Account Details</h2>
              {/* {
                newArray?.map((item,index)=>{
                    console.log(item)
                    console.log(this.props.customer[item])
                  return <div key={index}>
                    { {item.includes("file") ? <div>{"http://13.233.25.140/static/files/"+this.props.customer[item]}</div> 
                    : <div>{item+" :"+this.props.customer[item]}</div> } }
                    
                    {
                     item.includes("file") ? <div><Document
                                            file={"http://13.233.25.140/static/files/"+[this.props.customer[item]]}
                                           onLoadSuccess={this.onDocumentLoadSuccess}>
                                            <Page pageNumber={this.state.pageNumber} />
                                           </Document>
                                            <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
                                            </div>
                    item.includes("documents") ? <div>{"documents"}</div>
                    : <>{item+" :"+this.props.customer[item]}</> 
                    } 
                    </div>
                })
              } */}

                <p>Account Number: {account_number}</p>
                <p>Account Number: {account_type}</p>
                <p>Account Number: {document_type}</p>
                <p>Account Number: {document_tags}</p>
                {
                  documents.map((doc,i)=>{
                          const doc_key = Object.keys(doc)
                          const doc_file = doc[doc_key]
                          // console.log(doc_file)
                          return <div key={i}>
                          <Document
                          file={doc_file}
                          onLoadSuccess={this.onDocumentLoadSuccess}>
                          <Page pageNumber={this.state.pageNumber} />
                          </Document>
                          <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
                          </div>
})
                }
        </Modal>
      </div>
      </Fragment>
    );
  }
}

export default EditModal;
