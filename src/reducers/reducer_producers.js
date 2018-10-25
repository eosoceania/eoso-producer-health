import producersJson from  '../resources/eos-producers-20181016';
//import {FETCH_BP_JSON} from '../action/index';

console.log('TRACE PERFORMANCE: producer json being resorted');
producersJson.rows.sort(sortByVotes);


export default function(state = [], action){
    return producersJson.rows;
}


function sortByVotes(a,b) {
    if(parseFloat(a.total_votes) < parseFloat(b.total_votes)) return 1;
    if(parseFloat(a.total_votes) > parseFloat(b.total_votes)) return -1;
    return 0;
}
