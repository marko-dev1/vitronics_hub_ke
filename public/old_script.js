 // Product Data
        const products = [
            {
                id: 1,
                name: "Original 120w Fast Charger",
                category: "Chargers",
                price: 1200,
                oldPrice: 1500,
                image: "/img/120w_Qc.jpg",
                badge: "Bestseller"
            },
            {
                id: 2,
                name: "Bluetooth Earphones with Mic & ANC",
                category: "Audio",
                price: 2500,
                oldPrice: 3500,
                image: "/img/TWS_earpods.PNG",
                badge: "Trending"
            },
            {
                id: 3,
                name: "Tempered Anti-privacy Screen Protector",
                category: "Screen Protectors",
                price: 500,
                oldPrice: 800,
                image: "/img/screen_protectors.PNG",
            },
            {
                id: 4,
                name: "Premium Phone Case",
                category: "Cases",
                price: 800,
                oldPrice: 1200,
                image: "/img/Black_case.jpg",
                badge: "New"
            },
              {
                id: 5,
                name: "Premium Phone Case",
                category: "Cases",
                price: 1000,
                oldPrice: 1200,
                image: "img/red_case.jpg",
                badge: "New"
            },
            {
                id: 6,
                name: "Power Bank 20,000mAh longer lasting",
                category: "Power Banks",
                price: 3500,
                oldPrice: 4500,
                image: "img/power_banks.PNG",
                badge: "New Arrival"
            },
            {
                id: 7,
                name: "Professional Headphones with Noise Cancellation",
                category: "Audio",
                price: 1800,
                oldPrice: 2500,
                image: "img/Professional_headphones.PNG",
                badge: "Hot Deal"
            },
            {
                id: 8,
                name: "Car Phone Holder with wireless charging",
                category: "Accessories",
                price: 1800,
                oldPrice: 2200,
                image: "img/car_phoneholder.PNG"
            },
            {
                id: 9,
                name: "USB-C Cable 2m",
                category: "Cables",
                price: 400,
                oldPrice: 600,
                image: "img/TC- cable.jpg",
            }
        ];
        
        // Today's Deals (subset of products with bigger discounts)
        const deals = products.slice(0, 4).map(product => ({
            ...product,
            price: Math.round(product.price * 0.8), // 20% off
            oldPrice: product.price
        }));
        
        // Shopping Cart
        let cart = [];
        
        // DOM Elements
        const productRow = document.getElementById('productRow');
        const dealsRow = document.getElementById('dealsRow');
        const cartModal = document.getElementById('cartModal');
        const cartIcon = document.getElementById('cartIcon');
        const closeModal = document.getElementById('closeModal');
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');
        const emptyCartMessage = document.getElementById('emptyCartMessage');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const paymentOptions = document.getElementById('paymentOptions');
        
        // Payment Elements
        const mpesaOption = document.getElementById('mpesaOption');
        const mpesaDetails = document.getElementById('mpesaDetails');
        const codOption = document.getElementById('codOption');
        const codDetails = document.getElementById('codDetails');
        const cardOption = document.getElementById('cardOption');
        const cardDetails = document.getElementById('cardDetails');
        
        // Payment Confirmation Buttons
        const confirmMpesa = document.getElementById('confirmMpesa');
        const confirmCOD = document.getElementById('confirmCOD');
        const confirmCard = document.getElementById('confirmCard');
        
        // Payment Feedback Elements
        const mpesaFeedback = document.getElementById('mpesaFeedback');
        const cardFeedback = document.getElementById('cardFeedback');
        
        // Carousel Elements
        const carousel = document.querySelector('.carousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        const slideCount = document.querySelectorAll('.carousel-slide').length;
        
        // Initialize the store
        function initStore() {
            renderProducts();
            renderDeals();
            setupEventListeners();
            updateCart();
            startCarousel();
        }
        
        // Carousel functionality
        function startCarousel() {
            // Auto-rotate slides every 5 seconds
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateCarousel();
            }, 5000);
            
            // Previous button
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateCarousel();
            });
            
            // Next button
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateCarousel();
            });
            
            // Indicators
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    currentSlide = parseInt(this.getAttribute('data-slide'));
                    updateCarousel();
                });
            });
        }
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Render products in horizontal row
        function renderProducts() {
            productRow.innerHTML = products.map(product => `
                <div class="product-card" data-id="${product.id}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3>${product.name}</h3>
                        <div class="price">Ksh ${product.price.toLocaleString()} ${product.oldPrice ? `<span class="old-price">Ksh ${product.oldPrice.toLocaleString()}</span>` : ''}</div>
                        <button class="btn add-to-cart" style="width: 100%; margin-top: 8px;">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Render deals in horizontal row
        function renderDeals() {
            dealsRow.innerHTML = deals.map(product => `
                <div class="product-card" data-id="${product.id}">
                    ${product.badge ? `<span class="product-badge">HOT DEAL</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3>${product.name}</h3>
                        <div class="price">Ksh ${product.price.toLocaleString()} <span class="old-price">Ksh ${product.oldPrice.toLocaleString()}</span></div>
                        <button class="btn add-to-cart" style="width: 100%; margin-top: 8px;">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Add to cart buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.closest('.product-card').getAttribute('data-id'));
                    addToCart(productId);
                });
            });
            
            // Cart icon click
            cartIcon.addEventListener('click', function(e) {
                e.preventDefault();
                cartModal.style.display = 'block';
            });
            
            // Close modal
            closeModal.addEventListener('click', function() {
                cartModal.style.display = 'none';
                resetPaymentOptions();
            });
            
            // Checkout button
            checkoutBtn.addEventListener('click', function() {
                if (cart.length > 0) {
                    paymentOptions.style.display = 'block';
                    checkoutBtn.style.display = 'none';
                }
            });
            
            // Payment method selection
            mpesaOption.addEventListener('click', function() {
                resetPaymentSelections();
                this.classList.add('selected');
                mpesaDetails.style.display = 'block';
            });
            
            codOption.addEventListener('click', function() {
                resetPaymentSelections();
                this.classList.add('selected');
                codDetails.style.display = 'block';
            });
            
            cardOption.addEventListener('click', function() {
                resetPaymentSelections();
                this.classList.add('selected');
                cardDetails.style.display = 'block';
            });
            
            // Payment confirmation buttons
            confirmMpesa.addEventListener('click', processMpesaPayment);
            confirmCOD.addEventListener('click', processCODPayment);
            confirmCard.addEventListener('click', processCardPayment);
            
            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === cartModal) {
                    cartModal.style.display = 'none';
                    resetPaymentOptions();
                }
            });
        }
        
        // Reset payment options
        function resetPaymentOptions() {
            paymentOptions.style.display = 'none';
            checkoutBtn.style.display = 'block';
            resetPaymentSelections();
        }
        
        // Reset payment selections
        function resetPaymentSelections() {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
            document.querySelectorAll('.payment-details').forEach(d => d.style.display = 'none');
            document.querySelectorAll('.payment-feedback').forEach(f => {
                f.style.display = 'none';
                f.innerHTML = '';
            });
        }
        
        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        ...product,
                        quantity: 1
                    });
                }
                
                updateCart();
                
                // Show cart modal
                cartModal.style.display = 'block';
            }
        }
        
        // Update cart UI
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart items
            if (cart.length > 0) {
                emptyCartMessage.style.display = 'none';
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">Ksh ${item.price.toLocaleString()}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease">-</button>
                                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                                <button class="quantity-btn increase">+</button>
                                <span class="remove-item"><i class="fas fa-trash"></i></span>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Add event listeners for quantity changes
                document.querySelectorAll('.decrease').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
                        const item = cart.find(item => item.id === productId);
                        
                        if (item.quantity > 1) {
                            item.quantity -= 1;
                            updateCart();
                        }
                    });
                });
                
                document.querySelectorAll('.increase').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
                        const item = cart.find(item => item.id === productId);
                        
                        item.quantity += 1;
                        updateCart();
                    });
                });
                
                document.querySelectorAll('.quantity-input').forEach(input => {
                    input.addEventListener('change', function() {
                        const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
                        const item = cart.find(item => item.id === productId);
                        const newQuantity = parseInt(this.value) || 1;
                        
                        item.quantity = newQuantity;
                        updateCart();
                    });
                });
                
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
                        cart = cart.filter(item => item.id !== productId);
                        updateCart();
                    });
                });
            } else {
                emptyCartMessage.style.display = 'block';
                cartItems.innerHTML = '';
                resetPaymentOptions();
            }
            
            // Update total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `Ksh ${total.toLocaleString()}`;
        }
        
        // Process M-Pesa Payment
        function processMpesaPayment() {
            const phone = document.getElementById('mpesaPhone').value;
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (!phone || phone.length < 12) {
                mpesaFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid M-Pesa phone number (e.g. 254712345678)';
                mpesaFeedback.className = 'payment-feedback payment-error';
                mpesaFeedback.style.display = 'block';
                return;
            }
            
            mpesaFeedback.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Initiating M-Pesa payment request...';
            mpesaFeedback.className = 'payment-feedback';
            mpesaFeedback.style.display = 'block';
            
            // Simulate M-Pesa STK Push (replace with actual API call)
            setTimeout(() => {
                // Simulate 80% success rate
                if (Math.random() > 0.2) {
                    mpesaFeedback.innerHTML = `
                        <i class="fas fa-check-circle"></i> M-Pesa payment request sent to ${phone}!
                        <p>Check your phone to complete payment of Ksh ${total.toLocaleString()}</p>
                    `;
                    mpesaFeedback.className = 'payment-feedback payment-success';
                    
                    // Simulate successful payment after 3 seconds
                    setTimeout(() => {
                        completeOrder('M-Pesa');
                    }, 3000);
                } else {
                    mpesaFeedback.innerHTML = '<i class="fas fa-times-circle"></i> Failed to initiate payment. Please try again.';
                    mpesaFeedback.className = 'payment-feedback payment-error';
                }
            }, 2000);
        }
        
        // Process Cash on Delivery
        function processCODPayment() {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (confirm(`Confirm Cash on Delivery order for Ksh ${total.toLocaleString()}?`)) {
                completeOrder('Cash on Delivery');
            }
        }
        
        // Process Card Payment
        function processCardPayment() {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCvv = document.getElementById('cardCvv').value;
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (!cardNumber || !cardExpiry || !cardCvv) {
                cardFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all card details';
                cardFeedback.className = 'payment-feedback payment-error';
                cardFeedback.style.display = 'block';
                return;
            }
            
            cardFeedback.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing card payment...';
            cardFeedback.className = 'payment-feedback';
            cardFeedback.style.display = 'block';
            
            // Simulate card payment processing (replace with actual API call)
            setTimeout(() => {
                // Simulate 80% success rate
                if (Math.random() > 0.2) {
                    cardFeedback.innerHTML = `
                        <i class="fas fa-check-circle"></i> Payment of Ksh ${total.toLocaleString()} successful!
                        <p>Your card ending with ${cardNumber.slice(-4)} has been charged.</p>
                    `;
                    cardFeedback.className = 'payment-feedback payment-success';
                    
                    // Complete order after showing success message
                    setTimeout(() => {
                        completeOrder('Card Payment');
                    }, 2000);
                } else {
                    cardFeedback.innerHTML = '<i class="fas fa-times-circle"></i> Payment failed. Please check your card details and try again.';
                    cardFeedback.className = 'payment-feedback payment-error';
                }
            }, 2000);
        }
        
        // Complete order after successful payment
        function completeOrder(paymentMethod) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // In a real implementation, you would send the order to your backend
            console.log(`Order completed via ${paymentMethod} for Ksh ${total}`);
            
            // Show confirmation
            alert(`Order confirmed!\n\nTotal: Ksh ${total.toLocaleString()}\nPayment Method: ${paymentMethod}\n\nThank you for shopping with us!`);
            
            // Reset cart and close modal
            cart = [];
            updateCart();
            cartModal.style.display = 'none';
            resetPaymentOptions();
        }
        
        // Initialize the store when DOM is loaded
        document.addEventListener('DOMContentLoaded', initStore);