import './TableHead.scss'

const TableHead = () => {
    const HEADER_PREVIEWS = ['№', 'Тип', 'Дата установки', 'Автоматический', 'Текущие показания', 'Адрес', 'Примечание']

    return (
        <>
            <thead className="table__head">
                <tr className="table__row">
                    {
                        HEADER_PREVIEWS.map((item, index) => {
                            return <th key={index} className="table__header">{item}</th>
                        })
                    }
                    <th className="table__header table__header--actions" />
                </tr>
            </thead>
        </>
    )
}

export { TableHead }