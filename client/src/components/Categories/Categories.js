import { useState, useEffect } from 'react';

import * as categoriesService from '../../services/categoryService';
import CategoryCard from '../Categories/CategoryCard/CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        categoriesService.getAllCategories()
            .then(res => {
                setCategories(res);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    return (
        <div className="tt-custom-mobile-indent container">
            <div className="tt-categories-title">
                <div className="tt-title">Categories</div>
            </div>

            <div className="tt-categories-list">
                <div className="row">
                    {
                        categories && categories.map(category => <CategoryCard key={category.id} category={category} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Categories;
