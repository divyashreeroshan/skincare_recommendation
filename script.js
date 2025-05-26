async function getRecommendation() {
    const userInput = document.getElementById("userInput").value.trim();
    const output = document.getElementById("output");
  
    if (!userInput) {
      output.textContent = "Please describe your skin concerns.";
      return;
    }
  
    output.textContent = "Generating your routine...";
  
    try {
      const response = await fetch("http://localhost:3000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });
  
      const data = await response.json();
      output.textContent = data.skincareRoutine || "No response received.";
    } catch (err) {
      output.textContent = "An error occurred while fetching recommendations.";
      console.error(err);
    }
  }
  