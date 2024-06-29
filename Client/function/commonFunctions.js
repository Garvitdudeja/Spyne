const hanldeWholeNumbers = (x) =>{
    return Number(x ?? 0)
}


function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }


const nullString = (str)=>{
    return (str ?? " ");
}

export {hanldeWholeNumbers,capitalizeFirstLetter,nullString}