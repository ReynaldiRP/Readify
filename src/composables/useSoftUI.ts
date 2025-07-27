import { onMounted, onUnmounted, nextTick } from "vue";

interface LoadedAsset {
  element: HTMLElement;
  url: string;
  type: "script" | "stylesheet";
}

export function useSoftUI() {
  console.log("Reinitializing Soft UI Dashboard assets...");
  const loadedAssets: LoadedAsset[] = [];
  let initialized = false;

  // Helper function to load JavaScript files
  function loadJS(fileUrl: string, async = true): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (document.querySelector(`script[src="${fileUrl}"]`)) {
        resolve();
        return;
      }

      const dynamicScript = document.createElement("script");
      dynamicScript.setAttribute("src", fileUrl);
      dynamicScript.setAttribute("type", "text/javascript");
      dynamicScript.setAttribute("async", async.toString());

      dynamicScript.onload = () => {
        loadedAssets.push({
          element: dynamicScript,
          url: fileUrl,
          type: "script",
        });
        resolve();
      };

      dynamicScript.onerror = () => {
        reject(new Error(`Failed to load script: ${fileUrl}`));
      };

      document.head.appendChild(dynamicScript);
    });
  }

  // Helper function to load CSS files
  function loadStylesheet(fileUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (document.querySelector(`link[href="${fileUrl}"]`)) {
        resolve();
        return;
      }

      const dynamicStylesheet = document.createElement("link");
      dynamicStylesheet.setAttribute("href", fileUrl);
      dynamicStylesheet.setAttribute("type", "text/css");
      dynamicStylesheet.setAttribute("rel", "stylesheet");

      dynamicStylesheet.onload = () => {
        loadedAssets.push({
          element: dynamicStylesheet,
          url: fileUrl,
          type: "stylesheet",
        });
        resolve();
      };

      dynamicStylesheet.onerror = () => {
        reject(new Error(`Failed to load stylesheet: ${fileUrl}`));
      };

      document.head.appendChild(dynamicStylesheet);
    });
  }

  // Main initialization function that replicates the original script logic
  async function initializeSoftUI() {
    if (initialized) return;

    try {
      await nextTick(); // Wait for Vue to render DOM

      const basePath = "/assets";

      // Always load perfect scrollbar (like the original script)
      await Promise.all([
        loadStylesheet(`${basePath}/css/perfect-scrollbar.css`),
        loadJS(`${basePath}/js/perfect-scrollbar.js`, true),
      ]);

      // Conditional loading based on DOM elements (replicating original logic)
      const conditionalLoads: Promise<void>[] = [];

      // Load navbar collapse if navbar trigger exists
      if (document.querySelector("nav [navbar-trigger]")) {
        conditionalLoads.push(
          loadJS(`${basePath}/js/navbar-collapse.js`, true)
        );
      }

      // Load tooltips if tooltip elements exist
      if (document.querySelector('[data-target="tooltip"]')) {
        conditionalLoads.push(
          loadJS(`${basePath}/js/tooltips.js`, true),
          loadStylesheet(`${basePath}/css/tooltips.css`)
        );
      }

      // Load nav pills if nav-pills elements exist
      if (document.querySelector("[nav-pills]")) {
        conditionalLoads.push(loadJS(`${basePath}/js/nav-pills.js`, true));
      }

      // Load dropdown if dropdown trigger exists
      if (document.querySelector("[dropdown-trigger]")) {
        conditionalLoads.push(loadJS(`${basePath}/js/dropdown.js`, true));
      }

      // Load fixed plugin if fixed-plugin elements exist
      if (document.querySelector("[fixed-plugin]")) {
        conditionalLoads.push(loadJS(`${basePath}/js/fixed-plugin.js`, true));
      }

      // Load sidenav and navbar sticky if navbar-main exists
      if (document.querySelector("[navbar-main]")) {
        conditionalLoads.push(
          loadJS(`${basePath}/js/sidenav-burger.js`, true),
          loadJS(`${basePath}/js/navbar-sticky.js`, true)
        );
      }

      // Load chart scripts if canvas elements exist
      if (document.querySelector("canvas")) {
        conditionalLoads.push(
          loadJS(`${basePath}/js/chart-1.js`, true),
          loadJS(`${basePath}/js/chart-2.js`, true)
        );
      }

      // Wait for all conditional assets to load
      await Promise.all(conditionalLoads);

      initialized = true;
    } catch (error) {
      console.error("Failed to load Soft UI Dashboard assets:", error);
    }
  }

  // Cleanup function to remove loaded assets
  function cleanup() {
    loadedAssets.forEach(({ element }) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    loadedAssets.length = 0;
    initialized = false;
  }

  // Re-initialize function for dynamic content changes
  async function reinitialize() {
    cleanup();
    await initializeSoftUI();
  }

  // Auto-initialize on component mount
  onMounted(() => {
    initializeSoftUI();
  });

  // Auto-cleanup on component unmount
  onUnmounted(() => {
    cleanup();
  });

  return {
    initializeSoftUI,
    reinitialize,
    cleanup,
    loadJS,
    loadStylesheet,
    isInitialized: () => initialized,
  };
}
export default useSoftUI;
