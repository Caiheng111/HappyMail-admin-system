
import React from 'react';
import FileUpload from './react-fileupload.js';


class FileUploader extends React.Component{
    render(){
	
	const options={
        baseUrl:'/manage/product/upload.do',
        fileFieldName:'upload_file',
        dataType:'json',
        chooseAndUpload:true,
        uploadSuccess:(res)=>{this.props.onSuccess(res.data)},
        uploadError:(err)=>{this.props.onError(err.message || 'Upload Unsuccessfully')}
  
	}

	return (
		<FileUpload options={options}>
			<button ref='chooseAndUpload'>choose file</button>
		</FileUpload>
	)	        
    }
}

export default FileUploader;