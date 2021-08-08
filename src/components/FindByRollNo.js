import React ,{ useState , useEffect } from 'react';
import Student from './Student';
import base_url from '../api/bootapi';
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Container ,Table} from 'reactstrap';
import { toast } from 'react-toastify';


const FindByRollNo = () => {

    useEffect(() => {
        document.title="Find Student";
    },[]);
    const getStudentByID=(e)=>{
        e.preventDefault();
        axios.get(`${base_url}/student/${student.rollNo}`).then(
            (response)=>{
                if(response.data.length!=0){
                    setEntity(response.data)
                }else{
                    toast.error("No Record Found !", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setEntity([]);
                }
            },
            (error)=>{
                console.log(error);
            }
        )
    };
     const onChangeStudentData = (e)=>{
        setStudent({...student,[e.target.name]:e.target.value});
     }

     const [student , setStudent] = useState([]);
     const [entity,setEntity] = useState([]);

     return(
        <div>
            <Form onSubmit={getStudentByID}>

            <FormGroup>
                    <Label for="rollNo">Roll No</Label>
                    <Input 
                        type="text" 
                        name="rollNo" 
                        id="rollNo" 
                        value={student.rollNo}
                        onChange={onChangeStudentData}
                    />
            </FormGroup>
            <Container className="text-center">
                    <Button type="submit" color="success">Find Student</Button>
            </Container>

            </Form>

            <Table bordered className="text-center">
                <thead>
                    <tr>
                    <th>Roll No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Division</th>
                    <th>Standard</th>
                    </tr>
                </thead>
                <tbody>
                {  entity.map((stud,index)=>(
                        <tr>
                         <td>{stud.rollNo}</td>
                         <td>{stud.firstName}</td>
                         <td>{stud.lastName}</td>
                         <td>{stud.division}</td>
                         <td>{stud.standard}</td>
                       </tr>)
                       )
                }
                </tbody>
            </Table>
        </div>

     );

};

export default FindByRollNo;
