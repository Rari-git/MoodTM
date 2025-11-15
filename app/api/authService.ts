import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export const authService = {
  async register(userData: User): Promise<AuthResponse> {
    try {
      const { name, email, password } = userData;
      
      if (!name || !email || !password) {
        return { success: false, message: "All fields are required" };
      }

      if (password.length < 3) {
        return { success: false, message: "Password must be at least 3 characters" };
      }

      // Get existing users
      const stored = await AsyncStorage.getItem("users");
      const users: User[] = stored ? JSON.parse(stored) : [];

      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return { success: false, message: "User already exists" };
      }

      // Add new user
      const newUser: User = { name, email, password };
      users.push(newUser);

      // Save updated users list
      await AsyncStorage.setItem("users", JSON.stringify(users));
      
      console.log("✅ User registered successfully:", email);
      return { success: true, user: newUser };

    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed" };
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }

      // Get existing users
      const stored = await AsyncStorage.getItem("users");
      const users: User[] = stored ? JSON.parse(stored) : [];

      // Find user
      const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      );

      if (!user) {
        return { success: false, message: "Invalid email or password" };
      }

      console.log("✅ User logged in successfully:", email);
      return { success: true, user };

    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const loggedEmail = await AsyncStorage.getItem("loggedEmail");
      if (!loggedEmail) return null;

      const stored = await AsyncStorage.getItem("users");
      const users: User[] = stored ? JSON.parse(stored) : [];

      return users.find(user => user.email === loggedEmail) || null;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        "isLoggedIn",
        "loggedEmail", 
        "autoLogin"
      ]);
      console.log("✅ User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
};