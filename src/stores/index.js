import { EventEmitter } from 'events';
import Api from '../services/api';

class CoreData extends EventEmitter {
    triggerError=(title,message)=>this.emit('ERROR',{title,message});
    triggerResponse=(funcName,data)=>this.emit(funcName,{...data});

    data={}
    saveUserData = (userData)=>{this.data.user = userData}
    getUserData=(key)=>{return this.data.user[key]}

    requestLogin=async (d)=>{
            var payload = {
                email:d.email,
                password:d.password, 
                remember:false
            };
            var errorMessage = {
                title:'Login Failed',
                message:'Please check your Username & Password, before proceeding ahead'
            }

            var response = await Api.login(payload);
            this.processResponse('LOGIN',response,errorMessage);
    }


    processResponse=(evntName,response,error)=>
            response.ok?this.triggerResponse(evntName,response.data):this.triggerError(error.title,error.message)



}

const coreData = new CoreData();
window.cd = coreData;
export default coreData;