import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

function Main() {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

    const handleSend = () => {
        if (input.trim() !== "") { 
            onSent();  
            setInput("");  
        }
    };

    // Function to handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();  
            handleSend();
        }
    };
    
    console.log(recentPrompt+"hellp");
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.gemini_icon} alt="" />
        </div>
        {!showResult?
        <>
        <div className="main-container">
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How con I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>

                <div className="card">
                    <p>Briefly summrize this concept:urban Planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>

                <div className="card">
                    <p>Brainstrome team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>

                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
        </div>
        </>:
        <div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading?
                <>
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
                </>:
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
            </div>

        </div>  
        }     
        <div className="main-bottom">
            <div className="search-box">
                <input  
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={handleKeyDown} 
                    placeholder='Ask Gemini' 
                />
                <div class="cursor">
                    <img src={assets.mic_icon} alt="" />
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.send_icon} onClick={handleSend} alt="" />
                </div>
            </div>
            <p className='bottom-info'>
                Gemini may display wrong content use it gracefully 
            </p>
        </div>

    </div>
  )
}

export default Main
