import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

export const Recommendations = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const result = useQuery(ALL_BOOKS, {
        variables: { genre: user.favoriteGenre }
    })

    return <>
        <h2>Recommendations</h2>
        {
            result.loading
                ? <>...loading</>
                : <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {result.data?.allBooks?.map((a) => (
                            <tr key={a.id}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        }
    </>
}