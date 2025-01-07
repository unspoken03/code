  // Function to find lowest word count and focus its story
    function findAndFocusLowestWordCount() {
        // Get all elements with class word-count
        const wordCountElements = document.querySelectorAll('.word-count');
        // Initialize variables to store lowest count and its element
        let lowestCount = Infinity;
        let lowestElement = null;
        // Loop through each element
        wordCountElements.forEach(element => {
            // Extract the number from the text (assumes format "XXXX Words")
            const count = parseInt(element.innerText);
            // Update lowest if this count is smaller
            if (count < lowestCount) {
                lowestCount = count;
                lowestElement = element;
            }
        });
        // Remove existing result div if it exists
        const existingDiv = document.getElementById('lowest-word-count-result');
        if (existingDiv) {
            existingDiv.remove();
        }
        // Create new div to display result
        const resultDiv = document.createElement('div');
        resultDiv.id = 'lowest-word-count-result';
        resultDiv.style.backgroundColor = 'black';
        resultDiv.style.padding = '10px';
        resultDiv.style.margin = '10px';
        resultDiv.style.position = 'fixed';
        resultDiv.style.bottom = '30px';
        resultDiv.style.right = '10px';
        resultDiv.style.zIndex = '9999';
        resultDiv.style.fontFamily = 'Arial, sans-serif';
        resultDiv.style.opacity = '0.5';
        resultDiv.style.color = 'white';
        resultDiv.style.borderRadius = '20px';
        if (lowestElement) {
            // Find the parent story element
            let storyElement = lowestElement.closest('.story');
            if (storyElement) {
                // Focus the story element
                storyElement.focus();
                let storyCard = lowestElement.closest('#story-card');
                if (storyCard) {
                    storyCard.style.border = "2.5px solid #3BFA00";
                    storyCard.click(); // Added click here
                }
                resultDiv.innerHTML = `Lowest word count: ${lowestElement.innerHTML}`;
            } else {
                resultDiv.innerHTML = `Lowest word count: ${lowestElement.innerHTML}`;
            }
        } else {
            resultDiv.innerHTML = 'No word count elements found';
        }
        // Add the result div to the body
        document.body.appendChild(resultDiv);
    }
    // Function to check if content is loaded
    function checkForContent() {
        const wordCounts = document.querySelectorAll('.word-count');
        if (wordCounts.length > 0) {
            // Run once and clear the interval
            findAndFocusLowestWordCount();
            if (typeof initialCheckInterval !== 'undefined') {
                clearInterval(initialCheckInterval);
            }
            return true;
        }
        return false;
    }
    // Run the check frequently at first to catch when content loads
    const initialCheckInterval = setInterval(() => {
        const found = checkForContent();
        if (found) {
            clearInterval(initialCheckInterval);
        }
    }, 500); // Check every 500ms
    // Clear the interval after 10 seconds if nothing is found
    setTimeout(() => {
        clearInterval(initialCheckInterval);
    }, 10000);
})();
