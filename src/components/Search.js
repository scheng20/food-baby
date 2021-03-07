import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          itemList: [],
          item: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    handleChange(event) {
        this.setState({item: event.target.value});
    }

    handleSubmit(event) {
        //alert('An essay was submitted: ' + this.state.item);
        //this.state.itemList.push(this.state.item);
        this.setState({ ...this.state, itemList: this.state.itemList.concat([this.state.item]) });
        event.preventDefault();
    }
    
    // addItem(e) {
    //     if (this.state.item !== "") {
    //       var newItem = {
    //         item: this._inputElement.value,
    //         key: Date.now()
    //       };
       
    //       this.setState((prevState) => {
    //         return { 
    //           items: prevState.items.concat(newItem) 
    //         };
    //       });
         
    //       this._inputElement.value = "";
    //     }
         
    //     console.log(this.state.items);
           
    //     e.preventDefault();
    // }

    render() {
        console.log(this.state);
        return (
            <div>
                <h1>Search</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange}></input>
                    <input type="submit" value="Confirm"></input>
                </form>

                <button>Confirm</button>
            </div>
        );
    }
}

// const Search = () => {

//     const getInitialState = () => {			
// 		return { toByGroceryItems : [], purchasedGroceryItems : [] }
//     }
    
//     const handleGroceryItemAddition = (groceryItem) => {	
// 		var allItems = this.state.toByGroceryItems.concat([groceryItem]);
// 		this.setState({toByGroceryItems: allItems});
//     }

//     // handleChange = (event) => {
//     //     this.setState({item: event.target.value});
//     // }

//     // handleSubmit = () => {
//     //     this.props.list.push(this.state.item);
//     //     alert(this.props.list);
//     //     //event.preventDefault();
//     // }


//     return (
//         <div>
//             <h1>Search</h1>
//             <GroceryItemAddForm onFormSubmit={this.handleGroceryItemAddition}/>
//                 {/* <input type="text" name={this.state.item} onChange={this.handleChange}></input>
//                 <button onClick={this.handleSubmit}>Search</button> */}

//         </div>
//     );

// }

// var GroceryItemAddForm = React.createClass({
// 	getInitialState : function() {
// 	  return { item: ''};
//     },
    
// 	handleSubmit : function(e){
	
// 	  e.preventDefault();
    
//     if(React.findDOMNode(this.refs.itemText).value === "")
// 	  {
// 	    alert('Please enter a valid item');
// 		React.findDOMNode(this.refs.itemText).focus();
// 		return false;
// 	  }
    
// 	    this.props.onFormSubmit(this.state);
// 	    this.setState({ 
// 			itemText: '', id : null, isPurchased : false
// 		});
	  
// 	  React.findDOMNode(this.refs.itemText).focus();
	  
// 	  return;
//     }
    
// 	onChange : function(e) {
// 	  this.setState({
// 	    item : e.target.value
// 	  });
// 	},
// 	render : function() {
// 	return (
// 				<form onSubmit={this.handleSubmit}>
// 					<input ref="itemText" onChange={this.onChange} value={this.state.itemText} type="text" id="grocery-item-text" placeholder="Add a Grocery Item..." /> 
// 					<button type="submit">Add</button>
// 				</form>
// 			);
// 	}
// });

export default Search;