import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Import CSS

// Create a single instance
const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "bottom",
  },
  types: [
    {
      type: "success",
      background: "#38c172",
    },
    {
      type: "error",
      background: "#e3342f",
    },
    {
      type: "warning",
      background: "#f59e0b",
    },
    {
      type: "info",
      background: "#3b82f6",
    },
  ],
});

export function useNotyf() {
  return {
    success: (message: string, options?: any) => {
      return notyf.success({
        message,
        dismissible: true,
        ...options,
      });
    },

    error: (message: string, options?: any) => {
      return notyf.error({
        message,
        dismissible: true,
        ...options,
      });
    },

    warning: (message: string, options?: any) => {
      return notyf.open({
        type: "warning",
        message,
        dismissible: true,
        ...options,
      });
    },

    info: (message: string, options?: any) => {
      return notyf.open({
        type: "info",
        message,
        dismissible: true,
        ...options,
      });
    },

    // Method to manually dismiss a specific notification
    dismiss: (notification: any) => {
      return notyf.dismiss(notification);
    },

    // Method to dismiss all notifications
    dismissAll: () => {
      return notyf.dismissAll();
    },

    open: (options: any) => {
      return notyf.open({
        dismissible: true,
        ...options,
      });
    },
  };
}
