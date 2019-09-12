import React from 'react'
import Input from '../../components/atoms/Form/Input'
import Filters from './Filters'
import styles from './Sidebar.module.scss'

export default function Sidebar({
    search,
    inputChange,
    category,
    license,
    results,
    filterByCategory,
    filterByLicense
}: {
    search: string
    inputChange: any
    category: string
    license: string
    results: any[]
    filterByCategory(category: string): void
    filterByLicense(license: string): void
}) {
    return (
        <aside className={styles.sidebar}>
            <Input
                type="search"
                name="search"
                label="Search"
                placeholder="e.g. shapes of plants"
                value={search}
                onChange={inputChange}
                // group={
                //     <Button primary onClick={search}>
                //         Search
                //     </Button>
                // }
            />

            <Filters
                category={category}
                license={license}
                results={results}
                filterByCategory={filterByCategory}
                filterByLicense={filterByLicense}
            />
        </aside>
    )
}