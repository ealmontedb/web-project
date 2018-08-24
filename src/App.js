import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'reactstrap';
import { Alert } from "reactstrap";
import Example from "./Example";
import NavBar from "./NavBar";
import blessjpg from "./Logo Bless edited.jpg";
import Card from "./Cards";

class App extends Component {
 
  onChangeHandler(e){
       const v= e.target.value;
       if(e.target.checked){
         this.setState(
       (prevState)=> ( {states: prevState.states.push(v)} )
         ,console.log(this.state.states))

  }/*else{
        this.setState(
           (prevState)=> { return {states: prevState.states.filter(x=>x!==v)};}
         ,console.log('deleted->'+this.state.states))
       }*/
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
     {/*     <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
  */}

          <NavBar/>
          <Example />
          
        </header>
      {/*  <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
  </p>*/}
       {/* <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"  rel="stylesheet">
  </link>*/}
       
       <div className="Logo-container">
         <img src={blessjpg} className="Logo" alt="logo" />
         <div className="description">
            <h1>Quienes somos? </h1>
            <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus odio odio, eu commodo elit eleifend ut. Aliquam imperdiet, dui vitae dignissim rhoncus, leo erat vulputate nibh, eget rutrum mauris leo sit amet ex. Mauris faucibus erat semper nunc scelerisque, nec finibus nisi tristique. Nam eget maximus dui. Donec vitae diam pretium, bibendum neque id, vestibulum tellus. Donec massa massa, vestibulum ut finibus non, malesuada id purus. Praesent sagittis facilisis rutrum. Duis urna eros, luctus vitae lorem et, pellentesque porttitor diam. Ut non ligula mollis, malesuada augue nec, aliquam lacus. Nunc commodo et dolor sit amet ultrices. Phasellus ligula velit, tristique ut vulputate quis, finibus dignissim elit. 
          
            </p>
          
         </div>
       </div>       
         <div className="Cards">
            <Card src="https://images.pexels.com/photos/66354/pexels-photo-66354.jpeg?auto=compress&cs=tinysrgb&h=350"/>
            <Card src="https://images.pexels.com/photos/185489/pexels-photo-185489.jpeg?auto=compress&cs=tinysrgb&h=350"/>
            <Card src="https://images.pexels.com/photos/356148/pexels-photo-356148.jpeg?auto=compress&cs=tinysrgb&h=350"/>
         </div>
         <div>

         </div>
      </div>
      
    );
  }
}


export default App;
