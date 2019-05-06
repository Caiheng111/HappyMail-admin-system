
import React from 'react';
import 'rc-pagination/dist/rc-pagination.min.css';
import RcPagination from 'rc-pagination';

class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <RcPagination {...this.props} 
                    hideOnSinglePage
                    showQuickJumper/>
                </div>
            </div>
        )
    }
} 

export default Pagination;