class SignupViewModel {
    async signup(email, password) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      // Mock response
      return { success: true, message: 'Signup successful!' };
    }
  }
  
  export default new SignupViewModel();
  