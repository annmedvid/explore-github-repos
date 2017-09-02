import React from 'react'
import injectProps from '../../utils/decorators/injectProps'

class InputField extends React.PureComponent {
    @injectProps
    render({type, name, className, placeholder, onChange, ...restProps}) {
        return (
            <input 
                type={type}
                name={name}
                className={className}
                placeholder={placeholder}
                onChange={e => onChange(e)}
                {...restProps}/>
        )
    }
}

export default InputField
