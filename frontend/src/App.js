import CourseList from './courseList/CourseList'
import './App.css';

function App() {
  return (
    <CourseList onCourseSelected={console.log} />
  );
}

export default App;
