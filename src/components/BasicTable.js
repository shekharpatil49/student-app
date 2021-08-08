import React ,{ useMemo ,useState ,useEffect}from 'react'
import {useTable} from 'react-table'
import { COLUMNS } from './columns'
import axios from "axios";
import base_url from '../api/bootapi';


export const BasicTable = () =>{

    const [students , setStudents] = useState([]);
    useEffect(() => {
        document.title="All Students";
        getAllCoursesFromServer();
    },[]);
    const getAllCoursesFromServer=()=>{
        axios.get(`${base_url}/students `).then(
            (response)=>{
                setStudents= JSON.parse(response.data);
                console.log(setStudents);
            },
            (error)=>{
                console.log(error);
            }

        )
    };

    const columns = useMemo(()=> COLUMNS,[])
    const data = useMemo(()=> setStudents,[])

    const tableInstance = useTable({
        columns,
        data
    })

    const { getTableProps, getTableBodyProps,headerGroups , rows,prepareRow}=
    tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {

                            headerGroup.headerGroups.map((column)=>(
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')} 
                                </th> 
                            ))
                        }
                        </tr>

                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row =>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                            {
                                row.cells.map((cell)=>{
                                    return <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                })
                            }

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        
    )


}