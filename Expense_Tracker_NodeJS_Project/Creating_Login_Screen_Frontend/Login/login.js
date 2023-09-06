async function login(e) {
    try {
        e.preventDefault();
        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(loginDetails);
        const response = await axios.post('http://localhost:5000/user/login', loginDetails);
        if (response.status === 200) {
            alert(response.data.message);
            // Redirect the user to a new page or perform other actions after successful login.
            // You can do this by using window.location.href = 'new-page-url';
        } else {
            // Handle other response statuses, such as 401 (Unauthorized), 404 (Not Found), etc.
            // You can display an error message to the user or perform other actions.
            console.error('Login failed:', response.statusText);
        }
    } catch(err) {
        console.log('Error', err);
        document.body.innerHTML += `<div style="color:red;"> ${err.message} </div>`;
    }
}