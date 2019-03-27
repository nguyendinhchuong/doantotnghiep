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