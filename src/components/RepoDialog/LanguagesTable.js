import React from 'react'
import _ from 'lodash'
import injectProps from '../../utils/decorators/injectProps'
import transformAmount from '../../utils/transformAmount'

class LanguagesTable extends React.PureComponent {
    @injectProps
    render({languages}) {
        if (!Object.keys(languages).length) {
            return null
        }

        let languagesList = []

        _.chain(languages)
        .pickBy(kb => kb > 1000)
        .forIn((kb, language) => languagesList.push(<tr key={kb}>
                <th className="table-th">{language}</th>
                <td className="table-data data-lang">{transformAmount(kb)}</td>
            </tr>))
        .value()

        return <section className="repo-languages">
            <table  className="table table-lang">
                <caption  className="table-title">Languages <small>(over 1Kb)</small></caption>
                <thead className="table-header scroll-thead">
                    <tr>
                        <th className="table-th">Language</th>
                        <th className="table-th th-info">Kb</th>
                    </tr>
                </thead>
                <tbody className="scroll-tbody table-body">
                    {languagesList}
                </tbody>
            </table>
        </section>
    }
}

export default LanguagesTable
