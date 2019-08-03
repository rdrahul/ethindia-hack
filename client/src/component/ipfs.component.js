import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import ipfs from '../utils/ipfs';
import '../css/ipfs.css'
import FileUploadProgress  from 'react-fileupload-progress';

class IpfsComponent extends Component {
    
    constructor( props ){
        super(props);
        this.state = {
            ipfsHash: null,
            buffer: '',
            transactionHash: '',
            gasUsed: '',
            txReceipt: '',
            contract : props.contract,
            web3 : null,
            storedValue : 0
        };
        this.currentMessage = null;
        this.isLoading= false;
        console.log( "contract " ,  this.state.contract  )
    }

    componentDidMount( ){
        
        getWeb3().then( (web3) => {
            console.log(web3);
            this.setState({ web3 : web3  })
        }).catch( (err) => {
            console.log(err);
        }); 
    }

    componentWillUpdate(nextProps , nextState){
    
        console.log("Updating Component" , nextProps);
        if ( nextProps.contract !== this.state.contract){
    
          console.log("Updating the props" , nextProps );
          this.setState( { contract : nextProps.contract  } )
    
        }
        if ( nextProps.storedValue !== this.state.storedValue){
    
            console.log("Updating the props" , nextProps );
            this.setState( {storedValue: nextProps.storedValue } )
      
          }
        return true;
      }


    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        
        
        reader.onloadend = () => this.convertToBuffer(reader)
    };

    convertToBuffer = async (reader) => {

        //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
        
        //set this buffer -using es6 syntax
        this.setState({ buffer });
    };

    onSubmit = async (event) => {
        let contractInstance = this.state.contract;
        event.preventDefault();

        const accounts = await this.state.web3.eth.getAccounts();
        console.log('Sending from Metamask account: ', accounts[0]);
        
        const ethAddress = await contractInstance.options.address;
        this.setState({ ethAddress });
        
        //add to ipfs
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            this.isLoading = true
            console.log(err, ipfsHash);
            this.setState({ ipfsHash: ipfsHash[0].hash });

            this.currentMessage = "Successfully uploaded to ipfs";

            contractInstance.methods.set(this.state.ipfsHash).send({
                from: accounts[0]
            }, (error, transactionHash) => {
                this.isLoading = false;
                this.currentMessage = "Your Paper is Published Now :) ";
                console.log("transaction hash is ", transactionHash);
                this.setState({ transactionHash });
            });
        })
    };

    Download = ( ) => {
        console.log(this.state);
        let url = '/ipfs/' + this.state.storedValue;
        console.log(url);
        
    }


    render() {
        return (
            <div className="container" >
                <div className="ipfs-container" >

                    <h3> Upload your Paper and You are all Set!! </h3>
                    <form onSubmit={this.onSubmit}>
                        <input className  type="file" onChange={this.captureFile} />
                        <button className="btn"  type="submit"> Publish </button>
                    </form>
                    
                    { this.isLoading ? '<div class="loader">Loading...</div>' : ''  }
                    { this.currentMessage ? '<div class="loader">{this.currentMessage}</div>' : ''  }
                    
                </div>
            </div>
        );
    }
}
export default IpfsComponent;