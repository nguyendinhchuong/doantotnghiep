import React from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column';

export const headerTemplate = (data) => {
    return data.brand;
}

export const addNodeTable = (data, value) =>{
    const node = {
        key:'7.1.1',
        data:{
            displayName:
            <DataTable value={cars} 
                groupField="vin"
                rowGroupMode="subheader"
                rowGroupHeaderTemplate={headerTemplate} >
                <Column field="year" header="Year" />
            </DataTable>
        },
        children:[]
    };
    data[0].children.push(node);
    return data;
};

let cars = [
    {vin:'ABC',year:2017},
    {vin:'ABC',year:2018},
    {vin:'ABC',year:2019},
    {vin:'DEF',year:2017}
]