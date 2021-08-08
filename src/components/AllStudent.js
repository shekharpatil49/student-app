import React,{ useState , useEffect } from 'react';
import './Styles.css';
import base_url from '../api/bootapi';
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Button} from 'reactstrap';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const StudentTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.students);
  const history = useHistory();

  const deleteStudent = (rollNo)=>{
    axios.delete(`${base_url}/student/${rollNo}`).then(
    (response)=>{
        refreshStudentTableAfterDelete(rollNo);
        toast.success("Data deleted successFully, Please go to View Student Menu to view details", {
          position: toast.POSITION.TOP_CENTER
      });
    },(error)=>{
        toast.error("Unable to delete");
    }
    )
  };

  const refreshStudentTableAfterDelete=(rollNo)=>{
    history.push({
      pathname: '/home',
      state: [{id: 2, message: 'Data Deleted Successfully'}]
    });
  };
  
  const updateStudentData = (id) =>{
    history.push('/add-student/'+id);
  }

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <caption>Students</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('rollNo')}
              className={getClassNamesFor('rollNo')}
            >
              RollNo
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('firstName')}
              className={getClassNamesFor('firstName')}
            >
              First Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('lastName')}
              className={getClassNamesFor('lastName')}
            >
              Last Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('division')}
              className={getClassNamesFor('division')}
            >
              Division
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('standard')}
              className={getClassNamesFor('standard')}
            >
              Standard
            </button>
          </th>
          <th>
            <button
              type="button"
            >
              Update
            </button>
          </th>
          <th>
            <button
              type="button"
            >
              Delete
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.rollNo}>
            <td>{item.rollNo}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.division}</td>
            <td>{item.standard}</td>
            <td><Button color="danger" onClick={()=>{
                             deleteStudent(item.rollNo);
                         }}>Delete</Button></td>
                         <td><Button color="warning ml-3" onClick={()=>{
                             updateStudentData(item.rollNo);
                         }}>Update</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default function AllStudent() {

  const [students , setStudents] = useState([]);
    
useEffect(() => {
  document.title="All Students";
  getAllCoursesFromServer();
},[]);




const getAllCoursesFromServer=()=>{
  axios.get(`${base_url}/students `).then(
      (response)=>{
        if(response.data.length==0){
          toast.info("Please Add some data to view details", {
            position: toast.POSITION.TOP_CENTER
        });
        }else{
          setStudents(response.data)
        }
      },
      (error)=>{
          console.log(error);
      }

  )
};

  return (
    <div className="App">
      <StudentTable
        students={students}
      />
    </div>
  );
}
