import '../../styles/articles.css'
import { useState } from 'react';
import { db, timestamp } from '../../firebase';
import ArticlePreview from './ArticlePreview';


const AddArticle = () => {
    const [preview, setPreview] = useState(false);
    const [body, setBody] = useState([])
    const [elementType, setElementType] = useState('p');
    const [article, setArticle] = useState({
        category: '',
        author: '',
        title: '',
        subtitle: '',
        imageURL: '',
        imageURLMin: '',
        commentsCount: 0,
    });

    const togglePreview = () => {
        setPreview(!preview)
    }

    const onChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value })
    }
    const setType = (e) => {
        setElementType(e.target.value)
    }

    const addField = (e) => {
        e.preventDefault()
        if (e.target.field.value !== '') {
            const field = { [e.target.elementType.value]: e.target.field.value }
            setBody([...body, field]);
            e.target.reset()
            console.log(body);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        db.collection('articles').add({
            ...article, createdAt: timestamp(), body
        }).then(() => {
            setBody([])
            setArticle({
                category: '',
                author: '',
                title: '',
                subtitle: '',
                imageURL: '',
                imageURLMin: '',
                commentsCount: 0,
            });
        })

    }

    return (
        <div className="create-article">
            <form className="article-info" onSubmit={onSubmit}>
                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={onChange}>
                    <option value="HARWARE">HARWARE</option>
                    <option value="TECHNOLOGY">TECHNOLOGY</option>
                    <option value="GAMING">GAMING</option>
                    <option value="FEATURES">FEATURES</option>
                </select>
                <input type="text" placeholder="author" name="author" value={article.author} onChange={onChange} />
                <input type="text" placeholder="title" name="title" value={article.title} onChange={onChange} />
                <input type="text" placeholder="subtitle" name="subtitle" value={article.subtitle} onChange={onChange} />
                <input type="text" placeholder="imageURL" name="imageURL" value={article.imageURL} onChange={onChange} />
                <input type="text" placeholder="imageURLMin" name="imageURLMin" value={article.imageURLMin} onChange={onChange} />

                <button>Submit</button>
            </form>
            <form className="article-content" onSubmit={addField}>
                <select name="elementType" value={elementType} onChange={setType}>
                    <option value="p">P</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="img">Img</option>
                </select>
                <textarea rows="7" id="field"></textarea>
                <button>Add {elementType}</button>
            </form>
            <button onClick={togglePreview}>Preview</button>
            {preview && <ArticlePreview articleInfo={article} body={body} togglePreview={togglePreview} />}
        </div>
    );
}

export default AddArticle;

