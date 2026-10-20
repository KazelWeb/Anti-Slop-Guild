const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.querySelectorAll('.nav-links li').forEach(li => {
                li.style.animation = '';
            });
        }
    });
});

// Reveal elements on scroll
const reveal = () => {
    const reveals = document.querySelectorAll('.project-card, .about-container');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].style.opacity = '1';
            reveals[i].style.transform = 'translateY(0)';
        }
    }
}

// Set initial state for reveal elements
document.addEventListener("DOMContentLoaded", () => {
    // Load projects first
    loadProjects();

    const reveals = document.querySelectorAll('.project-card, .about-container');
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
    });

    // Check once on load
    reveal();
});

window.addEventListener('scroll', reveal);

// Initialize
navSlide();


// Video Slideshow Logic
const bgVideos = [
    "SlideshowVids/crimson-butterfly-nightfall.3840x2160.mp4",
    "SlideshowVids/live2.mp4",
    "SlideshowVids/live6.mp4",
    "SlideshowVids/nelliel.3840x2160.mp4",
    "SlideshowVids/timekeeper-kurumi-tokisaki.3840x2160.mp4"
];

let currentVideoIndex = 0;
const videoElement = document.getElementById("hero-video");
const overlayElement = document.getElementById("video-overlay");

function playNextVideo() {
    // Fade to black
    overlayElement.classList.add("active");

    setTimeout(() => {
        // Change video source while black
        currentVideoIndex = (currentVideoIndex + 1) % bgVideos.length;
        videoElement.src = bgVideos[currentVideoIndex];
        videoElement.play();

        // Fade back in
        setTimeout(() => {
            overlayElement.classList.remove("active");
        }, 200); // Small delay to ensure video has started rendering
    }, 1500); // Matches the CSS transition duration
}

document.addEventListener("DOMContentLoaded", () => {
    if(videoElement) {
        // Set initial video
        videoElement.src = bgVideos[0];

        // When the video is nearing the end, start the transition
        videoElement.addEventListener("timeupdate", () => {
            if (videoElement.duration - videoElement.currentTime < 1.6) {
                // Only trigger once per video play
                if(!overlayElement.classList.contains("active")){
                    playNextVideo();
                }
            }
        });
    }

    // Initialize Luau code snippets
    initializeLuauCode();
});

// Luau Code Snippets
const luauSnippets = [
    "local Players = game:GetService('Players')\nlocal player = Players.LocalPlayer\nlocal character = player.Character",
    "function createPart(parent, size, color)\n  local part = Instance.new('Part')\n  part.Size = size\n  part.Color = Color3.fromRGB(color.r, color.g, color.b)\n  part.Parent = parent\n  return part\nend",
    "local humanoidRootPart = character:WaitForChild('HumanoidRootPart')\nlocal humanoid = character:WaitForChild('Humanoid')",
    "local DataStore = game:GetService('DataStoreService')\nlocal playerData = DataStore:GetDataStore('PlayerStats')\nlocal value = playerData:GetAsync(player.UserId)",
    "humanoid.Died:Connect(function()\n  print(player.Name .. ' has died!')\n  character:Destroy()\nend)",
    "local Remote = game.ReplicatedStorage:WaitForChild('RemoteEvent')\nRemote:FireServer('action', data)",
    "for i = 1, 100 do\n  print('Count: ' .. i)\n  task.wait(0.1)\nend",
    "local connection\nconnection = game.Debris:Connect(function()\n  print('Debris is being removed')\nend)",
    "local folder = Instance.new('Folder')\nfolder.Name = 'Container'\nfolder.Parent = workspace",
    "game:GetService('RunService').Heartbeat:Connect(function(deltaTime)\n  -- Frame update logic here\nend)",
    "local function GetPlayers()\n  return game:GetService('Players'):GetPlayers()\nend",
    "local tween = game:GetService('TweenService')\nlocal tweenInfo = TweenInfo.new(1, Enum.EasingStyle.Quad)\nlocal tween = tween:Create(part, tweenInfo, {Position = Vector3.new(0, 10, 0)})\ntween:Play()",
    "if humanoid.Health <= 0 then\n  print(player.Name .. ' is dead')\nelse\n  print(player.Name .. ' is alive')\nend",
    "local success, error = pcall(function()\n  -- Try to execute code\nend)\nif not success then print('Error: ' .. error) end",
    "local signal = Instance.new('BindableEvent')\nsignal:Fire('eventData')\nsignal.Event:Connect(function(data) end)",
    "local config = {\n  maxPlayers = 10,\n  gameTime = 300,\n  difficulty = 'Hard'\n}\nprint(config.maxPlayers)"
];

function initializeLuauCode() {
    const codeContent = document.getElementById('codeContent');
    if (!codeContent) return;

    let codeHTML = '';

    // Create multiple iterations for seamless scrolling
    for (let i = 0; i < 3; i++) {
        luauSnippets.forEach((snippet, index) => {
            codeHTML += `<div class="code-snippet">${snippet}</div>\n`;
        });
    }

    codeContent.innerHTML = codeHTML;
}

// Video Modal Functions
function playVideo(videoSrc) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    video.src = videoSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    modal.style.display = 'none';
    video.pause();
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the video
window.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeVideo();
    }
});

// Close modal with Escape key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideo();
    }
});

// Load and render projects dynamically
// Reads from the global `videos` array defined in videos.js
function loadProjects() {
    try {
        if (typeof videos === 'undefined') {
            throw new Error('videos.js not loaded or videos array missing');
        }

        const projectGrid = document.getElementById('projectGrid');
        if (!projectGrid) {
            console.error('projectGrid element not found');
            return;
        }

        projectGrid.innerHTML = '';

        videos.forEach(video => {
            // Bump "version" in videos.js after replacing a project's video
            const mediaVersion = video.version ? `?v=${video.version}` : '';
            const videoPath = `${video.folder}/Video.mp4${mediaVersion}`;
            // The card preview shows the video's first frame
            // (set "previewTime" in videos.js to skip a black intro)
            const previewPath = `${videoPath}#t=${video.previewTime || 0.1}`;

            const robloxBtn = video.link
                ? `<a href="${video.link}" target="_blank" rel="noopener" class="roblox-link-btn" title="Play on Roblox" onclick="event.stopPropagation();">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.44 0L0 19.56 19.56 24 24 4.44 4.44 0zm8.57 8.57l6.42 1.72-1.72 6.42-6.42-1.72 1.72-6.42z"/></svg>
                   </a>`
                : '';

            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-image">
                    <video src="${previewPath}" preload="metadata" muted playsinline aria-label="${video.title} preview"></video>
                    <div class="overlay">
                        <a href="#" class="play-btn" onclick="playVideo('${videoPath}'); return false;">Play Game <i class="fas fa-play"></i></a>
                    </div>
                </div>
                <div class="project-info">
                    <div class="project-title-row">
                        <h3>${video.title}</h3>
                        ${robloxBtn}
                    </div>
                    <p>${video.description}</p>
                    <div class="project-details">
                        <div class="detail-item">
                            <span class="detail-label">Genre</span>
                            <span class="detail-value">${video.genre}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Subgenre</span>
                            <span class="detail-value">${video.subgenre}</span>
                        </div>
                    </div>
                </div>
            `;
            projectGrid.appendChild(projectCard);
        });

        // Coming Soon placeholder card
        const comingSoonCard = document.createElement('div');
        comingSoonCard.className = 'project-card coming-soon-card';
        comingSoonCard.innerHTML = `
            <div class="coming-soon-icon"><i class="fas fa-plus"></i></div>
            <h3>More Coming Soon</h3>
            <p>New projects are in the works. Stay tuned!</p>
        `;
        projectGrid.appendChild(comingSoonCard);
    } catch (error) {
        console.error('Error loading projects:', error);
        const projectGrid = document.getElementById('projectGrid');
        if (projectGrid) {
            projectGrid.innerHTML = '<p style="color: red; text-align: center;">Error loading projects. Check browser console.</p>';
        }
    }
}
