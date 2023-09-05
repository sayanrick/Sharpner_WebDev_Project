async function signup(e) {
    try {
        e.preventDefault();
        console.log(e.target.email.value);

        // Make sure to get the password value correctly
        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value, // Add .value to access the input value
        };
        console.log(signupDetails);

        const response = await axios.post('http://localhost:3000/user/signup', signupDetails);

        if (response.status === 201) {
            window.location.href = "../Login/login.html"; // Change the page on successful signup
        } else {
            throw new Error('Failed to signup'); // Update the error message
        }
    } catch (err) {
        // Use innerHTML safely and close the <div> tag properly
        document.body.innerHTML += `<div style="color:red;"> ${err.message} </div>`;
    }
}
