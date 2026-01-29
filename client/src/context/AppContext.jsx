import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({children})=>{
    
    const navigate = useNavigate();
    const[user, setUser] = useState(null);
    const [chats,setChats] = useState([]);
    const [selectedChats, setSelectedChats] = useState(null);

    const fetchUser = async()=>{
        setUser(dummyUserData)
    }

    const fetchUserChats = async()=>{
        setChats(dummyChats);
        setSelectedChats(dummyChats[0]);
    }
    useEffect(()=>{
        if(user){
            fetchUserChats();
        }else{
            setChats([]);
            setSelectedChats(null);
        }
        
    },[user]);
    
    useEffect(()=>{
        fetchUser();
    },[]);

    const value = {
        fetchUser,navigate,user,setUser,chats,setChats,selectedChats,setSelectedChats
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
    
}
export const useAppContext = ()=> useContext(AppContext)