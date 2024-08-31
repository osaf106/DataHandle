
import { useState } from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  // let [uername, setuername] = useState('');
  // let [passUser, setpassUser] = useState('');

  // let handLogin=(event)=>{
  //    event.preventDefault();
  //   console.log(uername,passUser);
  // }
  
  let [formData,setFormData] = useState(
    {
      uname:"",
      uemail:"",
      uphone:"",
      umessage:"",
      index:"",
    }
  );
  let [submitForm, setSubmitForm]=useState([])
  let getValues = (event)=>{
      let getOldValues = {...formData};
      let inputName = event.target.name;
      let inputvalue  = event.target.value;
      getOldValues[inputName]=inputvalue;
      setFormData(getOldValues)
  }
  let HandleSubmit=(event)=>{
    event.preventDefault();
    if(formData.uname!="" && 
      formData.uemail!="" &&
      formData.umessage!="" &&
      formData.uphone!=""
    )
    {
      let currentvalue = {
        uname: formData.uname,
        uemail: formData.uemail,
        uphone: formData.uphone,
        umessage: formData.umessage,
      }
  
     if(formData.index==="")
     {
      let checkAlreadyExitsData = submitForm.filter((v) => {
        return v.uemail === formData.uemail || v.uphone === formData.uphone;
        });
        // console.log(`Check filter ${checkAlreadyExitsData}`);
        if(checkAlreadyExitsData.length>0)
        {
            toast.error("Usename or Phone Number Already Exits");
        }
        else
        {
          let oldUserData = [...submitForm,currentvalue]
          setSubmitForm(oldUserData)
          setFormData({
            uname:"",
            uemail:"",
            uphone:"",
            umessage:"",
            index:"",
          })
          toast.success("Sucessfully save");
          
        }
     }
     else
     {
        
        let editIndex = formData.index;
        let oldData = submitForm;
        let checkAlreadyExitsData = submitForm.filter((v,i) => (
           v.uemail == formData.uemail || v.uphone == formData.uphone) && (i!=editIndex)
          );
          console.log(checkAlreadyExitsData.length)
          if(checkAlreadyExitsData.length > 0)
          {
        oldData[editIndex]['uname'] = formData.uname;
        oldData[editIndex]['uemail'] = formData.uemail;
        oldData[editIndex]['uphone'] = formData.uphone;
        oldData[editIndex]['umessage'] = formData.umessage;

        setSubmitForm(oldData);
        setFormData({
          uname:"",
          uemail:"",
          uphone:"",
          umessage:"",
          index:"",
        })
        toast.success("Sucessfully Update");

       }
       else
       {
        toast.error("Usename or Phone Number Already Exits");

       }
    }
    }
    else
    {
      toast.error("Please Fill Each Fields")
    }
    
   
  }
  let DeleteRow=(index)=>{
    let deleteRow = submitForm.filter((v,i)=>i!=index);
    console.log(deleteRow)
    setSubmitForm(deleteRow)
    // alert(index)
  }
  let EditRow=(index)=>{
    let dispRow = submitForm.filter((v,i)=>i==index)[0];
    dispRow['index']=index
    setFormData(dispRow)
    
    
  }
  return (
    // <div className="App">
    //     <div className='container'>
    //         <div className='row'>
    //             <div className='col-lg-6'>
    //                 <form onSubmit={handLogin}>
    //                       <div className='text-start my-3' >
                              
    //                                 <label>User Name</label>
    //                                 <input type='text' onChange={(event)=>setuername(event.target.value)} className='form-control'value={uername}/>
                             
    //                       </div>
    //                       <div className='text-start my-3'>
                              
    //                                 <label>Password</label>
    //                                 <input type='password'onChange={(event)=>setpassUser(event.target.value)} className='form-control' value={passUser}/>
                              
    //                       </div>
    //                       <div className='text-start my-3'>
                              
    //                                 <button>Login</button>
                              
    //                       </div>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    <Container fluid>
      <ToastContainer />
          <Container>
              <Row>
                  <Col className='text-center py-5'>
                      <h1>Enquery Now</h1>
                  </Col>
              </Row>
              <Row>
                  <Col lg={5} >
                  {submitForm.length}
                      <form onSubmit={HandleSubmit}>
                            <div className='pb-3'>
                                  <label className='form-label'>Name</label>
                                  <input type='text' className='form-control' name='uname' value={formData.uname} onChange={getValues}/>
                            </div>
                            <div className='pb-3'>
                                  <label className='form-label'>Email</label>
                                  <input type='email' className='form-control' name='uemail' value={formData.uemail} onChange={getValues}/>
                            </div>
                            <div className='pb-3'>
                                  <label className='form-label'>Phone</label>
                                  <input type='phone' className='form-control' name='uphone' value={formData.uphone} onChange={getValues}/>
                            </div>

                            <div className='mb-3'>
                                  <label className='form-label'>Message</label>
                                  <textarea className='form-control' id='' name='umessage' rows={3} value={formData.umessage} onChange={getValues}></textarea>
                            </div>

                            <button className='btn btn-primary'>
                              {formData.index!=="" ? "Update": "Save"}
                            </button>
                      </form>
                  </Col>
                  <Col lg={7}>
                  <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Message</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          submitForm.length >=1?
                          
                          submitForm.map((data,i)=>{
                            return(
                              <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.uname}</td>
                            <td>{data.uemail}</td>
                            <td>{data.uphone}</td>
                            <td>{data.umessage}</td>
                            <td>
                                <button onClick={()=>DeleteRow(i)}>Delete</button>
                                <button onClick={()=>EditRow(i)}>Edit</button>
                            </td>
          
                          </tr>
                            )
                          })
                        :
                        <tr>
                            <td colSpan={6}>Data Not Found</td>
                        </tr>
                        }
                    
                      </tbody>
                    </Table>
                  </Col>
              </Row>
          </Container>

    </Container>
    
  );
}

export default App;
