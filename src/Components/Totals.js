import React from 'react';

export default class Totals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
    componentDidMount() {
    }
	cleanDex = (dex) => {
		// format text in UI
		if(dex!=undefined) return dex.replace(/-/g,' ').toLowerCase()
		return dex
	}
	formatPrice = (price) => {
		// handle large and small values
		return price>1?price.toFixed(2):price.toPrecision(2)
	}
	render() {
		let {price, dex} = this.props.source;
		let priceExists = price!=undefined;
		if(priceExists) price = parseFloat(price)
		return (
		  <div className="price">
			 <div className="price-total">
			 	{!priceExists&&'Finding best price..'}
				{priceExists&&<div className="price-details">
				 	Price: {this.formatPrice(price)} ETH - Total: {this.formatPrice(price*this.props.amount)} ETH
					<span>DEX: {this.cleanDex(dex)}</span>
				</div>}
			 </div>
		 </div>
		);
	}
  }
