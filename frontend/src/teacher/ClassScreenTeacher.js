import React, {useState, useEffect} from 'react'
import { Redirect, NavLink, Link } from 'react-router-dom'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';

import userimg from '../res/User Image.png';
import joinClass from '../res/JoinClass.svg';
import exitImg from '../res/ExitIcon.svg';

import '../styles/style.css';
import '../styles/info.css';
import '../styles/assignment.css';

import ProfileDropDown from '../components/ProfileDropDown';

const ClassScreenTeacher = ({ classCode, func, user }) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const[DropDown, SetDropDown] = useState(0);
    const[assignments, setAssignments] = useState();
    const[submissions, setSubmissions] = useState();
    const[submissionState, setSubmissionState] = useState('false');
    const[time, setTime] = useState();
    const[createAssignmentState, setCreateAssignmentState] = useState('false')
    const[classDet, setClass] = useState();
    const[changed, setChanged] = useState(0);

    const[title, setTitle] = useState('')
    const[desc, setDesc] = useState('')
    const[deadline, setDeadline] = useState('2021-05-02T07:58:37.020831Z')
    const[attachmentLink, setAttachmentLink] = useState('')
    const updateTitle = (text) => {
        setTitle(text);
    }
    const updateDesc = (desc) => {
        setDesc(desc);
    }
    const updateDeadline = (deadline) => {
        setDeadline(deadline);
    }
    const updateAttachmentLink = (link) => {
        setAttachmentLink(link);
    }

    var url = 'http://127.0.0.1:8000/classes/assignments/' + classCode + '/';

    useEffect(async () => {
        var obj = []
        var result = await axios.get(url);
        setClass(result.data)
        for(let i = 0; i < result.data.assignments.length; i++){
            let temp = result.data.assignments[i].split(',')
            var res = await axios.get('http://127.0.0.1:8000/assignment/check/' + user + '/' + temp[0])
            obj.push({id:temp[0], title:temp[1], deadline:temp[2], description:temp[3], submitted:res.data});
        }
        setAssignments(obj);
        var url1 = 'http://127.0.0.1:8000/classes/timings/' + result.data.code;
        console.log(url1)
        var res2 = axios.get(url1);
        res2.then((data) => {
            var t = [];
            for(let i = 0; i < data.data.time.length; i++){
                let temp = data.data.time[i].split(',')
                t.push({day:temp[0] - 1, time:temp[1]})
            }
            setTime(t)
        })
    }, [url, changed]);

    console.log(time)

    const changeDropDown = () => {
        if(DropDown == 1){
            SetDropDown(0);
        }
        else {
            SetDropDown(1);
        }
    }

    var menu, CreateAssignmentPopup;

    if(user == 'none'){
        return(<Redirect to = ''/>);
    }

    if(DropDown == 1){
        menu = <ProfileDropDown prop={func}/>
    }

    const changeSubmissionListState = () => {
        setSubmissionState('false');
    }
    const loadSubmissions = (id) => {
        if(submissionState === 'false'){
            setSubmissionState('true');
        }
        url = 'http://127.0.0.1:8000/assignment/getSubmissions/' + id;
        axios.get(url)
        .then((data) => {
            setSubmissions(data.data);
        })
    }

    const ChangeAssignmentPopup = () => {
        if(createAssignmentState === 'false'){
            setCreateAssignmentState('true')
        }
        else{
            setCreateAssignmentState('false')
        }
    }
    
    const createAssignment = (e) => {
        e.preventDefault();     
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/assignments/',
            data: {
                "title": title,
                "description": desc,
                "attachmentLink": attachmentLink,
                "classroom": classDet.id
            }
        })
        setChanged(1);
        ChangeAssignmentPopup();
    }
    if(createAssignmentState === 'true'){
        CreateAssignmentPopup = <div className="PopupContainer">
                                    <div className="AssignmentPopup">
                                        <p className="JoinHeading">Create Assignment</p>
                                        <form action="submit" onSubmit={(e) => {createAssignment(e)}}>
                                            <input value={title} type="text" placeholder="Enter Title" onChange={(e)=>updateTitle(e.target.value)} required/>
                                            <textarea value={desc} type="text" placeholder="Enter description" onChange={(e)=>updateDesc(e.target.value)} required/>
                                            <input value={deadline} type="text" placeholder="Enter deadline" onChange={(e)=>updateDeadline(e.target.value)}/>
                                            <input value={attachmentLink} type="text" placeholder="Enter Attachment Link" onChange={(e)=>updateAttachmentLink(e.target.value)}/>
                                            <button>Create</button>
                                        </form>
                                        <p onClick={ChangeAssignmentPopup} className="cancel">Cancel</p>
                                    </div>
                                </div>
    }

    return(
        <div>
            <header>
                <NavLink Link to='/'>
                    <h1>Classroom</h1>
                </NavLink>
                <div className="header-actions">
                    <img className="user" style={{width:'45%'}} src={userimg} alt="User DP" onClick={changeDropDown}/>
                </div>
                {menu}
            </header>
            <div className="outer-container">
                <div className="main">
                    {
                    (typeof(classDet) === 'undefined')
                    ?<div>
                        <h2>Loading</h2>
                        <p style={{marginTop:'1%', color:'#707070'}}>Class code:</p>  
                    </div> 
                    :<div>
                        <h2>{classDet.name}</h2>
                        <p style={{marginTop:'1%', color:'#707070'}}>Class code: {classDet.code}</p>  
                     </div> 
                    }
                    <div className="container">
                        {
                            (submissionState === 'false')
                            ?<div className="assignments">
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <h4>Assignments</h4>
                                <button onClick={ChangeAssignmentPopup}
                                style={{background:'#FFD560',borderRadius:'10px',padding:'1%',border:'none',
                                    fontSize:'1em',fontWeight:'500',color:'#444444', marginRight:'2%',cursor:'pointer'}}
                                >Create assignment</button>
                                </div>
                                <ul>
                                {
                                    (typeof(assignments) === "undefined")
                                    ? <p>Loading</p>
                                    :assignments.map((item) => {
                                        return(
                                        <li>
                                            <div className="line"></div>
                                            <div className="card" onClick={()=>{loadSubmissions(item.id)}}>
                                                <h3 style={{marginTop:'1%'}}>{item.title}</h3>
                                                <p className="deadline">Deadline: {item.deadline}</p>
                                                <p className="text">{item.description}</p>
                                            </div>
                                        </li>
                                        );
                                    })
                                }
                                </ul>
                            </div>
                            :<div className="assignments">
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <h4>Submissions</h4>
                                    <img style={{height:'15px', width:'15px', marginRight:'2%', cursor:'pointer', marginTop:'1%'}} 
                                        src={exitImg} onClick={() => {changeSubmissionListState()}}/>
                                </div>
                                <ul>
                                {
                                    (typeof(submissions) === "undefined")
                                    ? <p>Loading</p>
                                    :submissions.map((item) => {
                                        return(
                                        <li>
                                            <div className="line" style={{marginTop:'2%'}}></div>
                                            <div className="card" style={{cursor:'unset'}}>
                                                <h3 style={{marginTop:'1%'}}>{item.SubmittedBy}</h3>
                                                <p className="deadline">Submitted on: {item.time}</p>
                                                <p 
                                                style={{color:'#707070', marginTop:'1%', marginBottom:'.5%'}}>
                                                    {item.SubmissionText}</p>
                                                <a href={"https://"+item.SubmissionLink} target="/blank"
                                                style={{fontSize:'.9em', color:'#ADA5FF', marginBottom:'5%'}}
                                                >{item.SubmissionLink}</a>
                                            </div>
                                        </li>
                                        );
                                    })
                                }
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <div className="info">
                    <div className="info-top">
                        <h2 className="info-heading">Class timings</h2>
                        {
                            (typeof(time) === 'undefined')
                            ?<p style={{marginTop:'10%'}}>None</p>
                            :<ul>
                                {
                                    time.map((item) => {
                                        return(
                                            <li>
                                                <p className="day">{days[item.day]}</p>
                                                <p className="time">{item.time}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
                    <div className="attendance">
                        <NavLink Link to='/tclass/students'>
                            <button style={{background:'#FFD560',borderRadius:'10px',padding:'3%',border:'none',
                                fontSize:'1em',fontWeight:'500',color:'#444444', marginRight:'2%',cursor:'pointer'}}
                            >
                                View Students
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            {CreateAssignmentPopup}
        </div>
    );
}

export default ClassScreenTeacher;