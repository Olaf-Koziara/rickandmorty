import {useState} from 'react';
import './Pagination.scss'

const Pagination = ({totalItems, initialPage = 1, initialPageSize = 5, onPageChange}: {
    totalItems: number,
    initialPage?: number,
    initialPageSize?: number,
    onPageChange?: (...args: any) => any
}) => {
    const [activePage, setActivePage] = useState(initialPage);
    const [pageSize, _setPageSize] = useState(initialPageSize);
    const handlePageChange = (page: number) => {
        setActivePage(page);
        if (onPageChange) {
            onPageChange(page);
        }
    }
    const paginationLimiter = (index: number) => (index + 1 > activePage - 5 && index < activePage + 4) || (activePage < 5 && index + 1 <= 9)
    return (
        <ul className='pagination'>
            {
                [...Array(Math.round(totalItems / pageSize))].map((_item, index) =>
                    paginationLimiter(index) &&
                    (<li className={`pagination__item ${index + 1 === activePage ? 'pagination__item--active' : ''}`}
                         key={index}>
                        <button onClick={() => handlePageChange(index + 1)}> {index + 1}</button>
                    </li>)
                )
            }

        </ul>
    );
};

export default Pagination;