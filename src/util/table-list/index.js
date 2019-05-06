



import React from 'react';



class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            idFirstLoading:true
        }
    }
    componentWillReceiveProps(){
        this.setState({
            isFirstLoading:false
        })
    }
    render(){
        //tablhead info
        let tableHeader=this.props.tableHeads.map
        ((tableHead,index)=>{
           if(typeof tableHead==='object'){
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>
            }else if(typeof tableHead==='string'){
                return <th key={index}>{tableHead}</th>
            }  
         }
            
        );

        //tablebody info
        let listBody=this.props.children;

        let listInfo=(
            <tr>
                <td colSpan={this.props.tableHeads.length}>
                {this.state.isFirstLoading?'can not find relative results':'Loading'}
                </td>
            </tr>
        );
        let tableBody=listBody.length>0 ? listBody :listInfo;
        return(
            <div className="col-md-12">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            {tableHeader}
                        </tr> 
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </div>
        )
    }
} 

export default TableList;