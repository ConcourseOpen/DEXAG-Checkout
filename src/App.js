import React, { Component } from 'react';
import {DexAgSdk} from 'dexag-sdk'

//import Work from './Components/Work'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {}
    }
  }
  componentDidMount(){
	  var sdk = new DexAgSdk()

	  sdk.getBest({})
	  .then((result)=>{
		  console.log(result)
	  })
  }
  render() {
    return (
	<div className="app">
		<div className="container">
			<h3 className="title">Checkout with DEX.AG</h3>
			<select>
				<option value="ETH" selected="selected">Ethereum</option>
			</select>
			<select>
			<option value="ETH" selected="selected">DAI</option>
				</select>
			<button onClick="alert()">Buy</button>
			<div className="status-message">
				<h3>Waiting to be mined</h3>
			</div>
		</div>
	</div>
    );
  }
}

export default App;
