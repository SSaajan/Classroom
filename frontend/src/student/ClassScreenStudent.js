import React, {useState, useEffect} from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import axios from 'axios';

import userimg from '../res/User Image.png';
import joinClass from '../res/JoinClass.svg';
import exitImg from '../res/ExitIcon.svg';

import '../styles/style.css';
import '../styles/info.css';
import '../styles/assignment.css';

import ProfileDropDown from '../components/ProfileDropDown';

const ClassScreenStudent = ({ classCode, func, user }) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const[DropDown, SetDropDown] = useState(0);
    const[assignments, setAssignments] = useState();
    const[assignmentState, setAssignmentState] = useState('false');
    
    const[text, setText] = useState('');
    const[textF, setTextF] = useState('false');
    const[link, setLink] = useState('');
    const[linkF, setLinkF] = useState('true');
    const[time, setTime] = useState();
    const[done, setDone] = useState(0);
    const[submissionID, setSubmissionID] = useState();
    const[currentObject, setObject] = useState();
    const[changed, setChanged] = useState(0);

    var colour = "white", Acolour = "#707070";

    var url = 'http://127.0.0.1:8000/classes/assignments/' + classCode + '/';

    useEffect(async () => {
        var obj = []
        console.log(url);
        var result = await axios.get(url);
        console.log(result)
        for(let i = 0; i < result.data.assignments.length; i++){
            let temp = result.data.assignments[i].split(',')
            var res = await axios.get('http://127.0.0.1:8000/assignment/check/' + user + '/' + temp[0])
            console.log(res)
            if(res.data == 'false'){
                Acolour = "tomato";
            }
            else{
                Acolour = "mediumspringgreen";
            }
            obj.push({id:temp[0], title:temp[1], deadline:temp[2], description:temp[3], colour:Acolour, submitted:res.data});
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

    console.log(assignments)

    const changeDropDown = () => {
        if(DropDown == 1){
            SetDropDown(0);
        }
        else {
            SetDropDown(1);
        }
    }

    var menu;

    if(user == 'none'){
        return(<Redirect to = ''/>);
    }

    if(DropDown == 1){
        menu = <ProfileDropDown prop={func}/>
    }

    const changeAssignmentState = (id, index) => {
        setSubmissionID(id);
        setObject(index);
        if(assignmentState === 'false'){
            setAssignmentState('true');
        }
        else {
            setAssignmentState('false');
        }
    }

    const changeTextF = () => {
        if(textF === 'false'){
            setTextF('true');
            setLinkF('false');
        }
        else {
            setTextF('false');
            setLinkF('true');
        }
    }

    const MarkAsDone = () => {
        if(done === 0){
            setDone(1);
        }
        else {
            setDone(0);
        }
    }

    const updateText = (text) => {
        setText(text);
    }
    const updateLink = (link) => {
        setLink(link);
    }

    if(done == 1){
        colour = "#FFD560";
    }

    const submitAssignment = () => {
        if(assignments[currentObject].submitted != 'true'){
            axios({
                method:'POST',
                url:'http://127.0.0.1:8000/assignment/submit/',
                data: {
                    "AssignmentNum":submissionID,
                    "SubmittedBy":user,
                    "SubmissionText": text,
                    "SubmissionLink":link,
                    "MarkAsDone":done,
                }
            })
            setChanged(1);
            changeAssignmentState();
        }
        setLink('');
        setText('');
        setDone(0);
    }

    return(
        <div>
            <header>
                <NavLink Link to='/'>
                    <h1>Classroom</h1>
                </NavLink>
                <div className="header-actions">
                    <button className="join"><img src={joinClass} alt="Join Class Button"/></button>
                    <img className="user" src={userimg} alt="User DP" onClick={changeDropDown}/>
                </div>
                {menu}
            </header>
            <div className="outer-container">
                <div className="main">
                    <h2>Artificial Intelligence</h2>
                    <div className="container">
                        <h4>Assignments</h4>
                        {
                            (assignmentState === 'false')
                            ?<div className="assignments">
                                <ul>
                                {
                                    (typeof(assignments) === "undefined")
                                    ? <p>Loading</p>
                                    :assignments.map((item, index) => {
                                        return(
                                        <li style={{marginRight:'5%'}}>
                                            <div className="line"></div>
                                            <div className="card" onClick={()=>{changeAssignmentState(item.id, index)}}>
                                                <div style={{display:'flex', justifyContent:'space-between',
                                                alignItems:'center', marginTop:'2%'}}>
                                                <h3>{item.title}</h3>
                                                <div 
                                                style={{background:item.colour, 
                                                width:'15px', height:'15px', borderRadius:'50%'}}>
                                                </div>
                                                </div>
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
                                <div class="line"></div>                            
                                <div class="AssignmentCard">
                                <div style={{display:'flex', justifyContent:'space-between',
                                                alignItems:'center', marginTop:'2%', width:'100%'}}>
                                    <div style={{display:'flex', width:'90%', alignItems:'center'}}>
                                        <p class="Title">{assignments[currentObject].title}</p>
                                        <div 
                                        style={{background:assignments[currentObject].colour, 
                                        width:'15px', height:'15px', borderRadius:'50%', marginLeft:'2%'}}>
                                        </div>
                                    </div>
                                    
                                    <img style={{height:'15px', width:'15px', marginRight:'2%', cursor:'pointer'}} 
                                    src={exitImg}
                                    onClick={() => {changeAssignmentState("", "")}}/>
                                </div>
                                <p class="deadline">{assignments[currentObject].deadline}</p>
                                <p class="text">{assignments[currentObject].description}</p>
                                </div>
                                {
                                    (textF == 'false')
                                    ?<textarea 
                                    style={{width:'75%', borderRadius:'10px', height:'50%',padding:'2%'}} 
                                    placeholder="Enter Link"
                                    onChange={(e) => updateLink(e.target.value)}
                                    value={link}
                                    />
                                    :<textarea 
                                    style={{width:'75%', borderRadius:'10px', height:'50%',padding:'2%'}} 
                                    placeholder="Enter Text"
                                    onChange={(e) => updateText(e.target.value)}
                                    value={text}
                                    />
                                }
                                
                                <div class="buttons">
                                    <div class="first">
                                        <button class="type0" onClick={changeTextF}>Add file</button>
                                        <button class="type0" onClick={changeTextF}>Add Text</button>
                                        <button class="type1" style={{background:colour}} onClick={MarkAsDone}>Mark as done</button>
                                    </div>
                                    <button class="type2" onClick={submitAssignment}>Submit</button>
                                </div>
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
                </div>
            </div>
        </div>
    );
}

export default ClassScreenStudent;