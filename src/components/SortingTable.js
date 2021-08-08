import React ,{ useState , useEffect } from 'react';
import Student from './Student';
import { Button, Table } from 'reactstrap';
import base_url from '../api/bootapi';
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const SortingTable = () => {

    useEffect(() => {
        document.title="All Students";
        getAllCoursesFromServer();
    },[]);

    const history = useHistory();
    

    const deleteStudent = (rollNo)=>{
        axios.delete(`${base_url}/student/${rollNo}`).then(
        (response)=>{
            refreshStudentTableAfterDelete(rollNo);
            toast.success("Successfully deleted");
        },(error)=>{
            toast.error("Unable to delete");
        }
        )
    };

    const getAllCoursesFromServer=()=>{
        axios.get(`${base_url}/students `).then(
            (response)=>{
                setStudents(response.data)
            },
            (error)=>{
                console.log(error);
            }

        )
    };

     const [students , setStudents] = useState([]);

     const refreshStudentTableAfterDelete=(rollNo)=>{
        setStudents(students.filter((c)=> c.rollNo != rollNo));

     };

     const updateStudentData = (id) =>{
        history.push('/add-student/'+id);
     }

     return(
        <div>
            <Table bordered className="text-center">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Roll No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Division</th>
                    <th>Standard</th>
                    <th>Delete</th>
                    <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                {  students.map((student,index)=>(
                        <tr>
                         <th scope="row">{index}</th>
                         <td>{student.rollNo}</td>
                         <td>{student.firstName}</td>
                         <td>{student.lastName}</td>
                         <td>{student.division}</td>
                         <td>{student.standard}</td>
                         <td><Button color="danger" onClick={()=>{
                             deleteStudent(student.rollNo);
                         }}>Delete</Button></td>
                         <td><Button color="warning ml-3" onClick={()=>{
                             updateStudentData(student.rollNo);
                         }}>Update</Button></td>
                       </tr>)
                       )
                }

                </tbody>
            </Table>
        </div>

     );

};

export default SortingTable;