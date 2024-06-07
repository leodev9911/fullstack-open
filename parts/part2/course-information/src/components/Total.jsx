const Total = (props) => {
    const total = props.parts?.reduce(
        (currentValue, acc) => currentValue + acc.exercises,
        0
    );

    return <p>Number of exercises {total}</p>;
};

export default Total;
