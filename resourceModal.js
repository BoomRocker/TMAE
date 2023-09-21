<script>
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

        // Create the modal content
        const modalContent = `
            <div class="modal-content">
                <!--<h2>${resourceName}</h2>-->
                <h2 class="totaler"><span class="smallerTot">total:</span> ${resourceTotal}</h2>
                <!--<p>Increment: <span id="increment-display">${increments[resourceName]}</span></p>-->
                <input type="number" id="resource-input" value="">
                <p id="error-message"></p>
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
                    <button id="spend-resource">Spend</button>
                </span>
            </div>
        `;

        // Create a new modal element
        const modalElement = document.createElement("div");
        modalElement.id = "resource-modal";
        modalElement.innerHTML = modalContent;

        // Append the modal element to the document body
        document.body.appendChild(modalElement);

        // Add event listeners to the modal buttons (if needed)

        // Close the modal
        const closeModalButton = document.querySelector("#close-modal");
        closeModalButton.addEventListener("click", () => {
            document.body.removeChild(modalElement);
        });

        // Handle the "Gain" button click event (if needed)
        const gainResourceButton = document.querySelector("#gain-resource");
        gainResourceButton.addEventListener("click", () => {
            // Handle the gain resource logic here
        });

        // Handle the "Spend" button click event (if needed)
        const spendResourceButton = document.querySelector("#spend-resource");
        spendResourceButton.addEventListener("click", () => {
            // Handle the spend resource logic here
        });
    }
}





		
		
// Function to update the resource values and display them
        function updateResources() {
            document.getElementById('megacredits').textContent = `Megacredits: ${megacredits}`;
            document.getElementById('atmosphere').textContent = `Atmosphere: ${atmosphere}`;
            document.getElementById('temperature').textContent = `Temperature: ${temperature}`;
            document.getElementById('plants').textContent = `Plants: ${plants}`;
            document.getElementById('heat').textContent = `Heat: ${heat}`;
            document.getElementById('cards').textContent = `Cards: ${cards}`;
            document.getElementById('oceanTiles').textContent = `Ocean Tiles: ${oceanTiles}`;
        }

        // Function to show the modal
        function showModal(message) {
            document.getElementById('modalMessage').textContent = message;
            modal.style.display = 'block';
        }

        // Function to hide the modal
        function hideModal() {
            modal.style.display = 'none';
        }

        // Add click event listeners to buttons
        const buttons = document.querySelectorAll('button[id^="btn"]');
        const modal = document.getElementById('myModal');
        const confirmBtn = document.getElementById('confirm');
        const cancelBtn = document.getElementById('cancel');

        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                showModal(`Are you sure you want to spend resources for this action?`);
                confirmBtn.addEventListener('click', () => {
                    // Deduction logic for each button with error handling
                    let errorMessage = '';
                    switch (index) {
                        case 0: // Spend 20 Megacredits to gain 1 Atmosphere
                            if (megacredits >= 20) {
                                megacredits -= 20;
                                atmosphere += 1;
                            } else {
                                errorMessage = 'Not enough Megacredits.';
                            }
                            break;
                        case 1: // Spend 14 Megacredits to gain 1 Temperature
                            if (megacredits >= 14) {
                                megacredits -= 14;
                                temperature += 1;
                            } else {
                                errorMessage = 'Not enough Megacredits.';
                            }
                            break;
                        case 2: // Spend 8 Plants to gain 1 Atmosphere
                            if (plants >= 8) {
                                plants -= 8;
                                atmosphere += 1;
                            } else {
                                errorMessage = 'Not enough Plants.';
                            }
                            break;
                        case 3: // Spend 8 Heat to gain 1 Temperature
                            if (heat >= 8) {
                                heat -= 8;
                                temperature += 1;
                            } else {
                                errorMessage = 'Not enough Heat.';
                            }
                            break;
                        case 4: // Spend 1 Card to gain 3 Megacredits
                            if (cards >= 1) {
                                cards -= 1;
                                megacredits += 3;
                            } else {
                                errorMessage = 'Not enough Cards.';
                            }
                            break;
                        case 5: // Spend 15 Megacredits to gain one Ocean Tile
                            if (megacredits >= 15) {
                                megacredits -= 15;
                                oceanTiles += 1;
                            } else {
                                errorMessage = 'Not enough Megacredits.';
                            }
                            break;
                        default:
                            break;
                    }
                    if (errorMessage) {
                        showModal(errorMessage);
                    } else {
                        updateResources();
                        hideModal();
                    }
                });
            });
        });

        // Initial resource display
        updateResources();
</script>