import { Link } from 'react-router-dom'

export default function Blog({ blog }) {
    return (
        <li className="blog-card">
            <div>
                <Link to={`/blogs/${blog.id}`} className="title">
                    {blog.title} {blog.author}
                </Link>
            </div>
        </li>
    )
}
