import { CoursePart } from '../types'

interface PartProps {
    coursePart: CoursePart;
}

export const Part: React.FC<PartProps> = ({ coursePart }) => {
    switch (coursePart.kind) {
        case 'background':
            return <>
                <p>
                    <strong>
                        {coursePart.name} {coursePart.exerciseCount}
                    </strong>
                </p>
                <p>{coursePart.description}</p>
                <p><strong>Background Material:</strong> {coursePart.backgroundMaterial}</p>
            </>
        case 'basic':
            return <>
                <p>
                    <strong>
                        {coursePart.name} {coursePart.exerciseCount}
                    </strong>
                </p>
                <p>{coursePart.description}</p>
            </>
        case 'group':
            return <>
                <p>
                    <strong>
                        {coursePart.name} {coursePart.exerciseCount}
                    </strong>
                </p>
                <p><strong>Group Project Count:</strong> {coursePart.groupProjectCount}</p>
            </>
        case 'special':
            return <>
                <p>
                    <strong>
                        {coursePart.name} {coursePart.exerciseCount}
                    </strong>
                </p>
                <p>{coursePart.description}</p>
                <p><strong>Requirements:</strong> {coursePart.requirements.join(', ')}</p>
            </>
        default:
            return <></>;
    }
}