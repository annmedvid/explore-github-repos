import React from 'react'
import injectProps from '../../utils/decorators/injectProps'

import Icon from './Icon'

class Button extends React.PureComponent {
    @injectProps
    render({type = null, text, addClass = null, onClick, ...restProps}) {
    	const icon = type ? <Icon type={type} className={`icon-${addClass}`}/> : null

        return <div className={`btn-cover btn-cover-${addClass}`}>
        	{icon}
        	<button className={`btn btn-${addClass}`} onClick={e => onClick(e)} {...restProps}>{text}</button>
        </div>
    }
}

export default Button
