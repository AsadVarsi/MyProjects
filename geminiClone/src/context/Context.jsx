/* eslint-disable react/prop-types */

import React from "react"; 
import { createContext, useState, } from "react";
import run from "../config/gemini";

// Create context
export const Context = createContext();

const ContextProvider = (props) => {
    // State to hold the response or data to pass through context
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const beautifyResponse = (response) => {
      const newArray = response.split("**");
      
      const responseArray = newArray.map((item, index) => {
        if (index % 2 === 0) {
          // Wrap with bold for even indices
          return <b key={index}>{item}</b>;
        }
        // Plain text for odd indices
        return <React.Fragment key={index}>{item}</React.Fragment>;
      });
    
      // Replace single asterisks (*) with newlines (\n) by mapping strings
      return responseArray.map((item) =>
        typeof item === "string" ? item.split("*").join("\n") : item
      );
    };
    


  


    const onSent = async (prompt) => {
        setResultData(""); // reset result data;
        setLoading(true);
        setShowResult(true);
        const response = await run(input);
        let newarry=response.split("**");
        // console.log(newarry);
        let responseArray=[];
        for(let i=0; i<newarry.length; i++)
            {
                if(i===0 || i%2 !== 1)
                {
                    responseArray.push(newarry[i])
                    
                }
                else
                {
                    responseArray.push('<b>'+newarry[i]+'</b>');
                }
            }

        let response2=responseArray.join(" ").split("*");
        response2=response2.join("<br><br>");


        // console.log(responseArray);
        // const response2=beautifyResponse(response);
        console.log(response2);
        setRecentPrompt(input),
        setResultData(response2);
        setLoading(false);
        // setInput("");
    };


    const contextValue = {

        previousPrompt,
        setPreviousPrompt,
        onSent,  
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        recentPrompt,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;


// /* eslint-disable react/prop-types */
// import { createContext, useState } from "react";
// import run from "../config/gemini";

// // Create context
// export const Context = createContext();

// const ContextProvider = ({ children }) => {
//   // State to hold the response or data to pass through context
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [previousPrompt, setPreviousPrompt] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const onSent = async (prompt) => {
//     try {
//       setResultData(""); // Reset result data
//       setLoading(true);
//       setShowResult(true);

//       if (!input.trim()) {
//         throw new Error("Input cannot be empty");
//       }

//       const response = await run(input);
//       console.log(response);

//       setResultData(response);
//       setLoading(false);
//       setInput("");
//     } catch (error) {
//       console.error("Error during API call:", error.message);
//       setLoading(false);
//       setResultData("An error occurred. Please try again.");
//     }
//   };

//   const contextValue = {
//     previousPrompt,
//     setPreviousPrompt,
//     onSent,
//     setRecentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//   };

//   return <Context.Provider value={contextValue}>{children}</Context.Provider>;
// };

// export default ContextProvider;
