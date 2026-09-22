(function ($) {
    'use strict';
    // Navbar Menu JS
    $('.scroll-btn').on('click', function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 65
        }, 1000);
        e.preventDefault();
    });

    // AOS Animation
    AOS.init();

    //TESTIMONIAL SLIDER
    var owl = $(".quote-carousel");
    owl.owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        autoplay: true,
        items: 1,
    });

    // Sidemenu js
    $("a.menu-btn").click(function () {
        $(".side-menu").addClass('intro');
    });

    $("a.CloseBtn").click(function () {
        $(".side-menu").removeClass('intro');
    });

    $(".menu-item-has-children").click(function () {
        $(this).toggleClass('current');
    });




})(jQuery);

document.addEventListener('DOMContentLoaded', function () {

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 900;
        const frameRate = 30;
        const totalFrames = Math.round(duration / (1000 / frameRate));
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.round(target * progress);
            el.textContent = currentValue + suffix;

            if (frame === totalFrames) {
                clearInterval(counter);
                el.textContent = target + suffix;
            }
        }, 1000 / frameRate);
    }

    const statsSection = document.querySelector('.stats');

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.stat-number').forEach(el => {
                        el.textContent = '0';
                        animateCounter(el);
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    } else {
        console.log('Stats section not found — check class name!');
    }

});


document.addEventListener('DOMContentLoaded', function () {
    const priceSlider = document.getElementById('priceSlider');
    const priceValue = document.getElementById('priceValue');

    if (priceSlider && priceValue) {
        priceSlider.addEventListener('input', function () {
            const value = parseInt(this.value).toLocaleString('en-IN');
            priceValue.textContent = value;
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".tab-btn");
    const panes = document.querySelectorAll(".tab-pane");

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            // Remove active from all buttons
            tabs.forEach(btn => {
                btn.classList.remove("active");
            });

            // Remove active from all content
            panes.forEach(pane => {
                pane.classList.remove("active");
            });

            // Activate clicked button
            this.classList.add("active");

            // Show matching content
            const target = this.getAttribute("data-tab");

            document.getElementById(target).classList.add("active");

        });

    });

});


document.addEventListener('DOMContentLoaded', function () {
    const FREE_SHIPPING_THRESHOLD = 1500; // is amount ke upar free shipping
    const cartTotal = 1750; // ye value tumhare actual cart total se aani chahiye

    const progressFill = document.getElementById('progressFill');
    const shippingMsg = document.getElementById('shippingMsg');

    if (progressFill && shippingMsg) {
        if (cartTotal >= FREE_SHIPPING_THRESHOLD) {
            progressFill.style.width = '100%';
            shippingMsg.innerHTML = '🎉 You\'ve unlocked <span class="highlight">FREE Shipping!</span>';
        } else {
            const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;
            const percent = (cartTotal / FREE_SHIPPING_THRESHOLD) * 100;
            progressFill.style.width = percent + '%';
            shippingMsg.innerHTML = `Add <span class="highlight">₹${remaining}</span> more for FREE Shipping!`;
        }
    }
});


/* ================================
CART - LIVE CART SYSTEM
================================ */

document.addEventListener("DOMContentLoaded", function () {

    const cartSection = document.querySelector(".cart-section");

    if (!cartSection) return;

    const GST_RATE = 18;

    /* -------------------------------
        GET CART ITEMS
    ------------------------------- */

    function getCartItems() {
        return [...document.querySelectorAll(".cart-item")];
    }


    /* -------------------------------
        FORMAT PRICE
    ------------------------------- */

    function formatPrice(value) {
        return "₹" + value.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }


    /* -------------------------------
        UPDATE CART
    ------------------------------- */

    function updateCart() {

        const items = getCartItems();

        let subtotal = 0;
        let originalTotal = 0;
        let totalQuantity = 0;

        items.forEach(item => {

            const qtyElement = item.querySelector(".qty-val");
            const priceElement = item.querySelector(".cart-price-current");
            const oldPriceElement = item.querySelector(".cart-price-old");

            if (!qtyElement || !priceElement) return;

            const quantity = parseInt(qtyElement.textContent) || 0;

            const unitPrice =
                parseFloat(priceElement.dataset.unitPrice) || 0;

            const oldPrice =
                oldPriceElement
                    ? parseFloat(
                        oldPriceElement.textContent
                            .replace(/[₹,\s]/g, "")
                    ) || unitPrice
                    : unitPrice;


            /* Current subtotal */
            subtotal += unitPrice * quantity;

            /* Original price */
            originalTotal += oldPrice * quantity;

            totalQuantity += quantity;


            /* Update item price */
            priceElement.textContent =
                formatPrice(unitPrice * quantity);


            /* Update discount percentage */
            const discountTag =
                item.querySelector(".cart-discount-tag");

            if (discountTag && oldPrice > unitPrice) {

                const discountPercent =
                    Math.round(
                        ((oldPrice - unitPrice) / oldPrice) * 100
                    );

                discountTag.textContent =
                    discountPercent + "% OFF";
            }

        });


        /* -------------------------------
            TOTAL DISCOUNT
        ------------------------------- */

        const discount = Math.max(
            0,
            originalTotal - subtotal
        );


        /* -------------------------------
            GST
        ------------------------------- */

        const gst = subtotal * (GST_RATE / 100);


        /* -------------------------------
            FINAL TOTAL
        ------------------------------- */

        const total = subtotal + gst - discount;


        /* -------------------------------
            UPDATE SUMMARY
        ------------------------------- */

        const summaryRows =
            document.querySelectorAll(".summary-row");

        if (summaryRows.length >= 4) {

            /* Subtotal */
            const subtotalValue =
                summaryRows[0].querySelector(".summary-val");

            if (subtotalValue) {
                subtotalValue.textContent =
                    formatPrice(subtotal);
            }


            /* Discount */
            const discountValue =
                summaryRows[1].querySelector(".summary-val");

            if (discountValue) {

                discountValue.textContent =
                    "−" + formatPrice(discount).replace("₹", "₹");

            }


            /* Delivery */
            const deliveryValue =
                summaryRows[2].querySelector(".summary-val");

            if (deliveryValue) {
                deliveryValue.textContent = "Free";
            }


            /* GST */
            const gstValue =
                summaryRows[3].querySelector(".summary-val");

            if (gstValue) {
                gstValue.textContent =
                    formatPrice(gst);
            }
        }


        /* -------------------------------
            UPDATE TOTAL
        ------------------------------- */

        const totalElement =
            document.querySelector(".summary-total-val");

        if (totalElement) {
            totalElement.textContent =
                formatPrice(total);
        }


        /* -------------------------------
            UPDATE SAVINGS
        ------------------------------- */

        const savingsTag =
            document.querySelector(".savings-tag");

        if (savingsTag) {

            savingsTag.innerHTML =
                `🎉 You're saving <strong>${formatPrice(discount)}</strong> on this order!`;
        }


        /* -------------------------------
            UPDATE ITEM COUNTS
        ------------------------------- */

        const itemsCount =
            document.querySelector(".items-count");

        if (itemsCount) {
            itemsCount.textContent =
                `(${totalQuantity})`;
        }


        /* Header cart count */
        const cartIcon =
            document.querySelector(".nav-icons .nav-icon-btn:nth-child(2) .icon-count");

        if (cartIcon) {
            cartIcon.textContent = totalQuantity;
        }


        /* Hero text */
        const heroText =
            document.querySelector(".cart-hero-inner p");

        if (heroText) {

            if (totalQuantity === 0) {
                heroText.textContent =
                    "Your cart is empty";
            } else {
                heroText.textContent =
                    `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"} · Ready to checkout`;
            }
        }


        /* Order Items heading */
        const orderHeading =
            document.querySelector(".cart-items-header h3");

        if (orderHeading) {

            orderHeading.innerHTML =
                `Order Items <span class="items-count">(${totalQuantity})</span>`;
        }


        /* Empty cart */
        showEmptyCart(items.length === 0);

    }


    /* -------------------------------
        QUANTITY BUTTONS
    ------------------------------- */

    cartSection.addEventListener("click", function (e) {

        const button =
            e.target.closest(".qty-btn");

        if (!button) return;

        const cartItem =
            button.closest(".cart-item");

        if (!cartItem) return;

        const qtyElement =
            cartItem.querySelector(".qty-val");

        if (!qtyElement) return;

        let quantity =
            parseInt(qtyElement.textContent) || 1;


        /* PLUS */
        if (button.textContent.trim() === "+") {

            quantity++;

        }


        /* MINUS */
        if (button.textContent.trim() === "−" ||
            button.textContent.trim() === "-") {

            quantity--;

        }


        /* Minimum quantity */
        if (quantity < 1) {
            quantity = 1;
        }


        qtyElement.textContent = quantity;

        updateCart();

    });


    /* -------------------------------
        DELETE ITEM
    ------------------------------- */

    cartSection.addEventListener("click", function (e) {

        const deleteButton =
            e.target.closest(".cart-item-delete");

        if (!deleteButton) return;

        e.preventDefault();

        const cartItem =
            deleteButton.closest(".cart-item");

        if (!cartItem) return;

        cartItem.style.opacity = "0";
        cartItem.style.transform = "translateX(20px)";
        cartItem.style.transition = "all 0.25s ease";


        setTimeout(() => {

            cartItem.remove();

            updateCart();

        }, 250);

    });


    /* -------------------------------
        CLEAR ALL
    ------------------------------- */

    const clearButton =
        document.querySelector(".clear-all-btn");

    if (clearButton) {

        clearButton.addEventListener("click", function (e) {

            e.preventDefault();

            const items =
                getCartItems();

            if (items.length === 0) return;


            if (!confirm("Are you sure you want to clear your cart?")) {
                return;
            }


            items.forEach(item => {

                item.style.opacity = "0";
                item.style.transform = "translateX(20px)";
                item.style.transition = "all 0.25s ease";

            });


            setTimeout(() => {

                items.forEach(item => item.remove());

                updateCart();

            }, 250);

        });

    }


    /* -------------------------------
        COUPON SYSTEM
    ------------------------------- */

    const couponInput =
        document.querySelector(".coupon-box input");

    const couponButton =
        document.querySelector(".apply-coupon-btn");


    if (couponButton && couponInput) {

        couponButton.addEventListener("click", function () {

            const coupon =
                couponInput.value.trim().toUpperCase();


            if (!coupon) {

                alert("Please enter a coupon code.");
                return;

            }


            /*
                Demo coupon codes
            */

            const validCoupons = {
                "SAVE10": 10,
                "TAPE10": 10,
                "WELCOME10": 10
            };


            if (validCoupons[coupon]) {

                couponButton.textContent = "Applied ✓";
                couponButton.style.background = "#4caf50";
                couponButton.style.color = "#fff";

                couponInput.disabled = true;

                applyCoupon(validCoupons[coupon]);

            } else {

                alert("Invalid coupon code.");

            }

        });

    }


    let couponDiscount = 0;


    function applyCoupon(percent) {

        couponDiscount = percent;

        calculateWithCoupon();

    }


    function calculateWithCoupon() {

        const items = getCartItems();

        let subtotal = 0;
        let originalTotal = 0;
        let totalQuantity = 0;


        items.forEach(item => {

            const qty =
                parseInt(
                    item.querySelector(".qty-val")?.textContent
                ) || 0;

            const price =
                parseFloat(
                    item.querySelector(".cart-price-current")
                        ?.dataset.unitPrice
                ) || 0;

            const oldPrice =
                parseFloat(
                    item.querySelector(".cart-price-old")
                        ?.textContent
                        .replace(/[₹,\s]/g, "")
                ) || price;


            subtotal += price * qty;

            originalTotal += oldPrice * qty;

            totalQuantity += qty;

        });


        const productDiscount =
            Math.max(0, originalTotal - subtotal);


        const couponAmount =
            subtotal * (couponDiscount / 100);


        const gst =
            subtotal * (GST_RATE / 100);


        const totalDiscount =
            productDiscount + couponAmount;


        const finalTotal =
            subtotal + gst - totalDiscount;


        const summaryRows =
            document.querySelectorAll(".summary-row");


        if (summaryRows[1]) {

            summaryRows[1]
                .querySelector(".summary-val")
                .textContent =
                "−" + formatPrice(totalDiscount);

        }


        const totalElement =
            document.querySelector(".summary-total-val");

        if (totalElement) {

            totalElement.textContent =
                formatPrice(Math.max(0, finalTotal));

        }


        const savingsTag =
            document.querySelector(".savings-tag");

        if (savingsTag) {

            savingsTag.innerHTML =
                `🎉 You're saving <strong>${formatPrice(totalDiscount)}</strong> on this order!`;

        }

    }


    /* -------------------------------
        EMPTY CART
    ------------------------------- */

    function showEmptyCart(isEmpty) {

        const couponBox =
            document.querySelector(".coupon-box");

        const clearButton =
            document.querySelector(".clear-all-btn");

        const checkoutButton =
            document.querySelector(".checkout-btn");


        if (isEmpty) {

            if (couponBox)
                couponBox.style.display = "none";

            if (clearButton)
                clearButton.style.display = "none";

            if (checkoutButton) {

                checkoutButton.disabled = true;
                checkoutButton.style.opacity = "0.5";
                checkoutButton.style.cursor = "not-allowed";

            }

        } else {

            if (couponBox)
                couponBox.style.display = "flex";

            if (clearButton)
                clearButton.style.display = "inline-block";

            if (checkoutButton) {

                checkoutButton.disabled = false;
                checkoutButton.style.opacity = "1";
                checkoutButton.style.cursor = "pointer";

            }

        }

    }


    /* -------------------------------
        CHECKOUT
    ------------------------------- */

    const checkoutButton =
        document.querySelector(".checkout-btn");

    if (checkoutButton) {

        checkoutButton.addEventListener("click", function () {

            const items =
                getCartItems();

            if (items.length === 0) {

                alert("Your cart is empty.");
                return;

            }


            /* 
                Yahan future me checkout.html
                redirect kar sakte ho.
            */

            alert("Proceeding to checkout...");

        });

    }


    /* -------------------------------
        INITIAL LOAD
    ------------------------------- */

    updateCart();

});

document.addEventListener("DOMContentLoaded", function () {

    const quantity = document.querySelector(".quantity");

    if (!quantity) return;

    const buttons = quantity.querySelectorAll("button");
    const number = quantity.querySelector("span");

    let count = 1;

    // Minus button
    buttons[0].addEventListener("click", function () {
        if (count > 1) {
            count--;
            number.textContent = count;
        }
    });

    // Plus button
    buttons[1].addEventListener("click", function () {
        count++;
        number.textContent = count;
    });

});

