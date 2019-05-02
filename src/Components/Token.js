import React from 'react';

export default class Token extends React.Component {
	constructor(props) {
      super(props);
      this.state = {

      };
    }
    componentDidMount() {
    }
	onChange = () =>{
		this.props.findTrades()
		console.log('here')
	}
    render() {
	  let {type} = this.props;
      return (
		 <select defaultValue={type=='to'?'DAI':'ETH'} onChange={this.onChange}>
  			<option value="DAI">DAI</option>
  			<option value="ETH">ETH</option>
  			<option value="USDC">USDC</option>
  			<option value="MKR">MKR</option>
  			<option value="BAT">BAT</option>
  		</select>
      );
    }
  }
