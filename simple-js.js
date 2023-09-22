        // Resource tracking variables
        const resources = {
            "terraforming-rating": 0,
            "megacredits": 0,
            "steel": 0,
            "titanium": 0,
            "plants": 0,
            "cards": 0,
            "heat": 0,
            // Add more resources here
        };

        // Increment tracking variables
        const increments = {
            "terraforming-rating": 0,
            "megacredits": 0,
            "steel": 0,
            "titanium": 0,
            "plants": 0,
            "cards": 0,
            "heat": 0,
            // Add more increments here
        };
		
	// START:: SPEND alert
	let currentAlertText = "";
let isConfirmation = false; // Variable to track whether confirmation is pending

function showCustomAlert(alertText) {
    currentAlertText = alertText;
    const customAlert = document.getElementById("custom-alert");
    const customAlertText = document.getElementById("custom-alert-text");
    customAlertText.textContent = alertText;
    isConfirmation = true; // Set confirmation state to true
    customAlert.style.display = "flex";
}

// Function to replace the image source
function updateImageSource(newImageName) {
    // Get the image element by its ID
    const imageElement = document.getElementById("image-element");

    // Update the src attribute with the new image name
    imageElement.src = newImageName;
}

function confirmAction() {
    if (isConfirmation) {
        // Handle confirmation
        if (currentAlertText.includes("Spend 200 Megacredits")) {
            updateMessage("Confirmed! You spent 20 Megacredits for 1 Atmosphere.");
        } else if (currentAlertText.includes("Spend 14 Megacredits")) {
				if (resources["megacredits"] >= 14) {
					resources["megacredits"] -= 14;
					resources["terraforming-rating"] += 1; // Increase Terraforming Rating
					updateResourceDisplay();
					updateMessage("Confirmed! You spent 14 Megacredits for 1 Temperature.");
					updateImageSource("heat.png");
					//alert(`You have spent ${cost} Plants for 1 ${resource}.`);
				} else {
					updateMessage("SORRY! You don't have enough resources !!");
					updateImageSource("error.png");
					//alert("Error: Not enough Plants to make this purchase.");
				}            
        } else if (currentAlertText.includes("Spend 8 Plants")) {
				if (resources["plants"] >= 8) {
					resources["plants"] -= 8;
					resources["terraforming-rating"] += 1; // Increase Terraforming Rating
					updateResourceDisplay();
					updateMessage("Confirmed! You spent 8 Plants for 1 Oxygen!");
					updateImageSource("OxygenTree.png");
					//alert(`You have spent ${cost} Plants for 1 ${resource}.`);
				} else {
					updateMessage("SORRY! You don't have enough resources !!");
					updateImageSource("error.png");
					//alert("Error: Not enough Plants to make this purchase.");
				}
        } else if (currentAlertText.includes("Spend 8 Heat")) {
				if (resources["heat"] >= 8) {
					resources["heat"] -= 8;
					resources["terraforming-rating"] += 1; // Increase Terraforming Rating
					updateResourceDisplay();
					updateMessage("Confirmed! You spent 8 heat for 1 Temperature!");
					updateImageSource("temp.png");
					//alert(`You have spent ${cost} Plants for 1 ${resource}.`);
				} else {
					updateMessage("SORRY! You don't have enough resources !!");
					updateImageSource("error.png");
					//alert("Error: Not enough Plants to make this purchase.");
				}
        } else if (currentAlertText.includes("Spend 1 Card")) {
            updateMessage("Confirmed! You spent 1 Card and gained 3 Megacredits.");
				resources["megacredits"] += 3; // Add megacreditsGain without checking cards
				updateResourceDisplay();
				updateImageSource("3megaC.png");
        } else if (currentAlertText.includes("Spend 15 Megacredits")) {
				if (resources["megacredits"] >= 15) {
					resources["megacredits"] -= 15;
					resources["terraforming-rating"] += 1; // Increase Terraforming Rating
					updateResourceDisplay();
					updateMessage("Confirmed! You spent 15 Megacredits for 1 Ocean Tile.");
					updateImageSource("waterTile.png");
					//alert(`You have spent ${cost} Plants for 1 ${resource}.`);
				} else {
					updateMessage("SORRY! You don't have enough resources !!");
					updateImageSource("error.png");
					//alert("Error: Not enough Plants to make this purchase.");
				}
		} else if (currentAlertText.includes("Spend 20 Megacredits")) {
				if (resources["megacredits"] >= 20) {
					resources["megacredits"] -= 20;
					resources["terraforming-rating"] += 1; // Increase Terraforming Rating
					updateResourceDisplay();
					updateMessage("Confirmed! You spent 20 Megacredits for 1 Oxygen!");
					updateImageSource("OxygenTree.png");
					//alert(`You have spent ${cost} Plants for 1 ${resource}.`);
				} else {
					updateMessage("SORRY! You don't have enough resources !!");
					updateImageSource("error.png");

					//alert("Error: Not enough Plants to make this purchase.");
				}
        }

        // Change the Confirm button to OK button
        const confirmButton = document.getElementById("confirm-button");
		const cancelButton = document.getElementById("cancel-button");
		cancelButton.style.display = "none";
        confirmButton.textContent = "OK";
        isConfirmation = false; // Reset confirmation state
    } else {
        // Handle OK button click (close the custom alert)
        closeCustomAlert();
		const confirmButton = document.getElementById("confirm-button");
		const cancelButton = document.getElementById("cancel-button");
		cancelButton.style.display = "";
        confirmButton.textContent = "Confirm";
		updateImageSource("megaC.png");
    }
}

function cancelAction() {
    // Close the custom alert
    closeCustomAlert();
}

function closeCustomAlert() {
    const customAlert = document.getElementById("custom-alert");
    customAlert.style.display = "none";
}

function updateMessage(message) {
    const customAlertText = document.getElementById("custom-alert-text");
    customAlertText.textContent = message;
}


	// END:: SPEND alert

        // Function to update resource display
        function updateResourceDisplay() {
            for (const resourceName in resources) {
                const resourceTotal = resources[resourceName];
                const increment = increments[resourceName];
                document.querySelector(`#${resourceName} .total`).textContent = resourceTotal;
                document.querySelector(`#${resourceName} .increment-number`).textContent = `${increment}`;
            }
        }

        // Event listener for adjusting resources (increment)
        document.querySelectorAll(".adjust-resource").forEach(button => {
            button.addEventListener("click", function() {
                const resourceName = this.getAttribute("data-resource");
                increments[resourceName]++;
                updateResourceDisplay();
            });
        });

        // Event listener for subtracting resources (decrement)
        document.querySelectorAll(".subtract-resource").forEach(button => {
            button.addEventListener("click", function() {
                const resourceName = this.getAttribute("data-resource");
                if (increments[resourceName] > 0) {
                    increments[resourceName]--;
                    updateResourceDisplay();
                }
            });
        });

        // Event listener for total numbers to open the modal
        document.querySelectorAll(".total").forEach(totalElement => {
            totalElement.addEventListener("click", function() {
                const resourceName = this.parentElement.parentElement.id; // Get the resource ID
                const resourceTotal = resources[resourceName];
                const modalContent = `
                    <div class="modal-content">
                        <!--<h2>${resourceName}</h2>-->
                        <h2 class="totaler"><span class="smallerTot">total:</span> ${resourceTotal}</h2>
                        <!--<p>Increment: <span id="increment-display">${increments[resourceName]}</span></p>-->
                        <input type="number" id="resource-input" value="">
						<p id="error-message" ></p>
                        <div class="number-pad">
                            <button class="number" data-value="1">1</button>
                            <button class="number" data-value="2">2</button>
                            <button class="number" data-value="3">3</button>
                            <button class="number" data-value="4">4</button>
                            <button class="number" data-value="5">5</button>
                            <button class="number" data-value="6">6</button>
                            <button class="number" data-value="7">7</button>
                            <button class="number" data-value="8">8</button>
                            <button class="number" data-value="9">9</button>
                            <button class="number" data-value="0">0</button>
                            <button class="number clear" data-value="clear">Clear</button>
                        </div>
						<span class="liner1">
							<button id="close-modal">X</button>
							<button id="gain-resource">Gain</button>
							<button id="spend-resource">Spend</button
						</span>
                    </div>
                `;
                const modalElement = document.querySelector("#resource-modal");
                modalElement.innerHTML = modalContent;

                // Event listeners for number pad buttons
                document.querySelectorAll(".number").forEach(numButton => {
                    numButton.addEventListener("click", function() {
                        const value = this.getAttribute("data-value");
                        const inputElement = document.querySelector("#resource-input");
                        if (value === "clear") {
                            inputElement.value = "";
                        } else {
                            inputElement.value += value;
                        }
                    });
                });

                // Event listener for the "Spend" button
                document.querySelector("#spend-resource").addEventListener("click", function() {
                    const spendAmount = parseInt(document.querySelector("#resource-input").value) || 0;
                    if (spendAmount <= resourceTotal) {
                        resources[resourceName] -= spendAmount;
                        updateResourceDisplay();
                        modalElement.classList.remove("show");
                    } else {
                        document.querySelector("#error-message").textContent = "Not enough resources to spend.";
                    }
                });

                // Event listener for the "Gain" button
                document.querySelector("#gain-resource").addEventListener("click", function() {
                    const gainAmount = parseInt(document.querySelector("#resource-input").value) || 0;
                    resources[resourceName] += gainAmount;
                    updateResourceDisplay();
                    modalElement.classList.remove("show");
                });

                // Event listener for the "Close" button
                document.querySelector("#close-modal").addEventListener("click", function() {
                    modalElement.classList.remove("show");
                });

                // Show the modal
                modalElement.classList.add("show");
            });
        });
		

		// Event listener for the "PRODUCTION" button
		document.querySelector("#production-button").addEventListener("click", function() {
			// Add the increment values to their respective totals
			resources["megacredits"] += resources["terraforming-rating"]; // Increment from Terraforming Rating to Megacredits
			resources["heat"] += increments["heat"]; // Increment from Heat
			resources["plants"] += increments["plants"]; // Increment from Plants
			
			
			// Update the megacredits total
			resources["megacredits"] += increments["megacredits"]; // Increment from Megacredits to Megacredits Total
			updateResourceDisplay();
		});

		// Handle generation button logic here
		// Add event listeners for adjusting reserve resources
		// Implement the generation button functionality

		// Initial update
		updateResourceDisplay();
		
		
		
	// START::::: Event listener for the "Reload Page" button
		document.querySelector("#reload-button").addEventListener("click", function() {
			// Show the confirmation modal
			document.querySelector("#confirmation-modal").classList.add("show");
		});

		// Event listener for the "Yes, Reload" button
		document.querySelector("#confirm-reload").addEventListener("click", function() {
			// Reload the page
			location.reload();
		});

		// Event listener for the "Cancel" button
		document.querySelector("#cancel-reload").addEventListener("click", function() {
			// Hide the confirmation modal
			document.querySelector("#confirmation-modal").classList.remove("show");
		});
	// END::::: Event listener for the "Reload Page" button
	

	
		
// RESOURCES ADD

// Event listeners for spending Megacredits
document.querySelector("#spend-megacredits-oxygen").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to spend 20 Megacredits for 1 Oxygen?";
    confirmAndSpendMegacredits(confirmMessage, 20, "oxygen", 1); // Added Terraforming Rating increment of 1
});

document.querySelector("#spend-megacredits-temperature").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to spend 14 Megacredits for 1 Temperature?";
    confirmAndSpendMegacredits(confirmMessage, 14, "temperature", 1); // Added Terraforming Rating increment of 1
});

document.querySelector("#spend-plants-oxygen").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to spend 8 Plants for 1 Oxygen?";
    confirmAndSpendPlants(confirmMessage, 8, "oxygen", 1); // Added Terraforming Rating increment of 1
});

document.querySelector("#spend-heat-temperature").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to spend 8 Heat for 1 Temperature?";
    confirmAndSpendHeat(confirmMessage, 8, "temperature", 1); // Added Terraforming Rating increment of 1
});

document.querySelector("#spend-megacredits-ocean").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to spend 15 Megacredits for 1 Ocean Tile?";
    confirmAndSpendMegacredits(confirmMessage, 15, "ocean tile", 1); // Added Terraforming Rating increment of 1
});

document.querySelector("#spend-card-megacredits").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to discard 1 card to gain 3 Megacredits?";
    discardCardToGainMegacredits(confirmMessage, 1, 3); // Updated to discard 1 card to gain 3 Megacredits
});


// Event listeners for gaining resources
document.querySelector("#gain-temperature").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to gain 1 Temperature?";
    gainResource(confirmMessage, "temperature", 1); // Added Terraforming Rating increment of 1
});

document.querySelector("#gain-oxygen").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to gain 1 Oxygen?";
    gainResource(confirmMessage, "oxygen", 1); // Added Terraforming Rating increment of 1
});

document.querySelector("#gain-ocean-tile").addEventListener("click", function () {
    const confirmMessage = "Are you sure you want to gain 1 Ocean Tile?";
    gainResource(confirmMessage, "ocean tile", 1); // Added Terraforming Rating increment of 1
});

// Function to confirm and spend Megacredits
		function confirmAndSpendMegacredits(confirmMessage, cost, resource, terraformingRatingIncrement) {
			const confirmed = confirm(confirmMessage);
			if (confirmed) {
				if (resources["megacredits"] >= cost) {
					resources["megacredits"] -= cost;
					resources["terraforming-rating"] += terraformingRatingIncrement; // Increase Terraforming Rating
					updateResourceDisplay();
					alert(`You have spent ${cost} Megacredits for 1 ${resource}.`);
				} else {
					alert("Error: Not enough Megacredits to make this purchase.");
				}
			}
		}

		// Function to confirm and spend Plants
		function confirmAndSpendPlants(confirmMessage, cost, resource, terraformingRatingIncrement) {
			const confirmed = confirm(confirmMessage);
			if (confirmed) {
				if (resources["plants"] >= cost) {
					resources["plants"] -= cost;
					resources["terraforming-rating"] += terraformingRatingIncrement; // Increase Terraforming Rating
					updateResourceDisplay();
					alert(`You have spent ${cost} Plants for 1 ${resource}.`);
				} else {
					alert("Error: Not enough Plants to make this purchase.");
				}
			}
		}

		// Function to confirm and spend Heat
		function confirmAndSpendHeat(confirmMessage, cost, resource, terraformingRatingIncrement) {
			const confirmed = confirm(confirmMessage);
			if (confirmed) {
				if (resources["heat"] >= cost) {
					resources["heat"] -= cost;
					resources["terraforming-rating"] += terraformingRatingIncrement; // Increase Terraforming Rating
					updateResourceDisplay();
					alert(`You have spent ${cost} Heat for 1 ${resource}.`);
				} else {
					alert("Error: Not enough Heat to make this purchase.");
				}
			}
		}

		// Function to discard a card and gain Megacredits without checking the number of cards
		function discardCardToGainMegacredits(confirmMessage, cardCost, megacreditsGain) {
			const confirmed = confirm(confirmMessage);
			if (confirmed) {
				resources["megacredits"] += megacreditsGain; // Add megacreditsGain without checking cards
				updateResourceDisplay();
				//document.querySelector("#spending-modal").classList.add("show");
				alert(`You have gained ${megacreditsGain} Megacredits.`);
			}
		}
		
