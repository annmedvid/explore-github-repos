import React from 'react'
import _ from 'lodash'
import injectProps from '../../utils/decorators/injectProps'
import transformAmount from '../../utils/transformAmount'

class ContributorsTable extends React.PureComponent {
    @injectProps
    render({contributors}) {
        if (!contributors || !Object.keys(contributors).length) {
            return null
        }

        const contributorList = _.chain(contributors)
            .orderBy(['contributions'], ['desc'])
            .slice(0, 3)
            .map(contributor => {
                const {id, html_url: url, login, contributions} = contributor

                return <tr key={id}>
                    <th className="table-th"><a href={url}>{login}</a></th>
                    <td className="table-data">{transformAmount(contributions)}</td>
                </tr>
            })
            .value()

        return <section className="repo-contributors">
            <table className="table">
                <caption  className="table-title">Contributors <small>(top 5)</small></caption>
                <thead className="table-header">
                    <tr>
                        <th className="table-th">User</th>
                        <th className="table-th th-info">Contributions</th>
                    </tr>
                </thead>
                <tbody>
                    {contributorList}
                </tbody>
            </table>
        </section>
    }
}

export default ContributorsTable
