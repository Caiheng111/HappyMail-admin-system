









import React from 'react';


class ListSearch extends React.Component{


    constructor(props){
        super(props);
        this.state={
            searchType:'productId',
            searchKeyword:'',
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
        this.props.onSearch(
            this.state.searchType,this.state.searchKeyword
        );
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
                                    onChange={(e)=>this.onValueChange(e)}
                                    name="searchType"
                                    className="form-control">
                                    <option value="productId">Search By ID</option>
                                    <option value="productName">Search By Name</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input 
                                    onChange={(e)=>this.onValueChange(e)}
                                    name="searchKeyword"
                                    onKeyUp={(e)=>this.onSearchKeywordKeyUp(e)}
                                    type="text" 
                                    className="form-control"  
                                    placeholder="keyword"/>
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
