import React from 'react'
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      taskList:[""],
      visible: true,
      input: "",
      time: "",
      today: "",
      visibleChange:true,
      changeKey: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitTask = this.submitTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.enterTask = this.enterTask.bind(this)
    this.changeTask = this.changeTask.bind(this)
  }
  enterTask(){
    var len= 60
    return(
      <>
        <h1 className='taskEnterHeader'>Enter a Task</h1>
        <textarea maxLength={len} value={this.state.input} onChange={this.handleChange}placeholder='What do you have to do today?'></textarea>
        {<p>Characters left :{len-this.state.input.length}</p>}
        <button type='submit' onClick={this.submitTask}>Done</button>
      </>
      )
  }

  removeTask(e){
    this.setState(state=>{
      return {taskList:(state.taskList.filter((val)=>
        state.taskList.indexOf(val)!=e.target.getAttribute("data-key"))
  
    )}})
  }
  changeTask(){
    
    let key = this.state.changeKey
    var len= 60;
    
    return(
      <>
        <h1 className='taskEnterHeader'>Change Task To</h1>
        <textarea maxLength={len} value={this.state.input} onChange={this.handleChange}placeholder = {`Changing from ${this.state.taskList[key]}`} ></textarea>
        {<p>Characters left :{len-this.state.input.length}</p>}
        <div className='changeTaskChoice'>
        <button style={{marginRight:10}}type='submit' onClick={()=>{
          if(this.state.input){
              this.submitChange(key)
          }else{
            this.setState({visibleChange:true})
          }
          }
          }>Done</button>
        <button type='submit' onClick={()=>this.setState({visibleChange:true, input:""})}>Cancel</button>
        </div>
      </>
      )
  }
  handleChange(e){
    this.setState({input: e.target.value})
  }
  submitChange(idx){
    let items = [...this.state.taskList]
    items[idx] = this.state.input
    this.setState(state=>{
      return {taskList: items }
    })
    this.setState({input:""})
    this.setState({visibleChange:true})
  }
  submitTask(){
    if (this.state.taskList[0]===""){
      this.state.taskList.pop()
    }
    if(this.state.input !==""){
      this.state.taskList.push(this.state.input)
    }
   
    this.setState({input:""})
    this.setState({visible:true})
  }
  render(){
    if(!this.state.visible){
   
    return(
    <div className='taskEnter'>
      {this.enterTask()}
    </div>
    )
  }
  if(!this.state.visibleChange){
   
    return(
    <div className='taskEnter'>
      {this.changeTask()}
    </div>
    )}
  

  setInterval(()=>{
    const date = new Date()
    this.setState({time :`${date.getHours()>12? date.getHours()-12: date.getHours()}:${date.getMinutes()<10? "0"+`${date.getMinutes()}`:date.getMinutes()}`})
    this.setState({today: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} )
    }, 1000)
  return (

    <div className="App">
      <div className='container1'>
        <div className='Header'>
          <h1 className='ToDo'>TO-DO</h1>
          <div className='TimeRelated'>
            <h2 className='time'>{this.state.time}</h2>
            <h2 className='today'>{this.state.today}</h2>
          </div>
        </div>
        <div className="taskSect">
        {this.state.taskList.map((val, key)=>{
          
          if(this.state.taskList[0]!== "" ){
            return(
            <div className='tasks'>
              <h1 className='taskHead'>Task</h1>
              <h2 className="actualTask" > {val} </h2>
              <div id="choices">
              <p  data-key={key} className='doneTask' onClick={this.removeTask}>Done</p>
              <p  data-key={key} className='doneTask' onClick={()=>this.setState({changeKey:key, visibleChange:false})}>Change</p>
              </div>
            </div>
            )}
            
        })}
        <div className='tasksMake' onClick={()=>this.setState({visible:false})}>+</div>
        </div>
      </div>
    </div>
  );

}
}

export default App;
