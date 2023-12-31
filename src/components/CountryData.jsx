import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function CountryData({filteredApiData}){
    const navigate = useNavigate();
    // ()=>navigate(`/country/${item.cca3}`)

        return(
            filteredApiData.length > 0 ?
            filteredApiData.map((item,index)=>{
                
                return <div className="cards-country"  key={index} onClick={()=>navigate(`/country/${item.cca3.toLowerCase()}`)}>    
                        <div className="country-image">
                            <img src={item.flags.png} alt="" />
                        </div>
                        <div className="country-content">
                            <ul>
                            <li><h1>{item.name.common}</h1></li>
                            <li><span>Poplation: </span>{item.population.toLocaleString()}</li>
                            <li>
                            <span>Region: </span>{item.region}
                        </li>
                            <li>
                        <span>Capital: </span>{item.capital}
                        </li>
                        </ul>
                    </div>
                    
            </div>
            })
            :(
                <div className="countryError">
                    <h2>Country does not found!!</h2>
                </div>
            )
            
        )


}

export default CountryData;