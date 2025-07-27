import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useNotyf } from "./useNotyf";

// Initialize Notyf for notifications
const { success, error, warning, info } = useNotyf();

// Define User interface
interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

// Define login credentials interface
interface LoginCredentials {
  email: string;
  password: string;
}

// Define API response interface
interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

const isLoggedIn = ref(false);
const currentUser = ref<User | null>(null);

export function useAuth() {
  const router = useRouter();

  const isAuthenticated = computed(() => {
    // Check if user exists in localStorage and reactive state
    const storedUser = localStorage.getItem("user");
    if (storedUser && !currentUser.value) {
      try {
        currentUser.value = JSON.parse(storedUser);
        isLoggedIn.value = true;
      } catch (error) {
        console.error(error);
        localStorage.removeItem("user");
      }
    }
    return currentUser.value !== null || isLoggedIn.value;
  });

  const user = computed(() => currentUser.value);

  const login = async (credentials: LoginCredentials): Promise<User | null> => {
    try {
      // Your login API call here
      // const response = await api.post('/auth/login', credentials);

      // Mock response for example
      const mockResponse: AuthResponse = {
        user: {
          id: 1,
          name: "John Doe",
          email: credentials.email,
          role: "user",
          avatar: "https://example.com/avatar.jpg",
        },
        token: "mock-jwt-token",
      };

      // Store user data
      currentUser.value = mockResponse.user;
      isLoggedIn.value = true;
      localStorage.setItem("user", JSON.stringify(mockResponse.user));
      localStorage.setItem("token", mockResponse.token);
      success("Logged in successfully");
      return mockResponse.user;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  const logout = () => {
    // Clear auth data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    currentUser.value = null;
    isLoggedIn.value = false;
    success("Logged out successfully");
    router.push("/");
  };

  const updateUser = (userData: Partial<User>) => {
    if (currentUser.value) {
      currentUser.value = { ...currentUser.value, ...userData };
      localStorage.setItem("user", JSON.stringify(currentUser.value));
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    updateUser,
  };
}

// Export types for use in other files
export type { User, LoginCredentials, AuthResponse };
