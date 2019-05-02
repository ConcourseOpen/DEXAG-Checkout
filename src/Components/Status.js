import React from 'react';

export default class Status extends React.Component {
    constructor(props) {
		super(props);
		this.state = {

		};
    }
    componentDidMount() {
    }
	render() {
		let {status} = this.props;
		return (
		<div className="status-message">
			{status=='init'&&<h3>Preparing the trade…</h3>}
		</div>
		);
	}
  }
