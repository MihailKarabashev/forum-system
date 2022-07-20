import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";


import * as categoriesService from '../../services/categoryService';
import * as tagsService from '../../services/tagService';
import * as postsService from '../../services/postServices';

import Select from 'react-select';
import makeAnimated from 'react-select/animated'

import './CreatePost.css';

const animatedComponent = makeAnimated();

const CreatePost = () => {
    const navigate = useNavigate();

    const [tagsList, setTagsList] = useState([]);
    const [tags, setTags] = useState();

    const [categoriesList, setCategoriesList] = useState([]);
    const [category, setCategory] = useState();


    useEffect(() => {
        (async () => {
            const [categoriesData, tagsData] = await Promise.all([
                categoriesService.getAllCategories(),
                tagsService.getAllTags()
            ]);

            let categoryOptions = categoriesData.map(x => ({ label: x.name, value: x.id }));
            let tagsOptions = tagsData.map(x => ({ label: x.name, value: x.id }));

            setCategoriesList(categoryOptions);
            setTagsList(tagsOptions);
        })();

    }, []);


    const onFormSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title: values.title,
            description: values.description,
            categoryId: category.value,
            tags: tags.map(x => Number(x.value))
        }

        postsService.createPost(newPost)
            .then(data => {
                navigate(`/posts/details/${data.id}`, { state: { postId: data.id } });
            })
            .catch(err => {
                console.log(err);
            })
    }

    const { values, errors, handleChange, handleSubmit } = useForm(onFormSubmit);


    const handleCategoryClick = (data) => {
        setCategory(data);
    }

    const handleTagsClick = (data) => {
        setTags(data);
        console.log(data);
    }



    return (
        <div className="container">
            <div className="tt-wrapper-inner">
                <h1 className="tt-title-border">
                    Create New Topic
                </h1>
                <form className="form-default form-create-topic" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputTopicTitle">Topic Title</label>
                        <div className="tt-value-wrapper">
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                id="inputTopicTitle"
                                placeholder="Subject of your topic"
                                required
                                value={values.title}
                                onChange={handleChange}
                            />
                            <span className="tt-value-input">99</span>
                        </div>
                        <p style={{ color: 'red' }}>{errors.title}</p>

                    </div>
                    <div className="pt-editor">
                        <h6 className="pt-title">Topic Body</h6>
                        <div className="form-group">
                            <textarea
                                name="description"
                                className="form-control"
                                rows="5"
                                placeholder="Lets get started"
                                required
                                value={values.description}
                                onChange={handleChange}
                            >
                            </textarea>
                        </div>
                        <p style={{ color: 'red' }}>{errors.description}</p>


                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="inputTopicTitle">Category</label>
                                    <Select
                                        options={categoriesList}
                                        onChange={handleCategoryClick}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="inputTopicTags">Tags</label>
                                    <Select
                                        options={tagsList}
                                        onChange={handleTagsClick}
                                        components={animatedComponent}
                                        isMulti
                                        isSearchable
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto ml-md-auto">
                                <button type="submit" className="btn btn-secondary btn-width-lg">Create Post</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;

