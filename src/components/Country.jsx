import "../index.css";
import { useEffect,useState } from "react";
import CountryData from "./CountryData";


function Country(){
    let region = [];
    const [apiData, setApiData]= useState([]);
    const [userInput, setUserInput] = useState("");
    const [active, setActive] = useState(false);
    const [filterRegion, setFilteredRegion] = useState("Filter By Region");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(()=>{
        fetch(`https://restcountries.com/v3.1/all`)
        .then(data =>data.json())
        .then((data)=>{setApiData(data);setIsLoading(true)})
        .catch((error)=>{
          console.error(error)
        })
        
    },[]);

    let filteredApiData = apiData.filter((country)=>{
        const name = country.name.common.toLowerCase();
        return (name.includes(userInput) && (filterRegion === country.region || filterRegion === "Filter By Region") )
    }) 

    region = apiData.reduce((regionName, country)=>{
              if(!regionName.includes(country.region)){
                  regionName.push(country.region)
              }
              return regionName;
         },[]).sort()
       
         

            
    return(
        <>
        <div className="filter-container container">
            <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search for a country..." onChange={(e)=>setUserInput(e.target.value.toLocaleLowerCase())}/>
            </div>
            <div className="filter">
              <div className="filter-btn" onClick={()=>setActive(!active)}>
                <span className="filter-btn-text">{filterRegion?filterRegion:"Filter By Region.."}</span>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              <div className={active?"filter-option active": "filter-option"}>
                <ul onClick={(e)=>{setFilteredRegion(e.target.textContent), setActive(!active)}}>
                  <li>Filter By Region</li>
                  {
                    region.map((regionName, index)=>{
                      return <li key={index}>{regionName}</li>
                    })
                  }
                </ul>
              </div>
            </div>
        </div>
        <div className="country-container container">
          {
            isLoading === true? <CountryData filteredApiData={filteredApiData}/> : "Loading ..."
          }
        </div>

        </>
    )

}

export default Country;