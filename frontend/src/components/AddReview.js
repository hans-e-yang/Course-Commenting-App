function AddReview({course}) {

    function submitForm(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        data.courseId = course.id
        
        fetch("http://localhost:3001/reviews", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => console.log(res))
    }

    if (course.code !== "") {
        return (
            <form onSubmit={submitForm}>
                <p>Add review to {course.code}</p>
                <input type="number" title="rating" name="rating" min="1" max="5" />
                <br/>
                <textarea title="message" name="message" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default AddReview