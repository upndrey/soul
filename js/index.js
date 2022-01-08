document.addEventListener("DOMContentLoaded", main);
function main() {
    const popup = new Popup();
    popup.init();
    const nav = new Nav();
    nav.init();
    const header = new Header();
    header.init();
    const calc = new Calc("calc__canvas", "calc__process");
    calc.init();
    const details = new Details("details__canvas", "details__video");
    details.init();
    const trust = new Trust();
    trust.init();
    const unique = new Unique();
    unique.init();
    const author = new Details("author__canvas");
    author.init();
    const mission = new Mission("mission__canvasStatic", "mission__canvas");
    mission.init();
    const courses = new Courses();
    courses.init();
}

// Popup
function Popup() {
    this.activePopupDom = null;
    this.wrapperDom = document.getElementById("popup__wrapper");
    this.lidDom = document.getElementById("lid__popup");
    this.lidDoneDom = document.getElementById("lid__popup_done");
    this.buyDom = document.getElementById("buy__popup");
    this.loginDom = document.getElementById("login__popup");
    this.registrationDom = document.getElementById("registration__popup");
    this.step1Dom = document.getElementById("step1__popup");
    this.step2Dom = document.getElementById("step2__popup");
    this.step3Dom = document.getElementById("step3__popup");
}

Popup.prototype.init = function() {
    this.openPopupHandler("lidPopupLink", this.lidDom);
    this.openPopupHandler("lidDonePopupLink", this.lidDoneDom);
    this.openPopupHandler("buyPopupLink", this.buyDom);
    this.openPopupHandler("loginPopupLink1", this.loginDom);
    this.openPopupHandler("loginPopupLink2", this.loginDom);
    this.openPopupHandler("loginPopupLink3", this.loginDom);
    this.openPopupHandler("registrationPopupLink1", this.registrationDom);
    this.openPopupHandler("registrationPopupLink2", this.registrationDom);
    this.openPopupHandler("step1PopupLink", this.step1Dom);
    this.openPopupHandler("step2PopupLink", this.step2Dom);
    this.openPopupHandler("step3PopupLink", this.step3Dom);

    this.closePopupHandler();
};

Popup.prototype.openPopupHandler = function(linkId, popupDom) {
    const popupLinkDom = document.getElementById(linkId);
    popupLinkDom.addEventListener("click", (e) => {
        e.preventDefault();
        this.openPopup(popupDom);
    });
};

Popup.prototype.openPopup = function(popupDom) {
    if(this.activePopupDom) {
        this.activePopupDom.classList.remove("active");
    }
    this.activePopupDom = popupDom;
    this.wrapperDom.classList.add("active");
    this.activePopupDom.classList.add("active");
};

Popup.prototype.closePopupHandler = function() {
    document.querySelectorAll(".closePopup").forEach((closeDom) => {
        closeDom.addEventListener("click", this.closePopup.bind(this));
    });
};

Popup.prototype.closePopup = function() {
    this.activePopupDom.classList.remove("active");
    this.wrapperDom.classList.remove("active");
    this.activePopupDom = null;
};

// Nav
function Nav() {
    this.navWrapperDom = document.querySelector(".nav__wrapper");
}

Nav.prototype.init = function() {
    document.querySelector(".burger").addEventListener("click", () => {
        document.querySelector(".burger").classList.toggle("active");
        document.querySelector(".mobileNav__wrapper").classList.toggle("hidden");
    });
    if(window.scrollY > 200) {
        this.navWrapperDom.classList.add("scrolled");
    }
    document.addEventListener("scroll", (e) => {
        if(window.scrollY > 200) {
            this.navWrapperDom.classList.add("scrolled");
        }
        else {
            this.navWrapperDom.classList.remove("scrolled");
        }
    });
};

// Header
function Header() {
    this.mars = document.querySelector(".header__marsDynamic");
    this.centerX = 430;
    this.centerY = 375;
    this.radius = 250;
    this.angle = 700;
}

Header.prototype.init = function() {   
    setInterval(() => {
        var x = this.centerX + this.radius * Math.cos(this.angle);
        var y = this.centerY + this.radius * Math.sin(this.angle);
        // x = Math.round(x);
        // y = Math.round(y);
    
        this.mars.style.right = `${x}px`;
        this.mars.style.top = `${y}px`;

        this.angle -= Math.acos(1-Math.pow(3/this.radius,2)/2) / 2;
    }, 30);
};

// Calc
function Calc(canvasId = "canvas", buttonId = "someButton") {
    this.canvas = document.getElementById(canvasId);
    this.eventButton = document.getElementById(buttonId);
    this.ctx = this.canvas.getContext('2d');
    this.rotation = 0;
    this.gender = "Женский";
    this.layer1Params = null;
    this.layer1ParamsTemp = null;
    this.layer2Params = null;
    this.layer2ParamsTemp = null;
    this.layer3Params = null;
    this.layer3ParamsTemp = null;
    this.smallCircleParams = null;
    this.smallCircleParamsTemp = null;
}

Calc.prototype.init = function() {
        this.setLayer1Params({
            centerX: 100,
            centerY: -100,
            color: "#3f45a7",
            radius: 100,
        });
        this.setLayer2Params({
            centerX: 0,
            centerY: 0,
            colorR: 71,
            colorG: 127,
            colorB: 210,
            colorA: 1,
            gradient1: "#9abde3",
            gradient2: "#945dae",
            shade: true,
            radius: 250,
        });
        let list = [];
        for(let i = 0; i < 8; i++) {
            list.push(40);
        }
        this.setLayer3Params({
            centerX: 0,
            centerY: 0,
            color: "#ffffff55",
            count: 8,
            list: list,
            minRadiusX: 250,
            minRadiusY: 250,
            rotation: 0,
            radiusSizeX: 40,
            radiusSizeY: 40,
            moveSizeX: 0,
            moveSizeY: 0,
            lineWidth: 1,
        });
        this.setSmallCircleParams({
            c1x: 0,
            c1y: 0,
            c2x: 0,
            c2y: 0,
            c3x: 0,
            c3y: 0,
            colorR: 255,
            colorG: 255,
            colorB: 255,
            opacity: 0,
            radius: 10
        });
        this.setTemporaryParams();
        this.ctx.translate(490, 550);
        this.drawLayers();
        this.stampsInit();
        this.inputHandler();
        document.querySelectorAll(".calc__inputs>input[type=text]").forEach((inputDom) => {
            inputDom.addEventListener("click", (e) => {
                e.target.value = null;
            }, {once: true})
        });
        this.eventButton.addEventListener("click", this.transformLayers.bind(this, 50), {once: true});
};

Calc.prototype.inputHandler = function() {
    document.getElementById("sex").addEventListener("click", (e) => {
        if(e.target.value == "Мужской") {
        }
        else {

        }
        this.drawLayers();
    })
};

Calc.prototype.stampsInit = function() {
    const stamp1 = document.getElementById("stamp1");
    const stamp2 = document.getElementById("stamp2");
    const stamp3 = document.getElementById("stamp3");
    const stamp1link = document.getElementById("stamp1link");
    const stamp2link = document.getElementById("stamp2link");
    const stamp3link = document.getElementById("stamp3link");
    document.querySelectorAll(".stamp__links>.stampLink").forEach((stampDom, i) => {
        stampDom.addEventListener("click", () => {
            if(!stampDom.classList.contains("active")) {
                stamp1.classList.add("hidden");
                stamp2.classList.add("hidden");
                stamp3.classList.add("hidden");
                stamp1link.classList.remove("active");
                stamp2link.classList.remove("active");
                stamp3link.classList.remove("active");
                switch(i) {
                    case 0: 
                        stamp1.classList.remove("hidden");
                        break;
                    case 1: 
                        stamp2.classList.remove("hidden");
                        break;
                    case 2: 
                        stamp3.classList.remove("hidden");
                        break;
                }
                stampDom.classList.add("active");
            }
        });
    });
}

Calc.prototype.setTemporaryParams = function() {
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        this.layer1ParamsTemp = JSON.parse(JSON.stringify(this.layer1Params));
        this.layer2ParamsTemp = JSON.parse(JSON.stringify(this.layer2Params));
        this.layer3ParamsTemp = JSON.parse(JSON.stringify(this.layer3Params));
        this.smallCircleParamsTemp = JSON.parse(JSON.stringify(this.smallCircleParams));
    }
}

Calc.prototype.setLayer1Params = function(params) {
    if(this.layer1Params) {
        Object.keys(params).forEach((elem) => {
            this.layer1Params[elem] = params[elem];
        });
    }
    else
        this.layer1Params = params;
};

Calc.prototype.setLayer2Params = function(params) {
    if(this.layer2Params) {
        Object.keys(params).forEach((elem) => {
            this.layer2Params[elem] = params[elem];
        });
    }
    else
        this.layer2Params = params;
};

Calc.prototype.setLayer3Params = function(params) {
    if(this.layer3Params) {
        Object.keys(params).forEach((elem) => {
            this.layer3Params[elem] = params[elem];
        });
    }
    else
        this.layer3Params = params;
};

Calc.prototype.setSmallCircleParams = function(params) {
    if(this.smallCircleParams) {
        Object.keys(params).forEach((elem) => {
            this.smallCircleParams[elem] = params[elem];
        });
    }
    else
        this.smallCircleParams = params;
};
 
Calc.prototype.drawLayers = function() {
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        this.ctx.clearRect(-500, -500, this.canvas.width, this.canvas.height);
        this.ctx.rotate(this.rotation * Math.PI / 180)
        this.drawLayer3Part2();
        this.drawLayer2Part1();
        this.drawLayer2Transformed();
        this.drawLayer2Part2();
        this.drawLayer1();
        this.drawLayer3Part1();
        this.drawSmallCircles();
    }
};

Calc.prototype.drawLayer1 = function() {
    params = this.layer1Params;

    this.ctx.beginPath();
    this.ctx.arc(params.centerX, params.centerY, params.radius, 0, 2 * Math.PI, false);
    
    this.ctx.fillStyle = params.color;
    this.ctx.fill();
    this.ctx.closePath();
};

Calc.prototype.drawLayer2Part1 = function() {
    params = this.layer2Params;

    this.ctx.beginPath();
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius, 0, 0, 1*Math.PI);    
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    this.ctx.fillStyle = `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, 1)`;
    this.ctx.fill();
    this.ctx.closePath();
};

Calc.prototype.drawLayer2Part2 = function() {
    params = this.layer2Params;


    let gradient2 = this.ctx.createLinearGradient(-100, -100, 250, 250);
    gradient2.addColorStop(0, `rgba(147, 96, 175, ${params.colorA})`);
    gradient2.addColorStop(1, `rgba(255, 255, 255, ${params.colorA})`);

    if(!this.rotation) {
        this.ctx.beginPath();
        this.ctx.moveTo(params.centerX - params.radius, params.centerY);
        this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius, .25, 0, 2*Math.PI); 
        this.ctx.lineTo(params.centerX - params.radius, params.centerY);
        this.ctx.fillStyle = "#52619B";
        this.ctx.shadowColor = "#324187";
        this.ctx.shadowBlur = 25;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.fill();
        this.ctx.closePath();

    }

    this.ctx.beginPath();
    this.ctx.shadowColor = "transparent";
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius, .25, 0, 2*Math.PI); 
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    this.ctx.fillStyle = gradient2;
    this.ctx.fill();
    this.ctx.closePath();

    let gradient1 = this.ctx.createRadialGradient(40,-40,150, 40,-40,250);
    gradient1.addColorStop(0, `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, ${params.colorA})`);
    gradient1.addColorStop(1, `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, 0)`);

    this.ctx.beginPath();
    this.ctx.shadowColor = "transparent";
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius, .25, 0, 2*Math.PI); 
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    this.ctx.fillStyle = gradient1;
    this.ctx.fill();
    this.ctx.closePath();
    if(this.rotation <= 0) {
        let gradient3 = this.ctx.createRadialGradient(5, -10, 230, 5, -10, 350);
        gradient3.addColorStop(0, `rgba(50, 65, 135, 0)`);
        gradient3.addColorStop(1, `rgba(50, 65, 135, 1)`);
        this.ctx.beginPath();
        this.ctx.moveTo(params.centerX - params.radius, params.centerY);
        this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius, .25, 0, 2*Math.PI); 
        this.ctx.lineTo(params.centerX - params.radius, params.centerY);
        this.ctx.fillStyle = gradient3;
        this.ctx.shadowColor = "#324187";
        this.ctx.shadowBlur = 25;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.shadowColor = "transparent";
    }
};

Calc.prototype.drawLayer2Transformed = function() {
    params = this.layer2Params;

    this.ctx.beginPath();
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius - 150, 0, 0, 2*Math.PI);    
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    if(this.gender == "Мужской")
        this.ctx.fillStyle = "#568bd7";
    else
        this.ctx.fillStyle = "#7D64A5";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius - 90, params.radius - 190, 0, 0, 2*Math.PI);    
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    if(this.gender == "Мужской")
        this.ctx.fillStyle = "#5373c8";
    else
        this.ctx.fillStyle = "#5C519A";
    this.ctx.fill();
    this.ctx.closePath();
};

Calc.prototype.drawLayer3Part1 = function() {
    params = this.layer3Params;
    var gradient = this.ctx.createLinearGradient(0, 0, 0, 900);
    gradient.addColorStop(0, "rgba(98, 102, 165, 1)");
    gradient.addColorStop(1, "rgba(189, 159, 211, 0)");
    for(let i = 0; i < params.count; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(params.centerX - params.radius, params.centerY);
        this.ctx.ellipse(params.centerX + params.moveSizeX * i, params.centerY + params.moveSizeY * i * 2, params.minRadiusX + i * params.list[i], params.minRadiusY + params.radiusSizeY * i, params.rotation, 0, Math.PI);
        this.ctx.lineWidth = params.lineWidth;
        this.ctx.strokeStyle = gradient;
        this.ctx.stroke();
        this.ctx.closePath();
    }
};

Calc.prototype.drawLayer3Part2 = function() {
    params = this.layer3Params;
    var gradient = this.ctx.createLinearGradient(0, 0, 0, 900);
    gradient.addColorStop(0, "rgba(98, 102, 165, 1)");
    gradient.addColorStop(1, "rgba(189, 159, 211, 0)");
    for(let i = 0; i < params.count; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(params.centerX - params.radius, params.centerY);
        this.ctx.ellipse(params.centerX + params.moveSizeX * i, params.centerY + params.moveSizeY * i * 2, params.minRadiusX + i * params.list[i], params.minRadiusY + params.radiusSizeY * i, params.rotation, Math.PI, 2*Math.PI);
        this.ctx.lineWidth = params.lineWidth;
        this.ctx.strokeStyle = gradient;
        this.ctx.stroke();
        this.ctx.closePath();
    }
};

Calc.prototype.drawSmallCircles = function() {
    params = this.smallCircleParams;
    //arc 1
    this.ctx.beginPath();
    this.ctx.arc(params.c1x, params.c1y, params.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, ${params.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
    //arc 2
    this.ctx.beginPath();
    this.ctx.arc(params.c2x, params.c2y, params.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, ${params.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
    //arc 3
    this.ctx.beginPath();
    this.ctx.arc(params.c3x, params.c3y, params.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, ${params.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
};

Calc.prototype.transformLayers = function(stepsCount) {
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        this.domStartModification();
        window.scroll(0,findPos(document.getElementById("calc__transformed"), 100));
        mq = window.matchMedia( "(max-width: 1160px)" );
        if (!mq.matches) {
            this.transformationStep = 0;
            this.rotation = 25 * 1/stepsCount;
            this.gender = document.getElementById("sex").value;

            let interval = setInterval(() => {
                this.transformationHandler(stepsCount);
                if(this.transformationStep == stepsCount) {
                    clearInterval(interval);
                    this.domEndModification();
            
                    this.setTemporaryParams();
                    this.transformationStep = 0;
                    document.getElementById("calc__recalc").addEventListener("click", () => {
                        this.transformLayersBack(50);
                    }, {once: true});
                }
            }, 30);
        }
        else {
            this.domEndModification();
            document.getElementById("calc__recalc").addEventListener("click", () => {
                this.transformLayersBack(50);
            }, {once: true});
        }
    }
};


Calc.prototype.transformLayersBack = function(stepsCount) {
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        this.domEndModification();
        window.scroll(0,findPos(document.getElementById("calc__wrapper"), -100));
        mq = window.matchMedia( "(max-width: 1160px)" );
        if (!mq.matches) {
            this.transformationStep = 0;
            this.rotation = -1 * 25 * 1/stepsCount;

            let interval = setInterval(() => {
                this.transformationBackHandler(stepsCount);
                if(this.transformationStep == stepsCount + 1) {
                    clearInterval(interval);
                    this.domStartModification();
            
                    this.setTemporaryParams();
                    this.transformationStep = 0;
                    this.eventButton.addEventListener("click", this.transformLayers.bind(this, 50), {once: true});
                }
            }, 30);
        }
        else {
            this.domStartModification();
            this.eventButton.addEventListener("click", this.transformLayers.bind(this, 50), {once: true});
        }
    }
};

function findPos(obj, bonus) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop + bonus];
    }
}

Calc.prototype.domStartModification = function() {
    this.canvas.classList.toggle("transformed");
    document.getElementById("calc__block").classList.toggle("hidden");
    document.getElementById("calc__wrapper").classList.toggle("transformed");
};

Calc.prototype.domEndModification = function() {
    document.getElementById("calc__transformed").classList.toggle("hidden");
    document.getElementById("calc__container").classList.toggle("transformed");
};


Calc.prototype.transformationBackHandler = function(stepsCount) {
    this.layer1Transform(stepsCount, {
        centerX: 100,
        centerY: -100,
        color: "#3f45a7",
        radius: 100,
    });
    this.layer2Transform(stepsCount, {
        centerX: 0,
        centerY: 0,
        colorR: 71,
        colorG: 127,
        colorB: 210,
        colorA: 1,
        radius: 250,
    });
    let list = [];
    for(let i = 0; i < 8; i++) {
        list.push(40);
    }
    this.layer3Transform(stepsCount, {
        centerX: 0,
        centerY: 0,
        minRadiusX: 250,
        minRadiusY: 250,
        rotation: 0,
        moveSizeX: 0,
        moveSizeY: 0,
        radiusSizeX: 40,
        radiusSizeY: 40,
        lineWidth: 1,
        list: list
    });
    var mq = window.matchMedia( "(max-width: 1480px)" );
    if (mq.matches) {
        this.smallCircleTransform(stepsCount, {
            c1x: 0,
            c1y: 0,
            c2x: 0,
            c2y: 0,
            c3x: 0,
            c3y: 0,
            colorR: 255,
            colorG: 255,
            colorB: 255,
            opacity: 0
        });
    }
    else {
        this.smallCircleTransform(stepsCount, {
            c1x: 0,
            c1y: 0,
            c2x: 0,
            c2y: 0,
            c3x: 0,
            c3y: 0,
            colorR: 255,
            colorG: 255,
            colorB: 255,
            opacity: 0
        });
    }
    this.drawLayers();
    this.transformationStep += 1;
};

Calc.prototype.transformationHandler = function(stepsCount) {
    
    var gradient = this.ctx.createLinearGradient(50, 50, 100, -100);
    if(this.gender == "Мужской") {
        gradient.addColorStop(0, "rgb(63, 69, 166)");
        gradient.addColorStop(1, "rgb(93, 142, 218)");
    }
    else {
        gradient.addColorStop(0, "rgba(70, 59, 129, 1)");
        gradient.addColorStop(1, "rgba(140, 128, 207, 1)");
    }
    this.layer1Transform(stepsCount, {
        centerX: 0,
        centerY: -80,
        radius: 106,
        color: gradient
    });
    let colorR = 164;
    let colorG = 195;
    let colorB = 242;
    if(this.gender == "Мужской") {
        colorR = 71;
        colorG = 127;
        colorB = 210;
    }
    else {
        colorR = 148;
        colorG = 114;
        colorB = 172;
    }
    this.layer2Transform(stepsCount, {
        centerX: 0,
        centerY: 0,
        radius: 230,
        colorR: colorR,
        colorG: colorG,
        colorB: colorB,
        colorA: 0
    });
    let list = [];
    for(let i = 0; i < this.layer3Params.count; i++) {
        list.push(this.layer3Params.radiusSizeX - i);
    }
    this.layer3Transform(stepsCount, {
        centerX: 0,
        centerY: 250,
        minRadiusX: 200,
        minRadiusY: 50,
        rotation: 0,
        moveSizeX: 0,
        moveSizeY: -10,
        radiusSizeX: 20,
        radiusSizeY: 5,
        lineWidth: 3,
        list: list
    });
    var mq = window.matchMedia( "(max-width: 1480px)" );
    if(this.gender == "Мужской") {
        colorR = 164;
        colorG = 195;
        colorB = 242;
    }
    else {
        colorR = 237;
        colorG = 191;
        colorB = 213;
    }
    if (mq.matches) {
        this.smallCircleTransform(stepsCount, {
            c1x: -230,
            c1y: 0,
            c2x: 90,
            c2y: -140,
            c3x: -150,
            c3y: 260,
            opacity: 1,
            colorR: colorR,
            colorG: colorG,
            colorB: colorB
        });
    }
    else {
        this.smallCircleTransform(stepsCount, {
            c1x: -230,
            c1y: 0,
            c2x: 90,
            c2y: -140,
            c3x: -200,
            c3y: 200,
            opacity: 1,
            colorR: colorR,
            colorG: colorG,
            colorB: colorB
        });
    }
    this.drawLayers();
    this.transformationStep += 1;
};

Calc.prototype.layer1Transform = function(stepsCount, endParams) {
    let tempParam = this.layer1ParamsTemp;
    let tFunc = this.transformationFormulaGenerator(tempParam, endParams, stepsCount);
    this.setLayer1Params({
        radius: tFunc("radius"),
        centerX: tFunc("centerX"),
        centerY: tFunc("centerY"),
        color: endParams.color
    });
};

Calc.prototype.layer2Transform = function(stepsCount, endParams) {
    let tempParam = this.layer2ParamsTemp;
    let tFunc = this.transformationFormulaGenerator(tempParam, endParams, stepsCount);
    this.setLayer2Params({
        radius: tFunc("radius"),
        centerX: tFunc("centerX"),
        centerY: tFunc("centerY"),
        colorR: tFunc("colorR"),
        colorG: tFunc("colorG"),
        colorB: tFunc("colorB"),
        colorA: tFunc("colorA"),
    });
};

Calc.prototype.layer3Transform = function(stepsCount, endParams) {
    let tempParam = this.layer3ParamsTemp;
    this.layer3Params.list = this.layer3Params.list.map((listElem, i) => {
        return tempParam.list[i] + (endParams.list[i] - tempParam.list[i]) * this.transformationStep / stepsCount;
    });
    let tFunc = this.transformationFormulaGenerator(tempParam, endParams, stepsCount);
    this.setLayer3Params({
        minRadiusX: tFunc("minRadiusX"),
        minRadiusY: tFunc("minRadiusY"),
        rotation: tFunc("rotation"),
        centerX: tFunc("centerX"),
        centerY: tFunc("centerY"),
        moveSizeX: tFunc("moveSizeX"),
        moveSizeY: tFunc("moveSizeY"),
        radiusSizeX: tFunc("radiusSizeX"),
        radiusSizeY: tFunc("radiusSizeY"),
        lineWidth: tFunc("lineWidth"),
    });
};

Calc.prototype.smallCircleTransform = function(stepsCount, endParams) {
    let tempParam = this.smallCircleParamsTemp;
    let tFunc = this.transformationFormulaGenerator(tempParam, endParams, stepsCount);
    this.setSmallCircleParams({
        opacity: tFunc('opacity'),
        c1x: tFunc('c1x'),
        c1y: tFunc('c1y'),
        c2x: tFunc('c2x'),
        c2y: tFunc('c2y'),
        c3x: tFunc('c3x'),
        c3y: tFunc('c3y'),
        colorR: tFunc('colorR'),
        colorG: tFunc('colorG'),
        colorB: tFunc('colorB')
    });
};

Calc.prototype.transformationFormulaGenerator = function(tempParam, endParams, stepsCount) {
    return (paramName) => {

        return tempParam[paramName] + 
            (endParams[paramName] - tempParam[paramName]) 
            * this.transformationStep / stepsCount;
    };
};

// Details

function Details(canvasId = "canvas", videoId = "video") {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.video = document.getElementById(videoId);
    this.ctx = this.canvas.getContext('2d');
    this.nParam = 0;
    this.angles = [0, 400, 800];
    this.radiusX = 317;
    this.radiusY = 317;
    this.transformX = 0;
    this.transformY = 0;
    this.step = 0;
    this.stepsCount = 20;
    
    this.height = 700;
    var mq = window.matchMedia( "(max-width: 1480px)" );
    if (mq.matches) {
        this.width = 1120;
        this.height = 600;
        this.radiusX = 280;
        this.radiusY = 280;
    }
    else {
        this.width = 1440;
    }
    mq = window.matchMedia( "(max-width: 1160px)" );
    if (mq.matches) {
        this.width = 720;
    }
    this.centerX = this.width/2;
    this.centerY = this.height/2;
}

Details.prototype.init = function() {
    if(this.canvasId == "author__canvas") {
        this.radiusX = 250;
        this.radiusY = 250;
        this.centerX = 255;
        this.centerY = 255;
    }
    let interval;
    mq = window.matchMedia( "(max-width: 1160px)" );
    if (!mq.matches) {
        interval = setInterval(this.draw.bind(this), 40);
    }
    if(this.canvasId != "author__canvas") {
        this.video.addEventListener("click", (e) => {
            document.getElementById("video__start").classList.add('hidden');
            this.video.setAttribute("controls", "controls");
            this.transform(interval);
            this.editDom();
            console.log(this.video.onpause);
            if(this.video.onpause) {
                this.video.play();
            }
        }, {once: true});
        
        document.getElementById("video__start").addEventListener("click", (e) => {
            document.getElementById("video__start").classList.add('hidden');
            this.video.setAttribute("controls", "controls");
            this.transform(interval);
            this.editDom();
            console.log(this.video.onpause);
            this.video.play();
            if(this.video.onpause) {
                this.video.play();
            }
        }, {once: true});
    }
    
};

Details.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawCircle(0, "rgba(255, 255, 255, 0.6)");
    this.drawCircle(-10, "rgba(255, 255, 255, 0.12)");
    if(this.transformX == 0) {
        this.drawMovingCircle(0);
        this.drawMovingCircle(1);
        this.drawMovingCircle(2);
    }
};

Details.prototype.drawCircle = function(modifier=0, color="#fff") {
    let fourPointsParam = 0.552284749831;
    this.ctx.beginPath();
    let savedRadiusX = this.radiusX;
    let savedRadiusY = this.radiusY;
    this.radiusX += modifier;
    this.radiusY += modifier;
    // this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    this.ctx.moveTo(this.centerX - this.radiusX - this.transformX, this.centerY- this.transformY);
    let nextStepX = this.centerX - this.radiusX - this.transformX;
    let nextStepY = this.centerY - this.transformY;
    this.ctx.bezierCurveTo(
        this.centerX - this.radiusX - this.transformX, 
        this.centerY - this.radiusY*fourPointsParam - this.transformY, 
        this.centerX - this.radiusX*fourPointsParam - this.transformX, 
        this.centerY - this.radiusY - this.transformY, 
        this.centerX - this.transformX, 
        this.centerY - this.radiusY - this.transformY
    );
    nextStepX = this.centerX + this.transformX;
    nextStepY = this.centerY - this.radiusY - this.transformY;
    this.ctx.lineTo(nextStepX, nextStepY);
    this.ctx.bezierCurveTo(
        this.centerX + this.radiusX*fourPointsParam + this.transformX, 
        this.centerY - this.radiusY - this.transformY, 
        this.centerX + this.radiusX + this.transformX, 
        this.centerY - this.radiusY*fourPointsParam - this.transformY, 
        this.centerX + this.radiusX + this.transformX, 
        this.centerY - this.transformY
    );
    nextStepX = this.centerX + this.radiusX + this.transformX;
    nextStepY = this.centerY + this.transformY;
    this.ctx.lineTo(nextStepX, nextStepY);
    this.ctx.bezierCurveTo(
        this.centerX + this.radiusX + this.transformX, 
        this.centerY + this.radiusY*fourPointsParam + this.transformY, 
        this.centerX + this.radiusX*fourPointsParam + this.transformX, 
        this.centerY + this.radiusY + this.transformY, 
        this.centerX + this.transformX, 
        this.centerY + this.radiusY + this.transformY
    );
    nextStepX = this.centerX - this.transformX;
    nextStepY = this.centerY + this.radiusY + this.transformY;
    this.ctx.lineTo(nextStepX, nextStepY);
    this.ctx.bezierCurveTo(
        this.centerX - this.radiusX*fourPointsParam - this.transformX, 
        this.centerY + this.radiusY + this.transformY, 
        this.centerX - this.radiusX - this.transformX, 
        this.centerY + this.radiusY*fourPointsParam + this.transformY, 
        this.centerX - this.radiusX - this.transformX, 
        this.centerY + this.transformY
    );
    nextStepX = this.centerX - this.radiusX - this.transformX;
    nextStepY = this.centerY - this.transformY;
    this.ctx.lineTo(nextStepX, nextStepY);

    this.ctx.shadowBlur = 15;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowColor = "lightblue";
    
    this.ctx.fillStyle = "transparent";
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.radiusX = savedRadiusX;
    this.radiusY = savedRadiusY;
};

Details.prototype.drawMovingCircle = function(id) {
    var x = this.centerX + this.nParam + this.radiusX * Math.cos(this.angles[id]);
    var y = this.centerY + this.nParam + this.radiusY * Math.sin(this.angles[id]);
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = "#fff";
    this.ctx.fill();
    this.ctx.closePath();

    this.angles[id] += Math.acos(1-Math.pow(3/this.radiusX,2)/2) / 2;
};

Details.prototype.editDom = function() {
    mq = window.matchMedia( "(max-width: 1160px)" );
    if (!mq.matches) {
        document.getElementById("video__container").classList.add("active");
    }
};

Details.prototype.transform = function(drawInterval) {
    let params = JSON.parse(JSON.stringify(this));
    let interval = setInterval(() => {
        this.transformationHandler(params);
        if(this.step == this.stepsCount) {
            clearInterval(interval);
            clearInterval(drawInterval);
            this.step = 0;
        }
        this.step++;
    }, 30);
};

Details.prototype.transformationHandler = function(params) {
    this.transformCircle(params);
};

Details.prototype.transformCircle = function(params) {
    this.radiusX = this.tFormula(params.radiusX, 10);
    this.radiusY = this.tFormula(params.radiusY, 10);
    this.transformX = this.tFormula(params.transformX, 700);
    this.transformY = this.tFormula(params.transformY, 300);
    
    var mq = window.matchMedia( "(max-width: 1480px)" );
    if (mq.matches) {
        this.transformX = this.tFormula(params.transformX, 535);
        this.transformY = this.tFormula(params.transformY, 260);
    }
    else {
        this.transformX = this.tFormula(params.transformX, 700);
    }
    mq = window.matchMedia( "(max-width: 1160px)" );
    if (mq.matches) {
        this.transformX = this.tFormula(params.transformX, 335);
    }
    mq = window.matchMedia( "(max-width: 760px)" );
    if (mq.matches) {
        this.transformX = this.tFormula(params.transformX, );
    }
}

Details.prototype.tFormula = function(startParam, endParam) {
    return startParam + (endParam - startParam) * this.step / this.stepsCount;
};


// Trust 
function Trust() {
    this.state = 0;
    this.lastState = 2;

    this.arrLeftDom = document.getElementById("trust__arrLeft");
    this.arrRightDom = document.getElementById("trust__arrRight");
    this.trust1linkDom = document.getElementById("trust1link");
    this.trust2linkDom = document.getElementById("trust2link");
    this.trust3linkDom = document.getElementById("trust3link");
    this.trust1Dom = document.getElementById("trust1");
    this.trust2Dom = document.getElementById("trust2");
    this.trust3Dom = document.getElementById("trust3");
}

Trust.prototype.init = function() {
    this.arrLeftDom.addEventListener("click", this.setState.bind(this, "remove", 1));
    this.arrRightDom.addEventListener("click", this.setState.bind(this, "add", 1));
    this.trust1linkDom.addEventListener("click", this.setState.bind(this, "set", 0));
    this.trust2linkDom.addEventListener("click", this.setState.bind(this, "set", 1));
    this.trust3linkDom.addEventListener("click", this.setState.bind(this, "set", 2));
}

Trust.prototype.setState = function(event, state) {
    let lastState = this.state;
    switch(event) {
        case 'remove':
            this.state -= state;
            break;
        case 'add':
            this.state += state;
            break;
        case 'set':
            this.state = state;
            break;
        default:
            break;
    }

    if(this.state > this.lastState)
        this.state = 0;
    else if(this.state < 0)
        this.state = this.lastState;
    if(lastState != this.state)
        this.editContent();
}

Trust.prototype.editContent = function() {
    document.querySelector("#trust__nums>span").innerText = `0${this.state+1}`;
    this.trust1linkDom.classList.remove("active");
    this.trust2linkDom.classList.remove("active");
    this.trust3linkDom.classList.remove("active");
    this.trust1Dom.classList.add("hidden");
    this.trust2Dom.classList.add("hidden");
    this.trust3Dom.classList.add("hidden");

    switch(this.state) {
        case 0:
            this.trust1linkDom.classList.add("active");
            this.trust1Dom.classList.remove("hidden");
            break;
        case 1:
            this.trust2linkDom.classList.add("active");
            this.trust2Dom.classList.remove("hidden");
            break;
        case 2:
            this.trust3linkDom.classList.add("active");
            this.trust3Dom.classList.remove("hidden");
            break;
    }
}

// Unique
function Unique() {
    this.state = 1;
    this.lastState = 2;
    this.block1LinkDom = document.getElementById("unique__block1Link");
    this.block2LinkDom = document.getElementById("unique__block2Link");
    this.block3LinkDom = document.getElementById("unique__block3Link");
    this.block1Dom = document.getElementById("unique__block1");
    this.block2Dom = document.getElementById("unique__block2");
    this.block3Dom = document.getElementById("unique__block3");
    this.arrLeftDom = document.getElementById("unique__arrowLeft");
    this.arrRightDom = document.getElementById("unique__arrowRight");
}


Unique.prototype.init = function() {
    this.arrLeftDom.addEventListener(
        "click", 
        this.setState.bind(this, "remove", 1)
    );
    this.arrRightDom.addEventListener(
        "click", 
        this.setState.bind(this, "add", 1)
    );
    this.block1LinkDom.addEventListener(
        "click", 
        this.setState.bind(this, "set", 0)
    );
    this.block2LinkDom.addEventListener(
        "click", 
        this.setState.bind(this, "set", 1)
    );
    this.block3LinkDom.addEventListener(
        "click", 
        this.setState.bind(this, "set", 2)
    );
    this.block1Dom.addEventListener(
        "click", 
        this.setState.bind(this, "set", 0)
    );
    this.block2Dom.addEventListener(
        "click", 
        this.setState.bind(this, "set", 1)
    );
    this.block3Dom.addEventListener(
        "click", 
        this.setState.bind(this, "set", 2)
    );
}

Unique.prototype.setState = function(event, state) {
    let lastState = this.state;
    switch(event) {
        case 'remove':
            this.state -= state;
            break;
        case 'add':
            this.state += state;
            break;
        case 'set':
            this.state = state;
            break;
        default:
            break;
    }

    if(this.state > this.lastState)
        this.state = this.lastState;
    else if(this.state < 0)
        this.state = 0;
    console.log(
        this.state
    );
    if(lastState != this.state)
        this.editContent(lastState);
}


Unique.prototype.editContent = function(lastState) {
    this.block1LinkDom.classList.remove("active");
    this.block2LinkDom.classList.remove("active");
    this.block3LinkDom.classList.remove("active");
    this.block1Dom.classList.remove("active");
    this.block2Dom.classList.remove("active");
    this.block3Dom.classList.remove("active");
    let temp = "";
    switch(this.state) {
        case 0:
            this.block1LinkDom.classList.add("active");
            this.block1Dom.classList.add("active");
            this.block2Dom.classList.add("leftActive");
            break;
        case 1:
            this.block2LinkDom.classList.add("active");
            this.block2Dom.classList.add("active");
            break;
        case 2:
            this.block3LinkDom.classList.add("active");
            this.block3Dom.classList.add("active");
            break;
    }
}

// Mission
function Mission(staticId, dynamicId) {
    this.staticCanvas = document.getElementById(staticId);
    this.dynamicCanvas = document.getElementById(dynamicId);
    this.staticCtx = this.staticCanvas.getContext('2d');
    this.ctx = this.dynamicCanvas.getContext('2d');
    this.angleList = [];
    this.radiusList = [
        100, 
        150, 
        200,
        300,
        350,
        500,
        550,
        700,
        750
    ];
    this.centerX = this.staticCanvas.width - 100;
    this.centerY = 300;
}

Mission.prototype.init = function() {
    for(let i = 0; i < this.radiusList.length; i++) {
        this.angleList.push(0 + i * 50);
        this.angleList.push(200 + i * 50);
        this.angleList.push(400 + i * 50);
        this.angleList.push(600 + i * 50);
        this.angleList.push(800 + i * 50);
        this.angleList.push(1000 + i * 50);
    }
    let interval;
    this.drawStatic();
    interval = setInterval(this.drawDynamic.bind(this), 40);
}

Mission.prototype.drawDynamic = function() {
    this.ctx.clearRect(0, 0, this.dynamicCanvas.width, this.dynamicCanvas.height);
    
    let j = 0;
    for(let i = 0; i < this.radiusList.length; i++) {
        this.drawMovingCircle(i, j);
        j++;
        this.drawMovingCircle(i, j);
        j++;
        this.drawMovingCircle(i, j);
        j++;
        this.drawMovingCircle(i, j);
        j++;
        this.drawMovingCircle(i, j);
        j++;
        this.drawMovingCircle(i, j);
        j++;
    }
}

Mission.prototype.drawStatic = function() {
    this.drawFilledCircle();
    for(let i = 0; i < this.radiusList.length; i++) {
        this.drawCircle(i);
    }
}

Mission.prototype.drawMovingCircle = function(id, angleId) {
    var x = this.centerX + this.radiusList[id] * Math.cos(this.angleList[angleId]);
    var y = this.centerY + this.radiusList[id] * Math.sin(this.angleList[angleId]);
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = "rgba(255, 255, 255, .5)";
    this.ctx.fill();
    this.ctx.closePath();

    this.angleList[angleId] += Math.acos(1-Math.pow(3/this.radiusList[id],2)/2) / 2;
};

Mission.prototype.drawFilledCircle = function() {
    this.staticCtx.beginPath();
    this.staticCtx.arc(this.centerX, this.centerY, 65, 0, 2 * Math.PI, false);
    this.staticCtx.fillStyle = "#3F45A6";
    this.staticCtx.fill();
    this.staticCtx.closePath();
}

Mission.prototype.drawCircle = function(id) {
    this.staticCtx.beginPath();
    this.staticCtx.arc(this.centerX, this.centerY, this.radiusList[id], 0, 2 * Math.PI, false);
    this.staticCtx.strokeStyle = "rgba(255, 255, 255, .5)";
    this.staticCtx.stroke();
    this.staticCtx.closePath();
};

// Courses
function Courses() {
    this.state = 0;
    this.lastState = 2;
    this.block1LinkDom = document.getElementById("courses__more1");
    this.block2LinkDom = document.getElementById("courses__more2");
    this.block3LinkDom = document.getElementById("courses__more3");
    this.block4LinkDom = document.getElementById("courses__more4");
    this.block1Dom = document.getElementById("courses__additional1");
    this.block2Dom = document.getElementById("courses__additional2");
    this.block3Dom = document.getElementById("courses__additional3");
    this.block4Dom = document.getElementById("courses__additional4");
}


Courses.prototype.init = function() {
    this.block1LinkDom.addEventListener(
        "click", 
        this.toggle.bind(this, this.block1Dom, this.block1LinkDom)
    );
    this.block2LinkDom.addEventListener(
        "click", 
        this.toggle.bind(this, this.block2Dom, this.block2LinkDom)
    );
    this.block3LinkDom.addEventListener(
        "click", 
        this.toggle.bind(this, this.block3Dom, this.block3LinkDom)
    );
    this.block4LinkDom.addEventListener(
        "click", 
        this.toggle.bind(this, this.block4Dom, this.block4LinkDom)
    );
}


Courses.prototype.toggle = function(blockDom, linkDom) {
    blockDom.classList.toggle("hidden");
    linkDom.innerText = linkDom.innerText == "Подробнее" ? "Свернуть" : "Подробнее";

}