import { useState, useEffect } from "react";

function Reviews({course}) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (course.code !== "") {
            fetch("http://localhost:3001/reviews?courseId=" + course.id)
                .then(async res => {
                    let data = await res.json()
                    console.log(data)
                    setReviews(data)
                })
        }
    }, [course])

    return (
        <div>
            <h2>{course.code}</h2>
            {reviews.map(review => (
                <div key={review.id}>
                    <p>Rating: {review.rating}</p>
                    <p>Comment: {review.message}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default Reviews