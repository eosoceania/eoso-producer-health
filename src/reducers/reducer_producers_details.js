import {FETCH_BP_JSON, FETCH_BP_NODE_INFO} from '../actions/index';


export default function(state = {}, action){
    let newState = {...state}
    
    switch(action.type) {
        case FETCH_BP_NODE_INFO: {
            console.log('fetch bp info', action.payload);
            if(action.payload.request.data){
                let nodeData = action.payload.request.data;
                let {producerName, nodeIdx} = action.payload;
                console.log("adding to ", producerName, newState[producerName]);
                newState[producerName].nodes[nodeIdx].head_block_num = nodeData.head_block_num;
                console.log("reducer fetch chain info ",newState);
            }
            break;
        }
        case FETCH_BP_JSON: {
            if(action.payload.data){
                let bpDetail = action.payload.data; //JSON.parse(action.payload.data);
                let bpNodeUrls = getEndpointForNodes(bpDetail.nodes);
            
                let detail = { name: bpDetail.producer_account_name, link: bpDetail.website, nodes: []};
                for(let i = 0; bpNodeUrls.length > i; i++ ){
                    detail.nodes.push(bpNodeUrls[i]);
                }
                newState[detail.name] = detail;
                console.log("reducer fetch bp ",newState);
            }
            break;
        }
        
        default:    //do nothing
    }
    //console.log("new state", newState);
    return newState;
}



function getEndpointForNodes(nodes){
    return nodes.map(function(node){
        return {
            name: node.location.name, 
            url: (node.ssl_endpoint?node.ssl_endpoint:node.api_endpoint),
            api: (node.p2p_endpoint)
        };
    })
}
