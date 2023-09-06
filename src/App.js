import './App.css';
import {BrowserRouter as Router ,Route,Switch}from 'react-router-dom';
import ListEmployeeComponent from './Components/ListEmployeeComponent';
import FooterComponent from './Components/FooterComponent';
import HeaderComponent from './Components/HeaderComponent';
import CreateEmployee from './Components/CreateEmployee';
import Bulkedit from './Components/Bulkedit';
import Bulkadd from './Components/bulkadd';
import Login from './Components/Login'
import File from './Components/file';

function App() {
  return (
    <div >
    <Router>
      <HeaderComponent/>
        <Switch>
          <Route path="/employees"  component={ListEmployeeComponent}></Route>
          <Route path="/addemployee" component={CreateEmployee}></Route>
          <Route path="/updateemployee/:id" component={CreateEmployee}></Route>
          <Route path="/bulkeditemployee" component={Bulkedit}></Route>
          <Route path="/bulkadd" component={Bulkadd}></Route>
          <Route path="/" component={Login}></Route>
          <Route path="/spinner" component={File}></Route>
        </Switch>
     <FooterComponent/>
    </Router>
    </div>
  );
}

export default App;
