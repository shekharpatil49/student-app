import React from 'react';
import { Button, Table } from 'reactstrap';

const Student = ({student}) => {
  return (
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
        <tr>
          <th scope="row">1</th>
          <td>{student.rollNo}</td>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.divison}</td>
          <td>{student.standard}</td>
          <td><Button color="danger">Delete</Button></td>
          <td><Button color="warning ml-3">Update</Button></td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Student;