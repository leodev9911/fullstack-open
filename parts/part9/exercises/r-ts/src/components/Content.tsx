import { CoursePart } from '../types'
import { Part } from './Part';

interface HeaderProps {
    courseParts: CoursePart[];
}

export const Content: React.FC<HeaderProps> = ({ courseParts }) => {
    return courseParts.map(coursePart => <Part
        key={coursePart.name}
        coursePart={coursePart}
    />)
}