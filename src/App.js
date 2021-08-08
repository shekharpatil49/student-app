import logo from './logo.svg';
import './App.css';
import {ToastContainer , toast} from 'react-toastify';
import {Button, Container, Row,Col} from 'reactstrap';
import Home from './components/Home';
import Menu from './components/Menu';
import Student from './components/Student';
import AllStudent from './components/AllStudent';
import AddStudent from './components/AddStudent';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import FindByRollNo from './components/FindByRollNo';

function App() {

  const btnHandler =()=>{
    toast.success("Done");
  }
  return(
    <div>
      <ToastContainer/>
      <Router>
        <Container>
          <Row>
            <Home/>
          </Row>
          <Row>
            <Menu/>
          </Row>
          <Row>
            <Route path="/add-student" component={AddStudent} exact/>
            <Route path="/view-student" component={AllStudent} exact/>
            <Route path="/add-student/:id" component={AddStudent} exact/>
            <Route path="/find-student" component={FindByRollNo} exact/>
            <Route path="/find-student/:rollNo" component={FindByRollNo} exact/>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
