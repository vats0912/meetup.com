export interface breadCrumbTypes{
    text:string;
    href?:string;
    onClick?:()=>void;
}

export interface userType{
    uid:string,
    email:string,
    name:string,
    label?:string
}

export type MeetingJoinType="Anyone can join" | 'video-conference' |'1 on 1'

export interface MeetingType{
docId?:string,
createdBy:string,
invitedUsers:Array<string>,
maxUsers:number,
meetingDate:string,
meetingId:string,
meetingName:string,
meetingType:MeetingJoinType,
status:boolean
}

export interface FieldErrorType{
    show:boolean,
    message:Array<string>
   
}

export interface ToastType{
    id:string;
    title:string;
    color:"success"|"primary"|"warning"|"danger"|undefined
}
