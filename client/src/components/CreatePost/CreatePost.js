import { useState, useEffect } from "react";


import * as categoriesService from '../../services/categoryService';
import * as tagsService from '../../services/tagService';
import * as postsService from '../../services/postServices';

import Select from 'react-select';
import makeAnimated from 'react-select/animated'

const animatedComponent = makeAnimated();

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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

    const handleCategoryClick = (data) => {
        setCategory(data);
    }

    const handleTagsClick = (data) => {
        setTags(data);
        console.log(data);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="container">
            <div className="tt-wrapper-inner">
                <h1 className="tt-title-border">
                    Create New Topic
                </h1>
                <form className="form-default form-create-topic" method="POST" onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputTopicTitle">Topic Title</label>
                        <div className="tt-value-wrapper">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="inputTopicTitle"
                                placeholder="Subject of your topic"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <span className="tt-value-input">99</span>
                        </div>
                        <div className="tt-note">Describe your topic well, while keeping the subject as short as possible.</div>
                    </div>
                    <div className="pt-editor">
                        <h6 className="pt-title">Topic Body</h6>
                        <div className="form-group">
                            <textarea
                                name="message"
                                className="form-control"
                                rows="5"
                                placeholder="Lets get started"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="inputTopicTitle">Category</label>
                                    <Select
                                        options={categoriesList}
                                        onChange={handleCategoryClick}
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




            <div className="tt-topic-list tt-offset-top-30">
                <div className="tt-list-search">
                    <div className="tt-title">Suggested Topics</div>

                    <div className="tt-search">
                        <form className="search-wrapper">
                            <div className="search-form">
                                <input type="text" className="tt-search__input" placeholder="Search for topics" />
                                <button className="tt-search__btn" type="submit">
                                    <svg className="tt-icon">
                                        <use xlinkHref="#icon-search"></use>
                                    </svg>
                                </button>
                                <button className="tt-search__close">
                                    <svg className="tt-icon">
                                        <use xlinkHref="#icon-cancel"></use>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="tt-list-header tt-border-bottom">
                    <div className="tt-col-topic">Topic</div>
                    <div className="tt-col-category">Category</div>
                    <div className="tt-col-value hide-mobile">Likes</div>
                    <div className="tt-col-value hide-mobile">Replies</div>
                    <div className="tt-col-value hide-mobile">Views</div>
                    <div className="tt-col-value">Activity</div>
                </div>
                <div className="tt-item">
                    <div className="tt-col-avatar">
                        <svg className="tt-icon">
                            <use xlinkHref="#icon-ava-n"></use>
                        </svg>
                    </div>
                    <div className="tt-col-description">
                        <h6 className="tt-title"><a href="#">
                            Does Envato act against the authors of Envato markets?
                        </a></h6>
                        <div className="row align-items-center no-gutters hide-desktope">
                            <div className="col-auto">
                                <ul className="tt-list-badge">
                                    <li className="show-mobile"><a href="#"><span className="tt-color05 tt-badge">music</span></a></li>
                                </ul>
                            </div>
                            <div className="col-auto ml-auto show-mobile">
                                <div className="tt-value">1d</div>
                            </div>
                        </div>
                    </div>
                    <div className="tt-col-category"><span className="tt-color05 tt-badge">music</span></div>
                    <div className="tt-col-value hide-mobile">358</div>
                    <div className="tt-col-value tt-color-select hide-mobile">68</div>
                    <div className="tt-col-value hide-mobile">8.3k</div>
                    <div className="tt-col-value hide-mobile">1d</div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;

