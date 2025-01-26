// class LoginViewModel {
//   async login(email, password) {
//     try {
//       // Call the backend API
//       const response = await fetch('http://localhost:3001/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       // Parse the JSON response
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Login failed');
//       }

//       // Return the user data if successful
//       return { success: true, data: data.data };
//     } catch (error) {
//       console.error('Login error:', error.message);
//       throw new Error(error.message || 'An error occurred during login');
//     }
//   }
// }

// export default new LoginViewModel();

class LoginViewModel {
  async login(email, password) {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("The server returned an unexpected response");
      }

      // Parse the JSON response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      return { success: true, data: data.data };
    } catch (error) {
      // Handle non-JSON responses
      if (error.message.includes("Unexpected token") || error.message.includes("unexpected response")) {
        throw new Error("Unable to connect to the server. Please try again later.");
      }

      throw new Error(error.message || "An error occurred during login");
    }
  }
}

export default new LoginViewModel();


