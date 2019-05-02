import React from 'react';

export default class Totals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
    componentDidMount() {
    }
	cleanDex(dex){
		if(dex!=undefined) return dex.replace(/-/g,' ').toLowerCase()
		return dex
	}
	render() {
		let {price, dex} = this.props.source;
		let priceExists = price!=undefined;
		if(priceExists){
		  price = parseFloat(price)
		}
		return (
		  <div className="price">
			 <div className="price-total">
			 	{!priceExists&&'Finding best price..'}
				{priceExists&&<div>
				 	Price: {price>1?price.toFixed(2):price.toPrecision(2)} DAI
					<strong>from</strong>
					<span>{this.cleanDex(dex)}</span>
				</div>}
			 </div>
		 </div>
		);
	}
  }
