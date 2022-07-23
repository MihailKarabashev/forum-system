import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import useForm from "../../../hooks/useForm";
import * as postService from '../../../services/postServices';
import * as categoriesService from '../../../services/categoryService';
import * as tagsService from '../../../services/tagService';



const animatedComponent = makeAnimated();

const EditPost = () => {
    const [post, setPost] = useState({});

    const [tagsList, setTagsList] = useState([]);
    const [tags, setTags] = useState();

    const [categoriesList, setCategoriesList] = useState([]);
    const [category, setCategory] = useState();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            const [postData, categoriesData, tagsData] = await Promise.all([
                postService.getPostById(id),
                categoriesService.getAllCategories(),
                tagsService.getAllTags()
            ]);

            let categoryOptions = categoriesData.map(x => ({ label: x.name, value: x.id }));
            let tagsOptions = tagsData.map(x => ({ label: x.name, value: x.id }));


            setPost(postData);
            setCategoriesList(categoryOptions);
            setTagsList(tagsOptions);

            const categoryDefaultValue = categoryOptions.find(x => x.value === postData.categoryId);
            setCategory(categoryDefaultValue);

            const tagsDefaultValues = tagsOptions.filter(x => postData.tags.find(f => f.name === x.label));
            setTags(tagsDefaultValues);
        })();

    }, [id]);




    const onFormSubmit = () => {

        const newPost = {
            title: values.title || post.title,
            description: values.description || post.description,
            categoryId: category.value,
            tags: tags.map(x => Number(x.value))
        }

        postService.update(newPost, id)
            .then(data => {
                navigate(`/posts/details/${id}`, { state: { id: id } });
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
    }

    return (
        <div className="container">
            <div className="tt-wrapper-inner">
                <h1 className="tt-title-border">
                    Edit My Topic
                </h1>
                <form className="form-default form-create-topic" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group" >
                        <label htmlFor="inputTopicTitle">Topic Title</label>
                        <div className="tt-value-wrapper">
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                id="inputTopicTitle"
                                placeholder="Subject of your topic"
                                required
                                onChange={handleChange}
                                defaultValue={post.title}
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
                                onChange={handleChange}
                                defaultValue={post.description}
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
                                        value={category}
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
                                        value={tags}
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
    )
}

export default EditPost