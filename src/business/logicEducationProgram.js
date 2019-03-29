export const addRoot = (data, node) =>{
    return data;
};

export const doubleClickTarget = (targets, item) =>{
    targets[item.id-1].oldValue = targets[item.id-1].value;
    targets[item.id-1].isEdit = true;
    return targets;
};

export const updateTargetList = (targets, item) =>{
    targets[item.id-1].value = targets[item.id-1].oldValue; 
    targets[item.id-1].isEdit = false;
    return targets;
};

export const saveChangeEditTarget = (targets, item) =>{
    targets[item.id-1].isEdit = false;
    return targets;
};

export const onChangeEditTargetCancel = (targets, item)=>{
    targets[item.id-1].oldValue = targets[item.id-1].value; 
    targets[item.id-1].isEdit = false;
    return targets;
}

export const onChangeTextTarget = (targets, item, event) => {
    targets[item.id-1].oldValue = event.target.value;
    return targets;
};

export const getItemOfIndex = (educations,index) =>{
    const key = educations[index].key;
    return educations.reduce((acc,cur)=>{
        if(cur.key.includes(key+'.')){
            return acc.concat(cur);
        }
        return acc;
    },[])
}

export const addNew = (educations,index,value) =>{
    const count = getItemOfIndex(educations,index).length;
    let key = educations[index].key +'.'+(count+1).toString();
    const id = educations.length;
    const item = {id:id+1, key:`${key}`,value:'hahaa',title:''};
    educations.push(item);
    return educations;
}