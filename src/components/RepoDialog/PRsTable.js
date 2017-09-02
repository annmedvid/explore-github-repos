import React from 'react'
import _ from 'lodash'
import injectProps from '../../utils/decorators/injectProps'
import getDate from '../../utils/getDate'

class PRsTable extends React.PureComponent {
    @injectProps
    render({prs}) {
        if (!prs || !Object.keys(prs).length) {
            return null
        }

        const prsList = _.chain(prs)
            .filter(['state', 'open'])
            .slice(0, 5)
            .map(pr => {
                const {id, title, html_url: url, created_at: created} = pr

                return <tr key={id}>
                    <th className="table-th"><a href={url}>{title}</a></th>
                    <td className="table-data data-data">{`on ${getDate(created)}`}</td>
                </tr>
            })
            .value()

        return <section className="repo-languages">
            <table className="table">
                <caption className="table-title">PRs <small>(last 5)</small></caption>
                <thead className="table-header">
                    <tr>
                        <th className="table-th">Title</th>
                        <th className="table-th th-info">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {prsList}
                </tbody>
            </table>
        </section>
    }
}

export default PRsTable
