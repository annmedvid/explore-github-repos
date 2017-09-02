import React from 'react'
import onClickOutside from 'react-onclickoutside'
import injectProps from '../../utils/decorators/injectProps'

import ContributorsTable from './ContributorsTable'
import LanguagesTable from './LanguagesTable'
import PRsTable from './PRsTable'

@onClickOutside
class RepoDialog extends React.PureComponent {
    constructor(props) {
        super(props)

        this.handleClickOutside = ::this.handleClickOutside
    }

    handleClickOutside() {
        this.props.closeRepoDialog()
    }

    @injectProps
    render({repo}) {
        let forked = null
        if (repo.forked_from) {
            const {login, html_url} = repo.forked_from.owner

            forked = <p className="forked">Forked from <a href={html_url}>{login}</a></p>
        }

        return <article className="repo-dialog">
            <header className="repo-main">
                <h2 className="repo-title"><a href={repo.url}>{repo.name}</a></h2>
                {forked}
            </header>
            <ContributorsTable contributors={repo.contributors} />
            <LanguagesTable languages={repo.languages} />
            <PRsTable prs={repo.pulls}/>
        </article>
    }
}

export default RepoDialog
