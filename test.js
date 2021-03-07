/**
 * @jsx React.DOM
 */

/**
 * The grocery list application allows adding 
 * and removing of of grocery items from a simple list
 *
 * @class GroceryListApp
 */
var GroceryListApp = React.createClass({
	componentDidMount : function(){
		document.getElementById('grocery-item-text').focus();
	},
	getInitialState : function(){			
		return { toByGroceryItems : [], purchasedGroceryItems : [] }
	},
	handleGroceryItemAddition : function(groceryItem) {	
		var allItems = this.state.toByGroceryItems.concat([groceryItem]);
		this.setState({toByGroceryItems: allItems});				
	},
	handleGroceryItemPurchase : function(updatedGroceryItem) {
			
		var allPurchasedItems = this.state.purchasedGroceryItems.concat([updatedGroceryItem]);
		var remainingGroceryItems = this.state.toByGroceryItems.slice();
		var toRemoveIndex = this.state.toByGroceryItems.map(function(item){
			   if(item.id === updatedGroceryItem.id)
			   {				 
				 return item.id;
			   }
			}.bind(this)).indexOf(updatedGroceryItem.id);
		remainingGroceryItems.splice(toRemoveIndex, 1);
		
		this.setState({toByGroceryItems : remainingGroceryItems});
		this.setState({purchasedGroceryItems : allPurchasedItems});
		
	},
	resetForm  : function(){
	  this.setState({ toByGroceryItems : [], purchasedGroceryItems : [] });
	  document.getElementById('grocery-item-text').focus();
	},
	render : function() {
		return (
				<div id="grocery-list">
					<h1>Grocery List</h1>
					<GroceryItemAddForm onFormSubmit={this.handleGroceryItemAddition}/>
					<GroceryItemsListView handleGroceryItemPurchase={this.handleGroceryItemPurchase} toByGroceryItems={this.state.toByGroceryItems}/>
					<GroceryPurchasedItemsListView purchasedGroceryItems={this.state.purchasedGroceryItems}/>
					<button id="clear-grocery-list" onClick={this.resetForm}>Clear List</button>
				</div>
			)
  }
});

/**
 * Represents the form used to add items to the toBuyGroceryList
 *
 * @class GroceryItemView
 */
var GroceryItemAddForm = React.createClass({
	getInitialState : function() {
	  return { itemText: '', id : null, isPurchased : false};
	},
	handleSubmit : function(e){
	
	  e.preventDefault();
    
    if(React.findDOMNode(this.refs.itemText).value === "")
	  {
	    alert('Please enter a valid item');
		React.findDOMNode(this.refs.itemText).focus();
		return false;
	  }
    
		  this.props.onFormSubmit(this.state);
	  this.setState({ 
			itemText: '', id : null, isPurchased : false
		});
	  
	  React.findDOMNode(this.refs.itemText).focus();
	  
	  return;
	},
	onChange : function(e) {
	  this.setState({
	    itemText : e.target.value,
		isPurchased : false,
		id : guid()
	  });
	},
	render : function() {
	return (
				<form onSubmit={this.handleSubmit}>
					<input ref="itemText" onChange={this.onChange} 
            value={this.state.itemText} type="text" 
            id="grocery-item-text" placeholder="Add a Grocery Item..." /> 
					<button type="submit">Add</button>
				</form>
			);
	}
});

/**
 * Represents one grocery item in the list
 *
 * @class GroceryItemView
 */
var GroceryItemView = React.createClass({
	getInitialState : function() {
		return {
			id : null,
			isPurchased : false,
			itemText : ""
		  };
	},
	onGroceryItemPurchased : function(e){			  
	
	  var id = e.target.id;
	  var isPurchased = !this.props.isPurchased;
	  var itemText    = this.props.itemText;
	  
	  var updatedGroceryItem = {
      id : id,
      isPurchased : isPurchased,
      itemText : itemText
	  };
	  
	  this.setState(updatedGroceryItem);
	  this.props.handleGroceryItemPurchase(updatedGroceryItem);			  			 
	  this.setState({id : null, isPurchased : false, itemText : ""});
	  return;
	},		
	render : function() {		
		return (
				<li className="grocery-item">
					<input onChange={this.onGroceryItemPurchased} id={this.props.id} type="checkbox"/> {this.props.itemText}
				</li>
			);			
	}
});

/**
 * Represents one grocery item in the list after it's been purchased
 *
 * @class GroceryItemView
 */
var GroceryPurchasedItemView = React.createClass({			
	render : function() {	
		return (<li className="grocery-item purchased">{this.props.itemText}</li>);
	}
});


/**
 * Represents the entire to be purchased grocery list
 *
 * @class GroceryItemView
 */
var GroceryItemsListView = React.createClass({		
	render : function() {			
	
		var groceryItems = this.props.toByGroceryItems.map(function(item){
		  return <GroceryItemView handleGroceryItemPurchase={this.props.handleGroceryItemPurchase} id={item.id} itemText={item.itemText} key={item.id} isPurchased={item.isPurchased}/>
		}.bind(this));			
		 
     if(groceryItems.length < 1){
			  groceryItems = [<li className="grocery-item empty">Items to buy will show here...</li>];
		}
    
		 return (
		<div className="list-container">
				<h3>To Buy</h3>
				<ul>
				   {groceryItems}
				</ul>
			</div>
		);
	}
});

/**
 * Represents the entire purchased grocery list
 *
 * @class GroceryItemView
 */
var GroceryPurchasedItemsListView = React.createClass({		
	render : function() {
			var groceryItems = this.props.purchasedGroceryItems.map(function(item){
		  return <GroceryPurchasedItemView v={this} itemText={item.itemText} key={item.id} isPurchased={item.isPurchased}/>
		}.bind(this));	
		
    if(groceryItems.length < 1){
			  groceryItems = [<li className="grocery-item empty">Items already bought will show here...</li>];
		}
    
		 return (
			<div className="list-container">
				<h3>Bought</h3>
				<ul>
				   {groceryItems}
				</ul>
			</div>
		);
	}
});

/**
 * pseudo id		 
 */
var guid = function() {
	var s4 = function() {
		return Math.floor((1 + Math.random()) * 0x10000)
		  .toString(16)
		  .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
};

React.render(<GroceryListApp/>,document.getElementById('grocery-list-wrapper'));