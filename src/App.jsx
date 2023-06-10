import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import "./App.css";

const App = () => {
    const inputText = useRef("");
    const [allText, setAllText] = useState([]);

    useEffect(() => {
        async function getTexts(){
            try{
                const allTexts = await axios({
                    method: "GET",
                    baseURL: import.meta.env.VITE_BACKEND_URL,
                    url: "/"
                })
    
                console.log(allTexts.data);
                allTexts.data.map(text => setAllText(oldArr => [...oldArr, text.body]));
            }
            catch(err){
                console.log(err);
            }
        }

        getTexts();
    }, []);

    async function handleClick(){
        console.log("clicked");

        setAllText(oldArr => [...oldArr, inputText.current.value]);

        try{
            const backendMsg = await axios({
                method: "POST",
                baseURL: import.meta.env.VITE_BACKEND_URL,
                url: "/",
                data: {inputText: inputText.current.value}
            });

            console.log(backendMsg);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <main className="main">
            <input type="text" ref={inputText} />
            <button onClick={handleClick} >Click to test the backend</button>

            
            <div className="textBx">
                {allText.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </main>
    )
}

export default App