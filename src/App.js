import React, { Component } from 'react';
import {DexAgSdk} from 'dexag-sdk'

import Token from './Components/Token'
import Totals from './Components/Totals'
import Status from './Components/Status'

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
		  this.setState({status})
		});
		this.findTrades()
	}
	findTrades = async() =>{
		sdk.getBest({to: 'DAI', from: 'ETH', amount: 159}).then(async(result)=>{
			console.log(result)
			this.setState({order: result})
		})
	}
	render() {
		let {source} = this.state.order.metadata;
		return (
			<div className="app">
				<div className="info">
					<h3>Trade at the best price, with a few lines of code</h3>
					<a href="">Learn more about the DEX.AG SDK</a>
				</div>
				<div className="container">
					<div className="title">
						<p>Buy</p> <Token type="to" findTrades={this.findTrades}/>
						<p>With</p> <Token type="from" findTrades={this.findTrades}/>
					</div>
					<div className="amount"><input value="1" /> DAI</div>
					<Totals source={source}/>
					<button onClick={()=>sdk.validateWeb3(this.state.order)}>Buy</button>
					<Status status={this.state.status} />
				</div>
			</div>
		);
	}
}

export default App;
