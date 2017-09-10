import React from 'react'

class Loader extends React.PureComponent {
    render() {
		return <div className="loader">
			<div className="loader-item"></div>
  			<div className="loader-item"></div>
 	 		<div className="loader-item"></div>
  			<div className="loader-item"></div>
  			<div className="loader-item"></div>
  			<div className="loader-item"></div>
  			<div className="loader-item"></div>
        </div>
    }
}

export default Loader
