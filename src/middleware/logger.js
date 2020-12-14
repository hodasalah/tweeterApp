const logger =(store)=>(next)=>(action)=>{
    console.group(action.type)
        console.log("action is : ", action)
        const result = next(action)
        console.log('our new state is : ', store.getState())
        
    console.groupEnd()
    return result;
}
export default logger;