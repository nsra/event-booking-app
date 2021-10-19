import React from "react" 
import Loader from "react-loader-spinner" 

export default class Spinner extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <Loader
                    type="Puff"
                    color="#cc6600"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </div>
        ) 
    }
}