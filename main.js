document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const root = document.documentElement;
  
    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
      toggleBtn.textContent = "Light";
    }
  
    // Toggle theme
    toggleBtn.addEventListener("click", () => {
      root.classList.toggle("dark");
  
      if (root.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "Light";
      } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "Dark";
      }
    });
  
    // Load projects
    fetch("projects.json")
      .then(res => res.json())
      .then(projects => {
        const container = document.getElementById("projects-container");
  
        projects.forEach(project => {
          const el = document.createElement("div");
  
          el.innerHTML = `
            <h3 class="text-xl font-medium hover:text-black dark:hover:text-white transition-colors">
              ${project.title}
            </h3>
  
            <p class="mt-2 text-gray-600 dark:text-neutral-400 max-w-3xl">
              ${project.description}
            </p>
  
            <p class="mt-2 text-gray-600 dark:text-neutral-400 max-w-3xl">
              ${project.impact}
            </p>
  
            <p class="mt-3 text-sm text-gray-500 dark:text-neutral-400">
              ${project.stack.join(" · ")}
            </p>
          `;
  
          container.appendChild(el);
        });
      })
      .catch(err => console.error("Project load failed:", err));
  });
  