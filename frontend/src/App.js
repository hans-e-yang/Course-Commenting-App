import CourseList from './components/CourseList'
import Reviews from './components/Reviews'
import AddReview from './components/AddReview';
import './App.css';

import { useState } from 'react';

function App() {
  const [selectedCourse, setSelectedCourse] = useState({code: "", id: -1})
  return (
    <div style={{padding: "10px"}}>
      <CourseList onCourseSelected={setSelectedCourse} />
      <Reviews course={selectedCourse} />
      <AddReview course={selectedCourse} />
    </div> 
  );
}

export default App;
