// Assuming you have a form with an input field for "role"
const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // Firebase Authentication Signup
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Update user profile with role
      user
        .updateProfile({
          role: role,
        })
        .then(() => {
          // Update Realtime Database with role
          const userId = user.uid;
          const dbRef = firebase.database().ref("users/" + userId);
          dbRef
            .set({
              role: role,
            })
            .then(() => {
              console.log("User created and role saved successfully!");
              // Redirect to a success page or perform other actions
            })
            .catch((error) => {
              console.error("Error saving user role:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating user profile:", error);
        });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
});
