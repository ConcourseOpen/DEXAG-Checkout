import React from 'react';

export default class Token extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
    componentDidMount() {
    }
	render() {
		let {type} = this.props;
		let token = type=='to'?'DAI':'ETH';
		return (
		<select defaultValue={token}>
			<option value={token}>{token}</option>
		</select>
		);
	}
  }
