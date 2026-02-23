// Canvas Background
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

class Particle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() - 0.5) * 0.5; // بطيء
        this.speedY = (Math.random() - 0.5) * 0.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x<0||this.x>canvas.width) this.speedX*=-1;
        if(this.y<0||this.y>canvas.height) this.speedY*=-1;
    }
    draw(){
        ctx.fillStyle = "#00f7ff";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function init(){
    particles = [];
    for(let i=0;i<100;i++){
        particles.push(new Particle());
    }
}

function connect(){
    for(let a=0;a<particles.length;a++){
        for(let b=a;b<particles.length;b++){
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = dx*dx + dy*dy;
            if(dist<12000){
                ctx.strokeStyle="rgba(0,247,255,0.1)";
                ctx.beginPath();
                ctx.moveTo(particles[a].x,particles[a].y);
                ctx.lineTo(particles[b].x,particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{p.update();p.draw();});
    connect();
    requestAnimationFrame(animateCanvas);
}

init();
animateCanvas();

// AI Icons Rotation
const aiIcons = document.querySelectorAll(".ai-icons span");
const img = document.querySelector(".hero-image img");
const radius = 160;
let angleOffset = 0;

function animateIcons(){
    const centerX = img.offsetWidth / 2;
    const centerY = img.offsetHeight / 2;
    aiIcons.forEach((icon,i)=>{
        const angle = angleOffset + (i * (Math.PI*2 / aiIcons.length));
        const x = centerX + radius * Math.cos(angle) - icon.offsetWidth/2;
        const y = centerY + radius * Math.sin(angle) - icon.offsetHeight/2;
        icon.style.transform = `translate(${x}px, ${y}px)`;
    });
    angleOffset += 0.002;
    requestAnimationFrame(animateIcons);
}
animateIcons();

// Project Card Click
const cards = document.querySelectorAll(".card");
cards.forEach(card=>{
    const detail = document.createElement("div");
    detail.className = "project-detail";
    detail.innerHTML = "تفاصيل المشروع هنا. يمكنك إضافة أي وصف أو روابط.";
    card.appendChild(detail);

    card.addEventListener("click", ()=>{
        const isVisible = detail.style.display==="block";
        document.querySelectorAll(".project-detail").forEach(d=>d.style.display="none");
        detail.style.display = isVisible ? "none" : "block";
    });
});
