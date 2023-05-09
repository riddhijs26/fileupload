import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faFolder, faSync , faCheck } from '@fortawesome/free-solid-svg-icons'
import './Custodian.scss'
import { CustodianContext } from '../CustodianContext'

const CustodianItem = () => {
    const [custodian, setCustodians] = useContext(CustodianContext);

    return (
        <div className=''>
        
           {Object.keys(custodian).length !== 0 && ( <li
                className="Custodian-card"
                key={custodian.Name}>
                
                <p><FontAwesomeIcon icon={faFolder} /> {custodian.Name}</p>
                <p> contains {custodian.NumberofFile} Files</p>
                
                <div className="actions">
                    <div className="loading">
                    {custodian.isloading && <FontAwesomeIcon
                        icon={faSync} className="fa-spin"
                        />
                    }
                    {!custodian.isloading &&
                        <FontAwesomeIcon icon={faCheck}/>
                    }
                    </div>
                    
                </div>
                
                
            </li>)}
        </div>
    )
}

export default CustodianItem;

