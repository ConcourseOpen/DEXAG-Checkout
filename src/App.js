import React, { Component } from 'react';
import {DexAgSdk} from 'dexag-sdk'

import Token from './Components/Token'
import Totals from './Components/Totals'
import Status from './Components/Status'
import Amount from './Components/Amount'

const sdk = new DexAgSdk()
const orderModel = {
	metadata: {
		source: {}
	}
}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			order: orderModel,
			amount: 1
		}
	}
	componentDidMount(){
		sdk.registerStatusHandler((status, data)=>{
		  console.log(status)
		  this.setState({web3Status: {status, data}})
		});
		this.findTrades()
	}
	findTrades = async() =>{
		let {amount} = this.state;
		this.setState({order: orderModel})
		sdk.getBest({to: 'DAI', from: 'ETH', amount: amount}).then(async(result)=>{
			console.log(result)
			this.setState({order: result})
		})
	}
	changeAmount = (amount) => {
		this.setState({amount: amount})
		if(this.timeout) clearTimeout(this.timeout);
	    this.timeout = setTimeout(() => {
	      this.findTrades()
	  }, 1000);
	}
	trade = async() =>{
		let {order} = this.state;
		const valid = await sdk.validateWeb3(order);
		if (valid) {
			sdk.tradeOrder({tx: order});
		}
	}
	render() {
		let {source} = this.state.order.metadata;
		let {web3Status, amount} = this.state;
		return (
			<div className="app">
				<div className="info">
					<h3>Trade at the best price with a few lines of code</h3>
					<a href="">Learn more about the DEX.AG SDK</a>
				</div>
				<div className="container">
					<div className="title">
						<p>Input:</p> <Token type="to" findTrades={this.findTrades}/>
						<p>Output:</p> <Token type="from" findTrades={this.findTrades}/>
					</div>
					<Amount changeAmount={this.changeAmount} />
					<Totals source={source} amount={amount}/>
					<button onClick={()=>this.trade()}>Buy</button>
					<Status web3Status={web3Status} />
				</div>
			</div>
		);
	}
}

export default App;
