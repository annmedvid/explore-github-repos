import React from 'react'
import injectProps from '../utils/decorators/injectProps'

import Icon from './common/Icon'

class OwnerInfo extends React.PureComponent {
    @injectProps
    render({info}) {
        if (!info) return null

        const {login, avatar_url: avatar, name, location, email, bio} = info;

    	return <div className="owner-info">
            <img src={avatar} alt="profile avatar" className="owner-avatar"/>
            <div className="owner-main-info">
                <p className="owner-login">{login}</p>
                {name ? <p className="owner-name"><Icon type="avatar" className="icon info"/>{name}</p> : null}
                {email ? <p className="owner-email"><Icon type="email" className="icon info"/>{email}</p> : null}
                {location ? <p className="owner-location"><Icon type="location" className="icon info"/>{location}</p> : null}
                {bio ? <p className="owner-bio">{bio}</p> : null}
            </div>
    	</div>
    }
}

export default OwnerInfo
