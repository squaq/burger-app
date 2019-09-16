import React from 'react';
import classes from './Order.css'

const order = props => {
	let ingredientsSpans = []
	for(let ing in props.ingredients) {
		console.log(classes.Ingredient)
		ingredientsSpans.push(
			<span key={ing} style={{
				textTransform: 'capitalize',
				display: 'inline-block',
				margin: '0 8px',
				border: 'solid 1px #ccc',
				padding: '5px'
			}}>
				{`${ing} (${props.ingredients[ing]})`}
			</span>
		)
	}

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientsSpans}</p>
			<p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
		</div>
	)
};

export default order;