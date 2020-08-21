import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';
import logo from './logo.svg';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Card} from 'primereact/card';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import "primeflex/primeflex.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends Component {

  state = {
    test: null,
    isLoggedIn: false,
    displayFooter: false,
  }

  componentDidMount() {
    console.log('Component did mount');
    // The compat mode syntax is totally different, converting to v5 syntax
    // Client is imported from '@stomp/stompjs'
    this.client = new Client();

    this.client.configure({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
      onConnect: () => {
        console.log('Connected');

        this.client.subscribe('/topic/greetings', message => {
          this.setState({ test: JSON.parse(message.body).content }); //JSON.parse(message.body).content
          console.log(message);
          

        });
      },
    });
  }

  

  clickHandler = () => {

    if (this.state.isLoggedIn) {
      this.client.publish({ destination: '/app/hello', body: JSON.stringify({ 'msg': this.state.value, 'name': "dop"}) }); //this.state.value //JSON.stringify({'name': this.state.value})
    }

    console.log('onConnect');
    console.log(this.state.body);

  }

  clickDisconnect = () => {
    this.setState({ isLoggedIn: false });
    this.client.deactivate();
  }

   sendUsername = () => {
        if (this.state.isLoggedIn) {
      this.client.publish({ destination: '/app/hello', body: JSON.stringify({ 'msg': this.state.value }) }); //this.state.value //JSON.stringify({'name': this.state.value})
    }
  }



  clickConnect = () => {
    
    this.client.activate();
    this.setState({ isLoggedIn: true })
    this.sendUsername();
    console.log('onConnect');
    console.log(this.state.body);
  }

      renderFooter(name) {
        return (
            <div>
                <InputText placeholder="Enter your message" id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value }) } style={{marginRight: '.25em'}}/>
                <Button className="p-button-secondary" onClick={this.clickHandler} label="Send" iconPos="right" style={{marginRight: '.25em'}}/>
                <Button className="p-button-secondary" onClick={this.clickDisconnect} label="Disconnect" iconPos="right" style={{marginRight: '.25em'}}/>
            </div>
        );
    }

  render() {
    return (


 <div className="p-grid p-align-center vertical-container">
 <div className="p-col" style={{height:'500px'}}></div>
 <div className="p-col">
            <Card title="Simple Chat Bot App" style={{ textAlign: 'center'}}>

                <p>
                  <InputText placeholder="Enter your username" id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value }) } style={{marginRight: '.25em'}}/>
                  <Button className="p-button-secondary" onClick={this.clickHandler} label="Send" iconPos="right" style={{marginRight: '.25em'}}/>
                  <Button className="p-button-secondary" onClick={this.clickConnect} label="Connect" iconPos="right" style={{marginRight: '.25em'}}/>
                  <Button className="p-button-secondary" onClick={this.clickDisconnect} label="Disconnect" iconPos="right" style={{marginRight: '.25em'}}/>
                </p>
                <p>{this.state.test}</p>
              
  

                <Dialog header="Chat Room" visible={this.state.isLoggedIn} footer={this.renderFooter('displayFooter')} style={{ width: '50vw'}} closable={false}>
                    <Card style={{height: '35vw', marginBottom: '.25em'}}>
                    <Card>
                {this.state.test}
                </Card>
                </Card>
   
</Dialog>


             

            </Card>
            </div>
 <div className="p-col"></div>
</div>

      
   

    );
  }
}

export default App;