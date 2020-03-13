import './App.css';
import AddBar from './componants/AddBar'
import React, { Component } from 'react'
import ListItem from './componants/listItem'
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state={
        items : []
    }
  }

  getUpdatedTasks = () =>{
    console.log("getUpdated")
    axios.get(`/getitems`)
    .then(res => {
      console.log(JSON.stringify(res))
      const items = res.data;
      this.setState({ items });
    })
  }

  deleteTask=(i)=>{
    axios.delete(`/getitems/${i}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).then(()=>  this.getUpdatedTasks())
  }
  
  completeTask=(i)=>{
    axios.put(`/toggleconfirm/${i}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).then(()=>  this.getUpdatedTasks())
  }

  addTask = (newtitle) =>{
    axios.post(`/additem`,{title : newtitle, checked : false})
    .then(res => {
      console.log(res);
      console.log(res.data);
    }).then(()=>  this.getUpdatedTasks())
  }

  componentDidMount(){
    this.getUpdatedTasks()
  }

  render() {
    return (
      <div>
        <AddBar addTask={this.addTask}/>  
        < ListItem items={this.state.items} deleteTask={this.deleteTask} completeTask={this.completeTask}/>  
      </div>
    )
  }
}

export default App;