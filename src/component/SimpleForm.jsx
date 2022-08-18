import React, { Component } from 'react'
import Header from './Header';
import ModalComp from './ModalComponent';
import axios from 'axios';

class SimpleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            fieldError: '',
            emailFieldError: '',
            files: [],
            imagefile: '',
            showModal: false,
            showSpinner: false,
            imgFiles:[],
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCommonTextChange=this.handleCommonTextChange.bind(this);
    }
    validateEmail(event) {
        event.preventDefault();
        let value = event.target.value;
        let emailValid;
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (typeof value !== 'string' || value.trim().length === 0 || emailValid === null) {
            this.setState({ emailFieldError: 'Please enter valid email address' });
        }
        else {
            this.setState({ emailFieldError: '', [event.target.name]: event.target.value });
        }
    }
    handleTextChange(event) {
        event.preventDefault();
        if (event.target.value === '' || event.target.value === 'undefined') {
            this.setState({ fieldError: event.target.name + ' field is required' });
        } else {
            this.setState({ fieldError: '', [event.target.name]: event.target.value });
        }
    }
    handleCommonTextChange(event) {
        event.preventDefault();
        let errorname=event.target.name+'error';
        console.log('errorname',errorname);
        if (event.target.value === '' || event.target.value === 'undefined') {
            this.setState({ errorname: event.target.name + ' field is required' });
        } else {
            this.setState({ errorname: '', [event.target.name]: event.target.value });
        }
    }
    handleFileUpload(event) {
        event.preventDefault();
        // if (event.target.files) {
        let fileArray = []
        //     const fileArray = URL.createObjectURL(event.target.files[0]);

        //     console.log(fileArray);
        //     this.setState((state)=>{files:state.files.concat(fileArray)});
        //     // this.setState({ imagefile:URL.createObjectURL(event.target.files[0]),files: files });
        // }
        let imageFile = URL.createObjectURL(event.target.files[0]);
        fileArray.push(imageFile)
        this.setState({ files: [...this.state.files, imageFile]});
        this.setState({ imgFiles: [...this.state.imgFiles, event.target.files[0]]})
        // let reader = new FileReader();
        // reader.onloadend = () => {imageFile['imagePreviewURL']=reader.result}
        // if (this.state.files.length < 1) {
        //     this.setState({ files: [URL.createObjectURL(imageFile)] });
        // } else {
        //     this.state.files.concat(URL.createObjectURL(imageFile));
        // }


        console.log('image List', this.state.files);
    }
    handleCloseModal() {
        this.setState({ showModal: false });
        this.clearFields();
    }
    clearFields(){
        this.setState({
            files:[],imgFiles:[],firstname:'',lastname:'',description:'',email:''
        })
    }

    saveData(event) {
        event.preventDefault();
        this.setState({ showSpinner: true });
        console.log("save");
        setTimeout(() => {
            this.servicehandler(event);
        }, 3000);

    }
    servicehandler(event){
        const apiBaseUrl='http://localhost:3000/savedata';
        let payload={
            'firstname':this.state.firstname,
            'lastname':this.state.lastname,
            'description':this.state.description,
            'email':this.state.email,
        }
        const formData = new FormData()
        formData.append('data',JSON.stringify(payload));
        console.log(this.state.imgFiles);
        this.state.imgFiles.map((file)=>{ return formData.append(file.filename, file)});
        console.log("FORMDATA:::"+formData);
        axios.post(apiBaseUrl, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response =>{
            this.setState({  showSpinner: false, showModal: true });
            console.log('RESPONSE',response);
        })
        .catch(function (error) {
            this.setState({  showSpinner: false });
            console.log('ERROR',error);
        });
    }
    render() {
        let disableSave = !this.state.firstname || !this.state.lastname || !this.state.description || !this.state.email;
        console.log(this.state.files);
        return (<div className='container contact-form'>
            {this.state.showSpinner &&
                <div className='div-loader'><div className='loader'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div></div>
            }
            {this.state.showModal &&
                <div className='modal'>
                    <div className='modal_container'>
                        <div className='modal_close' onClick={this.handleCloseModal}><img style={{ width: '20px' }} src='../../public/Image/close.png' /></div>
                        <div className='modal_title'><img className='img-icon' src='../../public/Image/email.png' />Email Sent </div>
                        <div className='modal_content'><img className='img-icon' src='../../public/Image/party-popper.png' /> Email is successfully sent, please check your inbox for the form details</div>
                        {/* <div className='modal_footer'>footer </div> */}

                    </div>
                </div>
            }
            <Header />

            <form onSubmit={this.saveData}>
                <div className='row mt-3'>
                    <div className="form-group  col-xs-6 col-sm-6">
                        <div className='form'>
                            <input id="firstname" type="text" autocomplete="off" placeholder=" " name="firstname" className={this.state.fieldError ? 'input-txtbox input-error' : 'input-txtbox'} onChange={this.handleTextChange} required />
                            <label htmlFor="firstname" className={this.state.fieldError ? 'label-error label-form':this.state.firstname ?'in-filled-label label-form': 'label-form'}>Firstname</label>
                        </div>
                        <span className={this.state.fieldError ? 'span-hide-disp' : ''} style={{ color: 'red' }}>{this.state.fieldError}</span>
                    </div>
                    <div className="form-group  col-xs-6 col-sm-6">
                        <div className='form'>
                            <input id="lastname" type="text" name="lastname" className="input-txtbox" onChange={this.handleCommonTextChange} />
                            <label htmlFor="lastname" className={this.state.lastname ?'in-filled-label label-form':'label-form'}>Lastname</label>
                        </div>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className="form-group">
                        <div className='form'>
                            <textarea id="description" type="text" name="description" className="input-txtbox" placeholder="" onChange={this.handleCommonTextChange} required />
                            <label className={this.state.description ?'in-filled-label label-form':'label-form'} htmlFor="descrip<tion">Description</label>
                        </div>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className="form-group">
                        <div className='form'>
                            <input type="email" className={this.state.emailFieldError ? 'input-txtbox input-error' : 'input-txtbox'} id="email" name="email" onChange={this.validateEmail} required />
                            <label className={this.state.emailFieldError ? 'label-error label-form':this.state.email ?'in-filled-label label-form':'label-form'} htmlFor="email">Email</label>
                        </div>
                        <span className={this.state.emailFieldError ? 'span-hide-disp' : ''} style={{ color: 'red' }}>{this.state.emailFieldError}</span>
                    </div>
                </div>
                <div className='row'>
                    <div className="img-row">
                        {this.state.files && this.state.files.map((obj,ind) => {
                            return (<div className="img-column" key={ind}><img src={obj} key={ind} className="" alt="Cinque Terre" /></div>);
                        })
                        }
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='save-btn-div'>
                        <div className="upload-btn-wrapper">
                            <button className="btn-file">+ ADD IMAGE</button>
                            <input type="file" name="myfile" onChange={this.handleFileUpload} />
                        </div>
                        <input type="submit" className="btn btn-primary" disabled={disableSave} defaultValue="SAVE" />
                    </div>
                </div>
            </form>
                        
        </div>);
    }
}

export default SimpleForm;