import React from 'react'
import { Pagination} from 'semantic-ui-react'
import './Pagination.css';

export const Paginate = () => 
    <div className="pagination-card">
        <Pagination defaultActivePage={1} totalPages={5} />
    </div>


// export default Paginate;