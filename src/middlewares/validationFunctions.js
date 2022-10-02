function findArr(array,target,property){
    return (array.find((el)=>{return (el[property]===target)}));
}

export { findArr };