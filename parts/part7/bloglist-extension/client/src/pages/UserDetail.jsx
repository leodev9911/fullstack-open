const UserDetail = ({ user }) => {
    return (
        <>
            <h2>{user?.name}</h2>
            <div>
                <h3>added blogs</h3>
                <ul>
                    {user?.blogs?.map((blog) => (
                        <li key={blog?.id}>{blog?.title}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default UserDetail
