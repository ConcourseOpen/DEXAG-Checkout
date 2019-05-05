import React, { Component } from 'react';
import {DexAgSdk} from 'dexag-sdk'

// Components
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
		// register dexag callback for status messages
		sdk.registerStatusHandler((status, data)=>{
		  this.setState({web3Status: {status, data}})
		  console.log(status)
		});
		// find the price for default pair
		this.findTrades()
	}
	findTrades = async() =>{
		let {amount} = this.state;
		// reset order in UI
		this.setState({order: orderModel})
		// get the best price for the pair and amount
		sdk.getBest({to: 'DAI', from: 'ETH', amount: amount}).then(async(result)=>{
			// update UI
			this.setState({order: result})
			console.log(result)
		})
	}
	changeAmount = (amount) => {
		this.setState({amount: amount})
		this.setState({order: orderModel})
		// wait for user to stop typing
		if(this.timeout) clearTimeout(this.timeout);
	    this.timeout = setTimeout(() => {
	      this.findTrades()
	  }, 1000);
	}
	trade = async() =>{
		let {order} = this.state;
		// start web3 validation process
		const valid = await sdk.validateWeb3(order);
		if (valid) {
			// web3 is valid, trade order
			sdk.tradeOrder({tx: order});
		}
	}
	render() {
		let {source} = this.state.order.metadata;
		let {order, web3Status, amount} = this.state;
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
					<button onClick={()=>this.trade()} disabled={order==orderModel}>Buy</button>
					<Status web3Status={web3Status} />
				</div>
			</div>
		);
	}
}

export default App;
