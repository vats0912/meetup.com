import { NavigateFunction } from "react-router-dom";
import { breadCrumbTypes } from "./Types";

export const getCreateMeetingBreadCrumbs=(navigate:NavigateFunction):Array<breadCrumbTypes>=>[
    {
        text:"Dashboard",
        href:'#',
        onClick:()=>{
            navigate('/')
        },
    },
    {
        text:'Create Meeting',
       
    },

]

export const getOneOnOneMeetingBreadCrumbs=(navigate:NavigateFunction):Array<breadCrumbTypes>=>[
    {
        text:"Dashboard",
        href:'#',
        onClick:()=>{
            navigate('/')
        },
    },
    {
        text:'Create Meeting',
        href:'#',
        onClick:()=>{
        navigate('/create')
        }
    },

    {
        text:'Create one on one meeting',
        
    }
]


export const getVideoConferenceBreadCrumbs=(navigate:NavigateFunction):Array<breadCrumbTypes>=>[
    {
        text:"Dashboard",
        href:'#',
        onClick:()=>{
            navigate('/')
        },
    },
    {
        text:'Create Meeting',
        href:'#',
        onClick:()=>{
        navigate('/create')
        }
    },

    {
        text:'Create Video Conference',
        
    }
]

export const getMyMeetingsBreadCrumbs=(navigate:NavigateFunction):Array<breadCrumbTypes>=>[
    {
        text:"Dashboard",
        href:'#',
        onClick:()=>{
            navigate('/')
        },
    },
    

    {
        text:'My Meetings',
        
    }
]

export const getMeetingsBreadCrumbs=(navigate:NavigateFunction):Array<breadCrumbTypes>=>[
    {
        text:"Dashboard",
        href:'#',
        onClick:()=>{
            navigate('/')
        },
    },
    

    {
        text:'Meetings',
        
    }
]






export default getCreateMeetingBreadCrumbs