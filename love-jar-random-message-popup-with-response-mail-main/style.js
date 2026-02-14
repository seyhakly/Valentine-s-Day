 // Data Arrays - Replace with your own content!
        const compliments = [
            "You light up every room you walk into.",
            "Your smile is my favorite thing in the world.",
            "I love the way you think.",
            "You are incredibly kind and generous.",
            "Being with you makes everything better.",
            "You inspire me to be a better person.",
            "You have the most beautiful soul.",
            "I love your laugh!"
        ];

        const jokes = [
            "Remember that time we tried to cook? Yeah, let's order pizza forever.",
            "Inside Joke #404: Explanation not found.",
            "You: *Sneezes* \nMe: 'Is that a yes?'",
            "Us trying to navigate: 'Turn left!' 'No, the other left!'",
            "That one movie we watched that made absolutely no sense...",
            "Why did we think we could finish that giant pizza? (Okay, we definitely could have)."
        ];

        const promises = [
            "I promise to always listen to you.",
            "I promise to support your dreams, no matter how big.",
            "I promise to be your biggest cheerleader.",
            "I promise to always share my fries with you.",
            "I promise to never go to bed angry.",
            "I promise to love you, even when you're hangry."
        ];

        const memories = [
            "Our first date... I was so nervous!",
            "The trip to the beach where it rained all day.",
            "That late night drive singing at the top of our lungs.",
            "The first time you said 'I love you'.",
            "Getting lost in the city and finding that amazing cafe.",
            "Watching the sunset together."
        ];

        // DOM Elements
        const jarContents = document.getElementById('jarContents');
        const loveJar = document.getElementById('loveJar');

        const noteModal = document.getElementById('noteModal');
        const proposalModal = document.getElementById('proposalModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalText = document.getElementById('modalText');
        const closeModal = document.querySelector('.close-modal');
        const categoryBtns = document.querySelectorAll('.category-btn');
        const proposalBtn = document.getElementById('proposalBtn');
        const noBtn = document.getElementById('noBtn');
        const yesBtn = document.getElementById('yesBtn');
        const celebrationOverlay = document.getElementById('celebrationOverlay');
        const closeCelebration = document.querySelector('.close-celebration');

        // --- 1. Fill Jar with Hearts ---
        function fillJar() {
            const colors = ['#ff6b6b', '#ff8e8e', '#e6c3d1', '#d6336c', '#ffb7b2'];
            const numberOfHearts = 35;

            for (let i = 0; i < numberOfHearts; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart-shape');

                // Randomize position, size, rotation, color, and delay
                const left = Math.random() * 70 + 10; // 10% to 80% width
                const top = Math.random() * 70 + 20;  // 20% to 90% height (keep away from lid)
                const scale = Math.random() * 0.5 + 0.5; // 0.5 to 1.0 scale
                const rotate = Math.random() * 360;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const animDelay = Math.random() * 2;

                heart.style.left = `${left}%`;
                heart.style.top = `${top}%`;
                heart.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
                heart.style.backgroundColor = color;
                heart.style.setProperty('--r', `${rotate}deg`); // Custom prop for keyframe
                heart.style.animationDelay = `${animDelay}s`;

                // For pseudo-elements color inheritance
                heart.style.color = color;

                // --- NEW: Make Hearts Clickable ---
                heart.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling if needed
                    // Pick a random category
                    const categories = ['compliments', 'jokes', 'promises', 'memories'];
                    const randomCat = categories[Math.floor(Math.random() * categories.length)];
                    animateNoteAndShow(randomCat);
                });

                jarContents.appendChild(heart);
            }
        }

        fillJar();

        // Helper to pick random item
        function getRandomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        // --- Fly-out Animation & Modal Trigger ---
        function animateNoteAndShow(category) {
            // 1. Create flying element
            const flier = document.createElement('div');
            flier.classList.add('flying-note');
            flier.innerHTML = '💌';

            // Get jar position
            const jarRect = loveJar.getBoundingClientRect();
            // Start from center of jar
            const startX = jarRect.left + jarRect.width / 2;
            const startY = jarRect.top + jarRect.height / 2;

            // Set initial position
            flier.style.left = `${startX}px`;
            flier.style.top = `${startY}px`;

            document.body.appendChild(flier);

            // 2. Animate to Center of Screen
            // We use setTimeout to ensure the initial position is rendered before transitioning
            requestAnimationFrame(() => {
                const endX = window.innerWidth / 2;
                const endY = window.innerHeight / 2;

                // Subtract half width/height of flier to center it perfectly
                flier.style.left = `${endX - 20}px`;
                flier.style.top = `${endY - 20}px`;
                flier.style.transform = `scale(5) rotate(720deg)`; // Spin and grow
                flier.style.opacity = '0';
            });

            // 3. On animation end -> Show Modal & Remove flier
            setTimeout(() => {
                flier.remove();
                showNote(category);
                triggerConfetti('puff');
            }, 800); // Matches CSS transition duration
        }

        function showNote(category) {
            let content = "";
            let title = "";
            let emoji = "";

            switch (category) {
                case 'compliments':
                    content = getRandomItem(compliments);
                    title = "A Compliment for You";
                    emoji = "💖";
                    break;
                case 'jokes':
                    content = getRandomItem(jokes);
                    title = "Remember this?";
                    emoji = "😂";
                    break;
                case 'promises':
                    content = getRandomItem(promises);
                    title = "My Promise";
                    emoji = "🤞";
                    break;
                case 'memories':
                    content = getRandomItem(memories);
                    title = "A Sweet Memory";
                    emoji = "📸";
                    break;
            }

            modalTitle.textContent = `${title} ${emoji}`;
            modalText.textContent = content;
            noteModal.classList.add('active');
        }

        // Event Listeners for Categories
        categoryBtns.forEach(btn => {
            if (btn.classList.contains('close-celebration')) return; // Skip the close button

            btn.addEventListener('click', (e) => {
                animateNoteAndShow(btn.dataset.category);
            });
        });

        // Close Modal logic
        closeModal.addEventListener('click', () => {
            noteModal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === noteModal) {
                noteModal.classList.remove('active');
            }
        });

        // Proposal Logic
        proposalBtn.addEventListener('click', () => {
            // Animate a ring flying out? Why not
            const flier = document.createElement('div');
            flier.classList.add('flying-note');
            flier.innerHTML = '💍';
            const jarRect = loveJar.getBoundingClientRect();
            flier.style.left = `${jarRect.left + jarRect.width / 2}px`;
            flier.style.top = `${jarRect.top + jarRect.height / 2}px`;
            document.body.appendChild(flier);

            requestAnimationFrame(() => {
                flier.style.left = `${window.innerWidth / 2 - 20}px`;
                flier.style.top = `${window.innerHeight / 2 - 20}px`;
                flier.style.transform = `scale(5)`;
                flier.style.opacity = '0';
            });

            setTimeout(() => {
                flier.remove();
                proposalModal.classList.add('active');
            }, 800);
        });

        // Evasive No Button
        noBtn.addEventListener('mouseover', () => {
            const x = Math.random() * (window.innerWidth - noBtn.offsetWidth) - (window.innerWidth / 2);
            const y = Math.random() * (window.innerHeight - noBtn.offsetHeight) - (window.innerHeight / 2);

            const moveX = Math.random() * 200 - 100; // Constrain it a bit so it doesn't leave the modality completely if possible
            const moveY = Math.random() * 200 - 100;

            noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        yesBtn.addEventListener('click', () => {
            // --- Send FormSubmit Email ---
            const email = "demo@gmail.com"; // <--- CHANGE THIS
            const formData = new FormData();
            formData.append("message", "YES! They said YES! 💍💖");
            formData.append("_captcha", "false");

            // We use fetch to send it in the background
            fetch(`https://formsubmit.co/ajax/${email}`, {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => console.log("Email sent successfully", data))
                .catch(error => console.error("Error sending email", error));

            // Proceed with celebration immediately
            proposalModal.classList.remove('active');
            celebrationOverlay.classList.remove('hidden');
            celebrationOverlay.classList.add('active');
            triggerConfetti('school-pride');
        });

        closeCelebration.addEventListener('click', () => {
            celebrationOverlay.classList.remove('active');
            celebrationOverlay.classList.add('hidden');
        });

        // Confetti Helper
        function triggerConfetti(type) {
            if (typeof confetti === 'function') {
                if (type === 'puff') {
                    confetti({
                        particleCount: 30,
                        spread: 50,
                        origin: { y: 0.6 }
                    });
                } else if (type === 'school-pride') {
                    const duration = 5 * 1000;
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 300 };

                    const randomInRange = (min, max) => Math.random() * (max - min) + min;

                    const interval = setInterval(function () {
                        const timeLeft = animationEnd - Date.now();

                        if (timeLeft <= 0) {
                            return clearInterval(interval);
                        }

                        const particleCount = 50 * (timeLeft / duration);

                        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                    }, 250);
                }
            }
        }