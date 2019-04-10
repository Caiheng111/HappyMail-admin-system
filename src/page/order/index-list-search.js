











import React from 'react';


class ListSearch extends React.Component{


    constructor(props){
        super(props);
        this.state={
            orderNumber:''
        }
    }

    onValueChange(e){
        let name=e.target.name,
            value=e.target.value.trim();
        this.setState({
            [name]:value
        });
    }

    onSearch(){
        this.props.onSearch(this.state.orderNumber)
    }

    onSearchKeywordKeyUp(e){
        if(e.keyCode===13){
            this.onSearch();
        }
        
    }
    render(){
        
        return (
            <div className="row search-wrap">
                    <div className="col-md-12">
                        <div className="form-inline">
                            <div className="form-group">                     
                                <select 
                                    className="form-control">
                                    <option>Search By Order Number</option>
                               
                                </select>
                            </div>
                            <div className="form-group">
                                <input 
                                    onChange={(e)=>this.onValueChange(e)}
                                    name="orderNumber"
                                    onKeyUp={(e)=>this.onSearchKeywordKeyUp(e)}
                                    type="text" 
                                    className="form-control"  
                                    placeholder="Order Number"/>
                            </div>
                            <button
                                onClick={(e)=>this.onSearch(e)}
                                className="btn btn-primary">Search</button>
                        </div>
                    
                    </div>
                </div>

            
        )
    }
}


export default ListSearch;
