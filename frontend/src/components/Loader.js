import React , {useState} from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    return (
        <div style={{marginTop:'120px'}} className="text-center">
            <center><div className="sweet-loading">

                <ScaleLoader color='#000' loading={loading} css='' size={90} />
            </div></center>
        </div>
    )
}
export default Loader;