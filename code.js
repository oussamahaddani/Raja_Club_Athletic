// Function d'affichage de l'alerte personnalisee
function showAlert(title, message) {
    var alertBox = document.getElementById("customAlert");
    var alertTitle = document.getElementById("alertTitle");
    var alertMessage = document.getElementById("alertMessage");

    if (alertBox && alertTitle && alertMessage) {
        alertTitle.textContent = title;
        alertMessage.textContent = message;
        alertBox.classList.add("active");
    } else {
        alert(title + ": " + message);
    }
}

function closeAlert() {
    var alertBox = document.getElementById("customAlert");
    if (alertBox) {
        alertBox.classList.remove("active");
    }
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    // Gestion du formulaire de la Newsletter (Footer)
    var newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Empêche le rechargement de la page
            
            var emailInput = document.getElementById("email_footer");
            if (emailInput && emailInput.value.trim() !== "") {
                showAlert("Abonnement réussi !", "Merci de vous être abonné à la newsletter de l'Aigle Vert.");
                emailInput.value = ""; // Réinitialise le champ email
            }
        });
    }

    // Restauration du panier
    afficherPanier();
});

// Menu mobile Burger
function toggleMenu() {
    var mainNav = document.getElementById("mainNav");
    var burgerBtn = document.getElementById("burgerBtn");
    if (mainNav && burgerBtn) {
        mainNav.classList.toggle("open");
        burgerBtn.classList.toggle("open");
    }
}

// Toggle de la barre latérale Sidebar
function toggleAside() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

// Gestion du Panier (LocalStorage)
function ajouterAuPanier(nom, prix, image) {
    var panier = JSON.parse(localStorage.getItem("panier")) || [];
    var produitExistant = panier.find(function (item) { return item.nom === nom; });

    if (produitExistant) {
        produitExistant.quantite += 1;
    } else {
        panier.push({ nom: nom, prix: prix, image: image, quantite: 1 });
    }

    localStorage.setItem("panier", JSON.stringify(panier));
    showAlert("Panier", nom + " a été ajouté à votre panier avec succès !");
}

function afficherPanier() {
    var cartTableBody = document.querySelector("#cartTable tbody");
    var grandTotalElement = document.getElementById("grandTotal");
    if (!cartTableBody) return;

    var panier = JSON.parse(localStorage.getItem("panier")) || [];
    cartTableBody.innerHTML = "";
    var totalGeneral = 0;

    if (panier.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Votre panier est vide.</td></tr>';
        if (grandTotalElement) grandTotalElement.textContent = "0 DH";
        return;
    }

    panier.forEach(function (item, index) {
        var totalProduit = item.prix * item.quantite;
        totalGeneral += totalProduit;

        var row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.nom}" width="50"> ${item.nom}</td>
            <td>${item.prix} DH</td>
            <td>
                <button onclick="changerQuantite(${index}, -1)">-</button>
                <span>${item.quantite}</span>
                <button onclick="changerQuantite(${index}, 1)">+</button>
            </td>
            <td>${totalProduit} DH</td>
            <td><button onclick="supprimerProduit(${index})" style="color:red; cursor:pointer;">X</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    if (grandTotalElement) {
        grandTotalElement.textContent = totalGeneral + " DH";
    }
}

function changerQuantite(index, delta) {
    var panier = JSON.parse(localStorage.getItem("panier")) || [];
    if (panier[index]) {
        panier[index].quantite += delta;
        if (panier[index].quantite <= 0) {
            panier.splice(index, 1);
        }
        localStorage.setItem("panier", JSON.stringify(panier));
        afficherPanier();
    }
}

function supprimerProduit(index) {
    var panier = JSON.parse(localStorage.getItem("panier")) || [];
    if (panier[index]) {
        panier.splice(index, 1);
        localStorage.setItem("panier", JSON.stringify(panier));
        afficherPanier();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Gestion du formulaire de la Newsletter (Footer)
    var newsletterForm = document.getElementById("newsletterForm");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Empêche le rechargement de la page

            var emailInput = document.getElementById("email_footer");
            var emailValue = emailInput ? emailInput.value.trim() : "";

            // 1. Validation: Champ vide
            if (emailValue === "") {
                showAlert("Erreur", "3affak dkhl l-adresse email dyalak !");
                return;
            }

            // 2. Validation: Format email
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                showAlert("Erreur", "L-email li dkhalti machi sahih !");
                return;
            }

            // Si tout est valide
            showAlert("Abonnement réussi !", "Merci de vous être abonné à la newsletter de l'Aigle Vert.");
            emailInput.value = ""; // Vider le champ après succès
        });
    }

    // Affichage du panier au chargement si la fonction existe
    if (typeof afficherPanier === "function") {
        afficherPanier();
    }
});






// LocalStorage helpers
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Custom Alert / Toast Notification Design
function showNotification(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <span class="toast-icon">✨</span>
        <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Ajouter un produit au panier
function addToCart(name, price, image) {
    let cart = getCart();
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart(cart);
    showNotification(`<strong>${name}</strong> a été ajouté au panier !`);
}

// Afficher les éléments du panier
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalElement) return;

    let cart = getCart();
    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="6" class="empty-cart">Votre panier est actuellement vide.</td></tr>';
        cartTotalElement.innerText = '0.00';
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img width="80" src="${item.image}" alt="${item.name}" class="cart-img"></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.price.toFixed(2)} DH</td>
            <td>
                <div class="qty-btn-group">
                    <button class="btn-qty" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="btn-qty" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td><strong>${itemTotal.toFixed(2)} DH</strong></td>
            <td>
                <button class="btn-delete" onclick="removeFromCart(${index})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotalElement.innerText = grandTotal.toFixed(2);
}

// Modifier la quantité
function updateQuantity(index, change) {
    let cart = getCart();
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart(cart);
        renderCart();
    }
}

// Supprimer du panier
function removeFromCart(index) {
    let cart = getCart();
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    showNotification(`<strong>${removedName}</strong> a été retiré du panier.`);
}



// Afficher la boîte Pop-up Custom Alert
function showAlert(title, message) {
    document.getElementById('alertTitle').innerText = title;
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('customAlert').classList.add('active');
}

// Fermer la Pop-up Custom Alert
function closeAlert() {
    document.getElementById('customAlert').classList.remove('active');
}

// Option Toast (Notification automatique qui disparaît au bout de 3 secondes)
function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#CDA23B">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Exemple d'intégration avec votre fonction addToCart :
function addToCart(name, price, image) {
    // Votre logique d'ajout au panier...
    
    // Affichage de l'alerte modale :
    showAlert("Succès", `${name} a été ajouté au panier (${price} DH).`);

    // OU affichage d'un toast discret :
    // showToast(`${name} ajouté au panier !`);
}


// LocalStorage helpers (clé unique 'cart')
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Boîte de dialogue Custom Alert
function showAlert(title, message) {
    var alertTitle = document.getElementById("alertTitle");
    var alertMessage = document.getElementById("alertMessage");
    var alertBox = document.getElementById("customAlert");

    if (alertBox && alertTitle && alertMessage) {
        alertTitle.textContent = title;
        alertMessage.textContent = message;
        alertBox.classList.add("active");
    } else {
        alert(title + ": " + message);
    }
}

function closeAlert() {
    var alertBox = document.getElementById("customAlert");
    if (alertBox) {
        alertBox.classList.remove("active");
    }
}

// Ajouter un produit au panier
function addToCart(name, price, image) {
    let cart = getCart();
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart(cart);
    showAlert("Succès", `${name} a été ajouté au panier avec succès !`);
}

// Afficher les éléments du panier
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalElement) return;

    let cart = getCart();
    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="6" style="text-align:center;">Votre panier est actuellement vide.</td></tr>';
        cartTotalElement.innerText = '0.00';
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img width="60" src="${item.image}" alt="${item.name}"></td>
            <td><strong style="font-size: 12px;">${item.name}</strong></td>
            <td style="font-size: 12px;">${item.price.toFixed(2)} DH</td>
            <td>
                <button onclick="updateQuantity(${index}, 1)">+</button><br>
                <span style="margin: 0; font-size: 12px;">${item.quantity}</span><br>
                <button onclick="updateQuantity(${index}, -1)">-</button>
            </td>
            <td><strong style="font-size: 12px;">${itemTotal.toFixed(2)} DH</strong></td>
            <td>
                <button onclick="removeFromCart(${index})" style="color:red; cursor:pointer; background:none; border:none; font-weight:bold;">X</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotalElement.innerText = grandTotal.toFixed(2);
}

// Modifier la quantité
function updateQuantity(index, change) {
    let cart = getCart();
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart(cart);
        renderCart();
    }
}

// Supprimer du panier
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// Menu Mobile Burger
function toggleMenu() {
    var mainNav = document.getElementById("mainNav");
    var burgerBtn = document.getElementById("burgerBtn");
    if (mainNav && burgerBtn) {
        mainNav.classList.toggle("open");
        burgerBtn.classList.toggle("open");
    }
}

// Initialisation au chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
    // Newsletter Footer
    var newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var emailInput = document.getElementById("email_footer");
            var emailValue = emailInput ? emailInput.value.trim() : "";

            if (emailValue === "") {
                showAlert("Erreur", "Veuillez entrer votre adresse email !");
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                showAlert("Erreur", "L'adresse email saisie est invalide !");
                return;
            }

            showAlert("Abonnement réussi !", "Merci de vous être abonné à la newsletter de l'Aigle Vert.");
            emailInput.value = "";
        });
    }

    // Affichage automatique du panier si le tableau existe dans la page
    renderCart();
});



document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Gestion du Formulaire de Contact ---
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Empêche le rechargement de la page

            var nom = document.getElementById("nom_prenom").value.trim();
            var email = document.getElementById("email").value.trim();
            var sujet = document.getElementById("Sujet").value.trim();
            var message = document.getElementById("message").value.trim();

            // Validation : Check if fields are empty
            if (nom === "" || email === "" || sujet === "" || message === "") {
                showAlert("Erreur", "3affak 3amar ga3 l-champs (champs obligatoires) !");
                return;
            }

            // Validation Email
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert("Erreur", "L-adresse email li dkhalti machi sahiha !");
                return;
            }

            // Affichage de l'Alert Designer
            showAlert("Message Envoyé !", `Merci ${nom}, votre message a été envoyé avec succès. Nos équipes vous répondront dans les plus brefs délais.`);

            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }

    // --- 2. Newsletter Footer ---
    var newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var emailInput = document.getElementById("email_footer");
            var emailValue = emailInput ? emailInput.value.trim() : "";

            if (emailValue === "") {
                showAlert("Erreur", "3affak dkhl l-adresse email dyalak !");
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                showAlert("Erreur", "L-email li dkhalti machi sahih !");
                return;
            }

            showAlert("Abonnement réussi !", "Merci de vous être abonné à la newsletter de l'Aigle Vert.");
            emailInput.value = "";
        });
    }

    // Affichage automatique du panier si la fonction existe
    if (typeof renderCart === "function") {
        renderCart();
    }
});


// Fonction pour afficher l'alerte sur mesure
function showAlert(title, message) {
    var alertModal = document.getElementById("customAlert");
    var alertTitle = document.getElementById("alertTitle");
    var alertMessage = document.getElementById("alertMessage");

    if (alertModal && alertTitle && alertMessage) {
        alertTitle.innerText = title;
        alertMessage.innerText = message;
        alertModal.classList.add("active");
    }
}

// Fonction pour fermer l'alerte
function closeAlert() {
    var alertModal = document.getElementById("customAlert");
    if (alertModal) {
        alertModal.classList.remove("active");
    }
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {

    // Gestion de la Newsletter dans le footer
    var newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Empêche le rechargement de la page

            var emailInput = document.getElementById("email_footer");
            var emailValue = emailInput ? emailInput.value.trim() : "";

            // Affichage du pop-up personnalisé
            showAlert("Abonnement réussi !", "Merci de vous être abonné à la newsletter de l'Aigle Vert.");

            // Vider le champ d'entrée
            emailInput.value = "";
        });
    }

});


// Fonction bach tkhrej / tdkhl sidebar f Mobile
function toggleAside() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("active");
    }
}