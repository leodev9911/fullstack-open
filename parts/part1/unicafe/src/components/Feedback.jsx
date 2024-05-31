import Button from './Button'

const Feedback = ({ handleAddGood, handleAddNeutral, handleAddBad }) => {
  return <>
    <h1>feedback</h1>
    <Button name='good' onClick={handleAddGood} />
    <Button name='neutral' onClick={handleAddNeutral}/>
    <Button name='bad' onClick={handleAddBad} />
  </>
}

export default Feedback