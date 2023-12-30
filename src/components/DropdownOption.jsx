/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

function DropdownOption({value,state,setValue}){
    
    return (
        <ul onClick={(e)=>setValue(e.target.textContent)} className="item-container">
            <li><p>{state}</p></li>
        {
            Object.keys(value).map((item,index)=>(
                <li key={index}>
                    <p>{item}</p>
                    <ul>
                        {
                            item.length>0?
                        value[item].map((list)=>(
                            list?
                            <li><p>{list}</p></li>:<></>
                        )
                        )
                        :<></>
                    }
                    </ul>
                </li>
            )
            )
        }
        </ul>
    )
    
}

export default DropdownOption;