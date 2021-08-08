import React ,{ useState , useEffect, Fragment} from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios from "axios";
import base_url from '../api/bootapi';
import {ToastContainer , toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';


const AddStudent = (props)=>{

    const [student,setStudent]=useState({});
    
    useEffect(() => {
        const { id } = props.match.params;
        if(id!=undefined){

            axios.get(`${base_url}/student/${id}`).then(
                (response)=>{
                    setStudent(response.data[0]);
                },(error)=>{
                   toast.error("Unable to add Student");
                }   
               )

        }
        document.title="Add Student";
    },[]);

    const onChangeStudentData = (e)=>{
        setStudent({...student,[e.target.name]:e.target.value});
    }

    const submitStudentDetails = (e) =>{
        console.log(student);
        e.preventDefault();

        if(student.rollNo==undefined || student.rollNo==""){
            alert("Please Enter Roll No");
            return false;
        }
        if(student.firstName==undefined || student.firstName==""){
            alert("Please Enter First Name");
            return false;
        }
        if(student.lastName==undefined || student.lastName==""){
            alert("Please Enter Last Name");
            return false;
        }
        if(student.division==undefined || student.division==""){
            alert("Please Enter Division");
            return false;
        }
        if(student.standard==undefined || student.standard==""){
            alert("Please Enter Standard");
            return false;
        }
        postDataToServer(student);
    }


    const history = useHistory();

    const postDataToServer =(data)=>{
        axios.post(`${base_url}/student`,data).then(
         (response)=>{
            toast.success("Data added successFully, Please go to View Student Menu to view details", {
                position: toast.POSITION.TOP_CENTER
            });
            history.push({
                pathname: '/home',
                state: [{id: 3, message: 'Data Added Successfully'}]
              });
         },(error)=>{
            toast.error("Unable to add Student");
         }   
        )
    }

    return(
        <Fragment>
            <h1 className="text-center my-3">Add Student</h1>
            <Form onSubmit={submitStudentDetails}>
                <FormGroup>
                    <Label for="rollNo">Roll No</Label>
                    <Input 
                        type="number" 
                        name="rollNo" 
                        id="rollNo" 
                        value={student.rollNo}
                        onChange={onChangeStudentData}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" id="firstName" value={student.firstName}
                    onChange={onChangeStudentData}
                   />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" value={student.lastName}
                    onChange={onChangeStudentData}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="division">Division</Label>
                    <Input type="text" name="division" id="division" value={student.division}
                     onChange={onChangeStudentData}
                     />
                </FormGroup>
                <FormGroup>
                    <Label for="standard">Standard</Label>
                    <Input type="number" name="standard" id="standard" value={student.standard}
                     onChange={onChangeStudentData}
                     />
                </FormGroup>
                
                <Container className="text-center">
                    <Button type="submit" color="success">Add Student</Button>
                    <Button type="reset" color="warning ml-2">Clear</Button>
                </Container>
                
            </Form>


        </Fragment>
    );


}


export default AddStudent;