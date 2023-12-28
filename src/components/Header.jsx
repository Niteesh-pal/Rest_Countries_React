import { useState } from "react";
import "../index.css";

function Header(){
    const [isDark , setIsDark] = useState(false);
    console.log(isDark);
            return(
               <div className="header">
                <div className="container header-content">
                    <div className="logo">
                        <h1>Where in the World</h1>
                    </div>
                    <div className="dark-mode" onClick={()=>setIsDark(!isDark)}>
                    <i className="fa-regular fa-moon"></i>
                    <span className="dark">Dark</span>
                    </div>
                </div>
               </div>
            )
}

export default Header;