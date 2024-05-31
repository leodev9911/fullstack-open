import { useState } from 'react'
import Feedback from './components/Feedback'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleAddGood = () => setGood(good + 1)
  const handleAddNeutral = () => setNeutral(neutral + 1)
  const handleAddBad = () => setBad(bad + 1)

  return (
    <div>
      <Feedback handleAddGood={handleAddGood} handleAddNeutral={handleAddNeutral} handleAddBad={handleAddBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
