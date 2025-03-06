import { Link } from 'react-router-dom'
import {
    Card,
    CardActionArea,
    CardHeader,
} from '@mui/material'

export default function Blog({ blog }) {
    return (
        <Link
            to={`/blogs/${blog.id}`}
            className="title"
            style={{ textDecoration: 'none' }}
        >
            <Card
                sx={{
                    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.20)'
                }}
            >
                <CardActionArea>
                    <CardHeader
                        title={blog.title}
                        subheader={
                            <>
                                <span
                                    style={{ fontWeight: 'bold', marginRight: '8px' }}
                                >
                                    Added by:
                                </span>
                                {blog.author}
                            </>
                        }
                    />
                </CardActionArea>
            </Card>
        </Link>
    )
}
