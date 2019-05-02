import React, { Component } from 'react';
import {DexAgSdk} from 'dexag-sdk'

import Token from './Components/Token'

var sdk = new DexAgSdk()

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
		order: {
  		  metadata: {
  			  source: {}
  		  }
  	  }
    }
  }
  componentDidMount(){
	  sdk.registerStatusHandler((status)=>{
		  console.log(status)
	  });
	  this.findTrades()
  }
  findTrades = () =>{
	  sdk.getBest({}).then((result)=>{
		  console.log(result)
		  this.setState({order: result})
	  })
  }
  render() {
	let {price, dex} = this.state.order.metadata.source;
	let priceExists = price!=undefined;
    return (
	<div className="app">
		<div className="info">
			<h3>Swap tokens at the best price</h3>
			<a href="">Learn More</a>
		</div>
		<div className="container">
			<div className="title">
				<p>Buy</p> <Token type="to" findTrades={this.findTrades}/>
				<p>For</p> <Token type="from" findTrades={this.findTrades}/>
			</div>
			<div className="amount"><input value="1" /> DAI</div>
			<h4 className="price">
				{!priceExists&&'finding best price..'}
				{priceExists&&<span>{parseInt(price).toFixed(2)} DAI <strong>from</strong> {dex}</span>}
			</h4>
			<button onClick={()=>sdk.validateWeb3(this.state.order)}>Buy</button>
			<div className="status-message">
				<h3>Waiting to be mined</h3>
			</div>
		</div>
	</div>
    );
  }
}

export default App;
