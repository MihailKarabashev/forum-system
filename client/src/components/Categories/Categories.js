import { useState, useEffect } from 'react';

import { CategoryCard } from './CategoryCard/CategoryCard';

const Categories = () => {
    return (
        <div className="tt-categories-list">
            <div className="row">
                <CategoryCard />
            </div>
        </div>
    )
}

export default Categories
