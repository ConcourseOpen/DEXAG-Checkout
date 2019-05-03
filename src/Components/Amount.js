import React from 'react';

export default class Amount extends React.Component {
    constructor(props) {
		super(props);
		this.state = {

		};
    }
    componentDidMount() {
    }
	render() {
		let {changeAmount} = this.props;
		return (
		<div className="amount">
			<input defaultValue="1" onChange={(e)=>changeAmount(e.target.value)} /> DAI
		</div>
		);
	}
  }
