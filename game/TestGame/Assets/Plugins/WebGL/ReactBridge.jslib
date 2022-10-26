mergeInto(LibraryManager.library, {
    RequestAuth: function () {
      try {
        window.dispatchReactUnityEvent("RequestAuth");
      } catch (e) {
        console.warn("Failed to dispatch event");
      }
    },
  });