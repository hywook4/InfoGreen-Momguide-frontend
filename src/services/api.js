import { create } from 'apisauce';
import config from '../config';
const api = create({baseURL:config.REST_SERVER});
const calls={};

const endpoints={
    login:{point:'/api/auth/login',method:'post'},
    register:{point:'/api/auth/register',method:'post'},
}

/**
 * Add any header field to the call using this function
 * @param {...headerFields} object
 */
calls.preparePostHeaders=(headers)=>{   
    const content = {...headers};
    return {headers:content};
}

const returnAPICall=(method,endPt)=>{
   return async (payload)=>{
        let resp = await api[method](endPt,payload);
        return resp;
    }
}

// dynamically generate api call names from the api declarations in the endpoints variable.
var points = Object.keys(endpoints);
for(let i=0;i<points.length;i++){
    var key = points[i];
    let ep = endpoints[key];
    calls[key]=returnAPICall(ep.method,endpoints[key].point);
}


export default calls;