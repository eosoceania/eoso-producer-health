import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchBpJson, fectchBpNodeInfo } from "../actions/index";


class ProducerList extends Component {

    constructor(props) {
        super(props);
        this.getProducerDetails = this.getProducerDetails.bind(this);
    }

    getProducerDetails(producer){
        let producerDetails = this.props.producersDetails[producer.owner];
        if(producerDetails){
            console.log(producerDetails);
            for(let i=0; producerDetails.nodes.length > i; i++){
                if(producerDetails.nodes[i].url){
                    console.log("looks up ", i, producerDetails.nodes.length);
                    this.props.fectchBpNodeInfo(producerDetails.name, i, producerDetails.nodes[i]);
                }
            }
        }
    }

    showNodeDetails(nodeDetail){
        return (
            <tr>
                <td>{nodeDetail.name}</td>
                <td>{nodeDetail.url}</td>
                <td>{nodeDetail.api}</td>
                <td>{nodeDetail.head_block_num}</td>
            </tr>
        );
    }
    showProducerNodes(producerDetails){
        if(producerDetails){
            return (
                <table border="1"><tbody>
                    {producerDetails.nodes.map(this.showNodeDetails)}
                </tbody></table>
            );
        }
    }

    renderList(){
        return this.props.producers.map((producer) => {
            let hasProducerDetail = this.props.producersDetails[producer.owner]?true:false;
            return (
                <tr key={producer.owner} className="list-group-item">
                    <td><input type="button" value={producer.owner} onClick={() => { this.props.fetchBpJson(producer)}} /></td>
                    <td><input type="button" value={(hasProducerDetail?"Yes":"No")} 
                        onClick={()=>{this.getProducerDetails(producer)}}
                        disabled={!hasProducerDetail} /></td>
                    <td>{this.showProducerNodes(this.props.producersDetails[producer.owner])}</td>
                </tr>
            )
        });
    }

    render(){
        return (
            <div>
                {this.props.appName}
                <table>
                    <thead><tr>
                        <th>Name</th>
                        <th>Get Chain</th>
                        <th>Node Info</th>
                    </tr></thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
            </div>
        );
    }

}


function mapStateToProps(state){
    return { 
        producers: state.producers,
        producersDetails: state.producersDetails, 
        appName: "EOS" 
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBpJson, fectchBpNodeInfo }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProducerList);