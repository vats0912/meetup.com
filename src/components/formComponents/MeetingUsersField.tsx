import { EuiComboBox, EuiFormRow } from '@elastic/eui'
import React from 'react'


function MeetingUsersField({label,onChange,options,selectedOptions,isClearable,singleSelection,placeholder,isInvalid,error}:{
    label:string,
    onChange:any,
    selectedOptions:any,
    isClearable:boolean,
    singleSelection:any,
    options:any,
    placeholder:string,
    isInvalid:boolean,
    error:Array<string>
}) {
  return (
    <EuiFormRow label={label} error={error}>
        <EuiComboBox placeholder={placeholder} onChange={onChange} isClearable={isClearable} options={options}singleSelection={singleSelection} selectedOptions={selectedOptions} isInvalid={isInvalid}/>
    </EuiFormRow>
  )
}



export default MeetingUsersField
