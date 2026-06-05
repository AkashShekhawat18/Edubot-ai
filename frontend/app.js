// Smooth Scroll Buttons

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute('href')
        );

        if(target){
            target.scrollIntoView({
                behavior:'smooth'
            });
        }
    });
});

// Custom Cursor

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

    if(cursor){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

});

// Navbar Glow on Scroll

window.addEventListener("scroll",()=>{

    const nav = document.querySelector(".navbar");

    if(window.scrollY > 50){

        nav.style.background =
        "rgba(5,8,22,0.85)";

        nav.style.backdropFilter =
        "blur(20px)";

    }else{

        nav.style.background =
        "rgba(255,255,255,.03)";
    }

});

// Reveal Animation

const revealElements =
document.querySelectorAll(
".feature-card,.dashboard-card,.stat-card"
);

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform=
            "translateY(0px)";
        }

    });

},{
    threshold:0.2
});

revealElements.forEach(el=>{

    el.style.opacity="0";
    el.style.transform=
    "translateY(50px)";
    el.style.transition=
    "all .8s ease";

    observer.observe(el);

});

// Animated Counters

const counters =
document.querySelectorAll(".stat-card h2");

const runCounter = (counter)=>{

    const text =
    counter.innerText;

    const value =
    parseInt(text);

    let count = 0;

    const speed = value / 80;

    const update = ()=>{

        count += speed;

        if(count < value){

            counter.innerText =
            Math.floor(count) +
            text.replace(/[0-9]/g,'');

            requestAnimationFrame(update);

        }else{

            counter.innerText = text;
        }
    };

    update();
};

const counterObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter =
            entry.target.querySelector("h2");

            if(counter &&
            !counter.classList.contains("done")){

                runCounter(counter);

                counter.classList.add("done");
            }
        }

    });

},{
    threshold:.5
});

document.querySelectorAll(".stat-card")
.forEach(card=>{

    counterObserver.observe(card);

});

// Magnetic Buttons

document.querySelectorAll(
".primary-btn,.secondary-btn,.nav-btn"
).forEach(btn=>{

    btn.addEventListener("mousemove",(e)=>{

        const rect =
        btn.getBoundingClientRect();

        const x =
        e.clientX - rect.left -
        rect.width / 2;

        const y =
        e.clientY - rect.top -
        rect.height / 2;

        btn.style.transform =
        `translate(${x*0.15}px,
        ${y*0.15}px)`;
    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform =
        "translate(0px,0px)";
    });

});

// Launch Platform Button

const launchBtn =
document.querySelector(".primary-btn");

if(launchBtn){

launchBtn.addEventListener("click",()=>{

document.querySelector("#features")
.scrollIntoView({
behavior:"smooth"
});

});

}

// Demo Button

const demoBtn =
document.querySelector(".secondary-btn");

if(demoBtn){

demoBtn.addEventListener("click",()=>{

alert(
"CampusMind AI Demo\n\nStudent Dashboard\nTeacher Dashboard\nAI Tutor\nQuestion Generator"
);

});

}

// Floating Cards

document.querySelectorAll(
".feature-card,.dashboard-card"
).forEach((card,index)=>{

    card.style.animation =
    `floatCard 4s ease-in-out ${index*0.2}s infinite`;
});

const style =
document.createElement("style");

style.innerHTML = `

@keyframes floatCard{

0%{
transform:translateY(0px);
}

50%{
transform:translateY(-8px);
}

100%{
transform:translateY(0px);
}

}

`;

document.head.appendChild(style);

console.log(
"🚀 CampusMind Premium Loaded"
);