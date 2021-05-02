import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Welcome from './components/welcome';
import StudentClass from './student/StudentClass';
import StudentLogin from './student/StudentLogin';
import TeacherLogin from './teacher/TeacherLogin';
import TeacherClass from './teacher/TeacherClass';
import ClassScreenStudent from './student/ClassScreenStudent';
import ClassScreenTeacher from './teacher/ClassScreenTeacher';
import StudentList from './teacher/StudentList';

function App() {

  const[user, setUser] = useState('');
  const[currentClass, setCurrentClass] = useState(0);
  const[currentClassCode, setCurrentClasscode] = useState('');

  const setUserID = (ID) => {
    setUser(ID);
  }

  const setClass = (ID) => {
    setCurrentClass(ID);
  }

  console.log(currentClass);

  return (
    <Router>
      <Switch>

        <Route exact path='/'>
          <Welcome/>
        </Route>

        <Route exact path='/login/student'
          render = {() => <StudentLogin props={setUserID}/>}
        />

        <Route exact path='/login/teacher'>
          <TeacherLogin props={setUserID}/>
        </Route>

        <Route exact path='/sclasses'
          render = {() => <StudentClass user={user} func={setUserID} classFunc={setClass}/>}
        />

        <Route exact path='/tclasses'
          render = {() => <TeacherClass user={user} func={setUserID} classFunc={setClass} codefunc={setCurrentClasscode}/>}
        />

        <Route exact path='/sclasses/class'
          render = {() => <ClassScreenStudent user={user} classCode = {currentClass} func = {setUserID}/>}
        />

        <Route exact path='/tclasses/class'
          render = {() => <ClassScreenTeacher user={user} classCode = {currentClass} func = {setUserID}/>}
        />
        
        <Route exact path='/tclass/students'
          render = {() => <StudentList classCode = {currentClassCode} func = {setUserID}/>}
        />
        
      </Switch>
    </Router>
  );
}

export default App;
