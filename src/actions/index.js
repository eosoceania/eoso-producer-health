//import request from 'request';
import axios from "axios";

const BP_JSON_PATH = '/bp.json';
const INFO_PATH = '/v1/chain/get_info';


export const FETCH_BP_JSON = 'FETCH_BP_JSON';
export const FETCH_BP_NODE_INFO = 'FETCH_BP_NODE_INFO';

export function fetchBpJson(producer){
    let bpjsonUrl = producer.url+BP_JSON_PATH; 
    console.log("Calling " + bpjsonUrl);
    const request = axios({
        method: 'get',
        url: bpjsonUrl,
        crossdomain: true
    });
  
    return {
        type: FETCH_BP_JSON,
        payload: request
    };
}

export function fectchBpNodeInfo(producerName, nodeIdx=0, node){
    if(producerName && node.url){
        let chainUrl = node.url + INFO_PATH;
        console.log('chain url', chainUrl);
        const request = axios({
            method: 'get',
            url: chainUrl,
            crossdomain: true
        });

        return {
            type: FETCH_BP_NODE_INFO,
            // producerName: producerName,
            // nodeIdx,
            payload: Promise.all([request, producerName, nodeIdx]).then(
                ([request, producerName, nodeIdx]) => {
                return { request, producerName, nodeIdx }
             })
        };
    }
    return {
        type: 'DO_NOTHING'
    };
    //do nothing
}




// function getChainDetails(nodeDetail){
//     let chainDetail = { head_block_num: -1 };
//     if(nodeDetail.url){
//         let chainUrl = nodeDetail.url + INFO_PATH;
//         console.log('chain url', chainUrl);
//         chainDetail = request(chainUrl, function(error, response, body){
//             if(response && response.statusCode === 200){
//                 return JSON.parse(body);
//                 console.log(chainDetail.head_block_num);
//             } else {
//                 console.log('error connecting to ', chainUrl);//, error); // Print the error if one occurred
//                 //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received    
//                 return { head_block_num: -1 };
//             }
//         });
//     }
//     return chainDetail.head_block_num
// }




  // request(bpjsonUrl, function(error, response, body){
    //     if(response && response.statusCode === 200){

    //         let bpDetail = JSON.parse(body);
    //         bpNodeUrls = getEndpointForNodes(bpDetail.nodes);
    //         let chainDetails = bpNodeUrls.map(getChainDetails2);
    //         console.log(bpNodeUrls);
    //         console.log("chainDetails", chainDetails);

    //         producerNodeDetails.push({ name: producer.owner, link: producer.url, bpjsonUrl, node1: bpNodeUrls[0], node2: bpNodeUrls[1]});

    //     } else {
    //         console.log('error:', error); // Print the error if one occurred
    //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received    
    //     }
    // });