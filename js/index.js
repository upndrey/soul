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
    this.cardMasks();
};

Popup.prototype.openPopupHandler = function(linkId, popupDom) {
    const popupLinkDom = document.getElementById(linkId);
    popupLinkDom.addEventListener("click", (e) => {
        e.preventDefault();
        this.openPopup(popupDom);
        const bodyDom = document.getElementsByTagName("body")[0];
        bodyDom.classList.add("fixed");
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
    const bodyDom = document.getElementsByTagName("body")[0];
    bodyDom.classList.remove("fixed");
    this.activePopupDom.classList.remove("active");
    this.wrapperDom.classList.remove("active");
    this.activePopupDom = null;
};

Popup.prototype.cardMasks = function() {
    const card = document.getElementById("card");
    const cardDate = document.getElementById("card__date");

    card.addEventListener("input", (e) => {
        let regex = /^[0-9]+$/;
        if (!e.target.value.slice(e.target.value.length - 1, e.target.value.length).match(regex))
        {
            e.target.value = e.target.value.slice(0, e.target.value.length - 1);
        }
        console.log(e.target.value.length);
        if(e.target.value.length > 16) {
            e.target.value = e.target.value.slice(0, e.target.value.length - 1);
            cardDate.focus();
        }
    });
    $('#card__date').inputmask({
        mask: "D/M",
        placeholder: "дд.мм",
        definitions: {
          "M": {
            validator: function (chrs, buffer, pos, strict, opts) {
              var valExp = new RegExp("0[1-9]|1[0-2]");
              return valExp.test(chrs);
            },
            cardinality: 2,
            prevalidator: [
              { validator: "[01]", cardinality: 1 },
              { validator: "0[1-9]", cardinality: 2 },
              { validator: "1[012]", cardinality: 2 },
            ]
          },
          "D": {
            validator: function (chrs, buffer, pos, strict, opts) {
              var valExp2 = new RegExp("0[1-9]|[12][0-9]|3[01]");
              return valExp2.test(chrs);
            },
            cardinality: 2,
            prevalidator: [
              { validator: "[0-3]", cardinality: 1 },
              { validator: "0[1-9]", cardinality: 2 },
              { validator: "(1|2)[0-9]", cardinality: 2 },
              { validator: "3[01]", cardinality: 2 },
            ]
          },
        }
      });
    // cardDate.addEventListener("input", (e) => {
    //     prevLength = nextLength;
    //     nextLength = e.target.value.length;
    //     if(e.target.value.length == 0) {
    //         card.focus();
    //     }
    //     let regex = /^[0-9]+$/;
    //     if (!e.target.value.slice(e.target.value.length - 1, e.target.value.length).match(regex) && prevLength != 4 && nextLength != 3)
    //     {
    //         e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    //         return;
    //     }
    //     if(e.target.value.length == 2) {
    //         let month = e.target.value[0] + e.target.value[1];
    //         if(parseInt(month) > 12){
    //             e.target.value = 12;
    //         }
    //     }
    //     if(e.target.value.length == 2 && nextLength >= prevLength) {
    //         e.target.value += "/";
    //         nextLength++;
    //     }
    //     if(prevLength == 3 && nextLength == 2) {
    //         e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    //         return;
    //     }
    //     if(prevLength == 2 && nextLength == 1 && e.target.value[e.target.value.length - 1] == "/") {
    //         e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    //         nextLength = 1;
    //         return;
    //     }
    //     if(e.target.value.length == 6) {
    //         e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    //     }
    // });
}

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
    this.marsCanvas = document.getElementById("header__marsDynamic");
    this.centerX = 250;
    this.centerY = 250;
    this.radius = 250;
    this.angle = 1000;
}

Header.prototype.init = function() {   
    mq = window.matchMedia( "(max-width: 1160px)" );
    if (!mq.matches) {
        var img = new Image();
        img.addEventListener("load", () => {
            const ctx = this.marsCanvas.getContext('2d');
            setInterval(() => {
                var x = this.centerX + this.radius * Math.cos(this.angle);
                var y = this.centerY + this.radius * Math.sin(this.angle);
                // x = Math.floor(x);
                // y = Math.floor(y);
                ctx.clearRect(0, 0, this.marsCanvas.width, this.marsCanvas.height);

                ctx.beginPath();
                ctx.arc(x + 25, y + 25, 25, 0, 2 * Math.PI);
                ctx.fillStyle = "#a5abce";
                ctx.fill();
                ctx.drawImage(img, x, y, 50, 50);
                ctx.closePath();
                this.angle += .0035;
                //this.angle -= Math.acos(1-Math.pow(3/this.radius,2)/2) / 2;
            }, 20);
        }, false);
        img.src = './images/header__marsDynamic.png'; // Устанавливает источник файла
        
    }
};


// Calc
function Calc(canvasId = "canvas", buttonId = "someButton") {
    this.canvas = document.getElementById(canvasId);
    this.eventButton = document.getElementById(buttonId);
    this.birthdayDom = document.getElementById("birthday");
    this.birthplaceDom = document.getElementById("birthplace");
    this.birthtimeDom = document.getElementById("birthtime");
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
    this.cityAutocompleteAPI2();
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
    
    var gradient3;
    mq = window.matchMedia( "(max-width: 1160px)" );
    if (mq.matches) {
        gradient3 = this.ctx.createLinearGradient(0, 0, 0, 900);
        gradient3.addColorStop(0, "rgba(154, 189, 227, .5)");
        gradient3.addColorStop(1, "rgba(154, 189, 227, .2)");
        //gradient3 = "rgba(154, 189, 227, .4)";
    }
    else {
        gradient3 = this.ctx.createLinearGradient(0, 0, 0, 900);
        gradient3.addColorStop(0, "rgba(98, 102, 165, 1)");
        gradient3.addColorStop(1, "rgba(189, 159, 211, 0)");
    }
    this.setLayer3Params({
        centerX: 0,
        centerY: 0,
        color: gradient3,
        count: 8,
        list: list,
        minRadiusX: 250,
        minRadiusY: 250,
        rotation: 0,
        radiusSizeX: 35,
        radiusSizeY: 35,
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
    mq = window.matchMedia( "(max-width: 1160px)" );
    if (mq.matches) {
        this.ctx.translate(550, 550);
    }
    else {
        this.ctx.translate(490, 550);
    }
    this.drawLayers();
    this.stampsInit();
    this.inputHandler();
    this.inputTimeFormat();
    this.inputDateFormat();
    this.eventButton.addEventListener("click", this.transformLayers.bind(this, 40), {once: true});
};

Calc.prototype.inputTimeFormat = function() {
    $(this.birthtimeDom).inputmask(
        "hh:mm", {
        placeholder: "ЧЧ:ММ", 
        insertMode: false, 
        showMaskOnHover: false,
        hourFormat: "24"
      }
    );
};

Calc.prototype.inputDateFormat = function() {
    $(this.birthdayDom).inputmask(
        "dd.mm.yyyy", {
        inputFormat: "dd.mm.yyyy",
        placeholder: "ДД.ММ.ГГГГ", 
        insertMode: false, 
        showMaskOnHover: false,
      }
    );
};

Calc.prototype.cityAutocompleteAPI2 = function() {
    let cityInputDom = document.getElementById("birthplace");
    let cityAutocompleteDom = document.getElementById("birthplace__autocomplete");
    let city = [];
    cityInputDom.addEventListener("input", async () => {
        let result = await fetch(`https://autocomplete.travelpayouts.com/places2?term=${cityInputDom.value}&locale=ru&types[]=city`)
        .then(response => response.json())
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        })
        city = [];
        if(!result.error)
            result.forEach((elem) => {
                console.log(elem.name);
                if(elem.name && city.length < 5)
                    city.push(elem.name);
            });
        cityAutocompleteDom.innerHTML = '';
        if(city.length)
            cityAutocompleteDom.classList.add("active");
        else
            cityAutocompleteDom.classList.remove("active");
        city.forEach((elem) => {
            let autocompleteSuggestion = document.createElement("div");
            autocompleteSuggestion.innerText = elem;
            autocompleteSuggestion.addEventListener("click", () => {
                cityInputDom.value = elem;
                cityAutocompleteDom.classList.remove("active");
            }, 
            {
                once: true
            });
            cityAutocompleteDom.appendChild(autocompleteSuggestion);
        });
    });
    
}
Calc.prototype.cityAutocompleteAPI = function() {
    // 
    //434a686dcdfee8a75c60316b3fc6dbf2a124df2d
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "434a686dcdfee8a75c60316b3fc6dbf2a124df2d";
    let cityInputDom = document.getElementById("birthplace");
    let cityAutocompleteDom = document.getElementById("birthplace__autocomplete");
    cityInputDom.addEventListener("input", async () => {
        while(cityAutocompleteDom.firstChild)
            cityAutocompleteDom.removeChild(cityAutocompleteDom.lastChild);
        var query = cityInputDom.value;
    
        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({
                query: query,
                count: 5,
                from_bound: { value: "city" },
                to_bound: { value: "city" }
            })
        }
    
        let result = await fetch(url, options)
        .then(response => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error;
        });
        console.log(result);
        let city = [];
        result.suggestions.forEach((elem) => {
            if(elem.data.city)
                city.push(elem.data.city);
        });
        console.log(city);
        
        if(city.length)
            cityAutocompleteDom.classList.add("active");
        else
            cityAutocompleteDom.classList.remove("active");
        city.forEach((elem) => {
            let autocompleteSuggestion = document.createElement("div");
            autocompleteSuggestion.innerText = elem;
            autocompleteSuggestion.addEventListener("click", () => {
                cityInputDom.value = elem;
                cityAutocompleteDom.classList.remove("active");
            }, 
            {
                once: true
            });
            cityAutocompleteDom.appendChild(autocompleteSuggestion);
        });
    });
};

Calc.prototype.inputHandler = function() {
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
    for(let i = 0; i < params.count; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(params.centerX - params.radius, params.centerY);
        this.ctx.ellipse(params.centerX + params.moveSizeX * i, params.centerY + params.moveSizeY * i * 2, params.minRadiusX + i * params.list[i], params.minRadiusY + params.radiusSizeY * i, params.rotation, 0, Math.PI);
        this.ctx.lineWidth = params.lineWidth;
        this.ctx.strokeStyle = params.color;
        this.ctx.stroke();
        this.ctx.closePath();
    }
};

Calc.prototype.drawLayer3Part2 = function() {
    params = this.layer3Params;
    for(let i = 0; i < params.count; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(params.centerX - params.radius, params.centerY);
        this.ctx.ellipse(params.centerX + params.moveSizeX * i, params.centerY + params.moveSizeY * i * 2, params.minRadiusX + i * params.list[i], params.minRadiusY + params.radiusSizeY * i, params.rotation, Math.PI, 2*Math.PI);
        this.ctx.lineWidth = params.lineWidth;
        this.ctx.strokeStyle = params.color;
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
    if(!this.isCorrectInput()){
        this.eventButton.addEventListener("click", this.transformLayers.bind(this, 40), {once: true});
        return;
    }
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        if(!this.API())
            return;
        this.domStartModification();
        window.scroll(0,findPos(document.getElementById("calc__transformed"), -100));
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
                        document.querySelectorAll(`#stamp1__text, #stamp2__text, #stamp3__text`).forEach((elem) => {
                            elem.classList.remove("shown");
                        });
                        this.transformLayersBack(1);
                    }, {once: true});
                }
            }, 30);
        }
        else {
            this.domEndModification();
            document.getElementById("calc__recalc").addEventListener("click", () => {
                document.querySelectorAll(`#stamp1__text, #stamp2__text, #stamp3__text`).forEach((elem) => {
                    elem.classList.remove("shown");
                });
                this.transformLayersBack(1);
            }, {once: true});
        }
    }
};

Calc.prototype.isCorrectInput = function() {
    let dateDom = document.getElementById("birthday");
    let dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if(!dateDom.value.match(dateRegex)) {
        console.log("Введите корректную дату");
        alert("Введите корректную дату");
        return false;
    }
    let timeDom = document.getElementById("birthtime");
    if(timeDom.value == "Время рождения" || timeDom.value == "")
        timeDom.value = "00:00";
    let timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if(!timeDom.value.match(timeRegex)) {
        console.log("Введите корректное время");
        alert("Введите корректное время");
        return false;
    }

    
    let cityDom = document.getElementById("birthplace");
    if(cityDom.value == "Место рождения" || cityDom.value == "")
    cityDom.value = "Москва";
    return true;
};

Calc.prototype.API = async function() {
    this.changeDataDom();
    let LangAndPos = await this.yandexGeoAPI();
    console.log(LangAndPos);
    if(LangAndPos == "0 0") {
        alert(`
        Ваш город рождения не найден
        <br>Пожалуйста, проверьте правильность написания, или попробуйте указать соседний крупный город для расчёта (из одного часового пояса)`);
        return false;
    }
    let ts = await this.ipgeoAPI(LangAndPos.split(" "));
    console.log(ts);
    let astroResult = await this.astroAPI(ts);
    console.log(astroResult);
    this.changeStampDom(astroResult);
    return true;
};

Calc.prototype.changeDataDom = function() {
    document.getElementById("data__date").innerText = this.birthdayDom.value;
    document.getElementById("data__time").innerText = this.birthtimeDom.value == "Время рождения" ? "00:00" : this.birthtimeDom.value;
    document.getElementById("data__city").innerText = this.birthplaceDom.value == "Место рождения" ? "Москва" : this.birthplaceDom.value;
    document.getElementById("data__sex").innerText = document.getElementById("sex").value;
};

Calc.prototype.changeStampDom = function(id) {
    let stamp1linkText,
        stamp2linkText,
        stamp3linkText,
        stamp1__name,
        stamp1__text,
        stamp2__name,
        stamp2__text,
        stamp3__name,
        stamp3__text,
        stamp__number;
    switch(id) {
        case 1:
            stamp1linkText = "Чувство Страха";
            stamp2linkText = "Ведьма";
            stamp3linkText = "Создатель/Творец";
            stamp1__name = "Чувство Страха";
            stamp1__text = `Ваше глубинное чувство - это Страх. Ощущение сжатия и скованности сопровождает Вас всю жизнь. Это часто является «эхом» из детства, проведённого под чрезмерным контролем родителей и их ожиданием реализации своих проекций, а не Вашей истинной природы. Подавленность, закрытость и неуверенность — всё это Вы получили в “наследство”. Страх высоты, страх одиночества, страх бедности.. 
            <br>Не так важно чего конкретно боитесь, ведь если размотать эти клубки, за каждым из них кроется страх смерти. Научиться справляться с чувством страха поможет Архетип Души.
            `;
            stamp2__name = "Ведьма";
            stamp2__text = `Архетип, который выражен в Вас ярче всего, это Ведьма. 
            <br><br>Когда Архетип в проявлен в минусе: 
            <br><br>Вы чувствуете себя обиженной женщиной, считающей этот мир враждебным и небезопасным местом. Вам постоянно кто-то должен, а личная жизнь напоминает забег по треугольнику Карпмана. Не любите смотреться в зеркало из-за постоянного недовольства своим телом, <span class="stamp__hidden">Читать далее...</span><br>а лень, усталость и прокрастинация сопровождают Вас изо дня в день. В гневе безжалостны и напоминаете Малифисенту. Находясь рядом с Ведьмой в отрицательном проявлении, мужчины испытывают напряжение и дискомфорт. Ничто не может принести Вам чувство глубокого удовлетворения. 
            <br><br>Когда Архетип проявлен в плюсе: 
            <br><br>Вы — сияющая женщина-сокровищница, открывшая в своих страхах клад! Выглядите моложе своих лет, но при этом обладаете внушительным духовным опытом и впечатляющим багажом знаний. Вы уверены в своих границах, умеете корректно выражать чувства и находитесь в контакте со своей агрессией. Обладаете сильной интуицией и является хорошей хозяйкой, которая всегда накормит и обогреет гостей своего дома. Для Вас жизнь легка и наполнена красотой в каждом её проявлении. Вы наполнены и щедры, а лучшей инвестицией считаете себя! 
            `;
            stamp3__name = "Создатель/Творец";
            stamp3__text = `Главная задача - это создание уникальных проектов, основанных на собственных знаниях и исследованиях. Ваш конёк - чутко ловить творческие импульсы и претворять их в жизнь! Новатор в любой выбранной сфере, где возможна реализация полученного опыта. Творец, исследователь, сценарист, методист, писатель, автор.`;
            stamp__number = "1";
            break;
        case 2:
            stamp1linkText = "Чувство Гнева";
            stamp2linkText = "Гейша";
            stamp3linkText = "Маркетолог";
            stamp1__name = "Чувство Гнева";
            stamp1__text = `Ваше глубинное чувство - это Гнев. С детства Ваши границы нарушали, и поэтому во взрослом возрасте Вы ревностно защищаете их, используя тактику избегания. Не любите вступать в конфликты и очень часто просто замалчиваете свое недовольство. Из-за того, что не позволяете себе проявлять агрессию, гнев копится и разъедает изнутри. Очень часто говорите «нет» любым возможностям, потому что мир уже давно разочаровал Вас и не заслужил ещё одного шанса на доверие. Женщинам с этой раной Души свойственно проявлять отрицание и непринятие неудобной информации о себе, а больше всего под отрицание попадают их сексуальность и женственность. <span class="stamp__hidden">Читать далее...</span><br>Возможно, читая это, Вы не узнаете в тексте себя, но попробуйте прочесть до конца, походить с этим и быть честной с самой собой. Только через глубокое осознание своих теневых аспектов личности, можно обрести контакт со своей Душой, а научиться справляться с гневом поможет Архетип Души.`;
            stamp2__name = "Гейша";
            stamp2__text = ` Архетип, который выражен в Вас ярче всего, это Гейша.
            <br><br>Когда Архетип проявлен в минусе:
            <br>Ваш живот очень напряжён даже в состоянии покоя. Вы с легкостью можете нарушать границы других людей, однако очень бурно реагируете и обижаетесь, когда люди нарушают ваши. Порой бываете чрезмерно обидчивы и капризны. Мастерски умеете манипулировать людьми, возможно, делаете это неосознанно, а к мужчинам относитесь как к средству достижения <span class="stamp__hidden">Читать далее...</span><br> своих целей. Вы не признаете свою сексуальность и всячески подавляете её. Если же Гейша внутри находится в дисбалансе, Вы можете быть совершенно ненасытны и слишком тревожны. Любая мелочь вызывает раздражение и дискомфорт.
            <br><br>Когда Архетип проявлен в плюсе:
            <br>Вы - расслабленная женщина, которая любит жизнь и знает как получать удовольствие от всего, что ее окружает. Вы - настоящий гуру чувственных удовольствий и главный Ваш фокус в любом процессе - это наслаждение. Дипломатичны, красивы, умеете наслаждаться как одиночеством, так и компанией мужчины. Яркая обольстительница, свободная, легкая женщина, жизнь которой напоминает фейерверк ощущений, красок и ароматов. Вам важно получать удовольствие в процессе, а не в его результате. Страстно любите эстетику, красоту, обладаете утонченным вкусом и излучаете удовольствие изнутри.
            `;
            stamp3__name = "Маркетолог";
            stamp3__text = `Ваша задача - это быть маркетологом, но при одном условии. Тот продукт, дело, услугу, которое продвигаете, должен вызывать у Вас страсть и разжигать внутренний огонь! У вас есть талант доносить смыслы и ценности через визуальные коммуникации. Можете быть дизайнером, художником, консультантом, агентом ,фотографом, визуализатором, стилистом, декоратором.`;
            stamp__number = "2";
            break;
        case 3:
            stamp1linkText = "Чувство Стыда";
            stamp2linkText = "Амазонка";
            stamp3linkText = "Продюсер";
            stamp1__name = "Чувство Стыда";
            stamp1__text = `Ваше глубинное чувство - это Стыд. С детства Вы так привыкли к бесконечной критике и постоянной оценке от самых близких людей, что до сих пор с подозрением относитесь к похвале и комплиментам. Нужно быть удобной, нужно соответствовать ожиданиям родителей, нужно быть лучше, чем дочь маминой подруги. Непрожитые чувства из прошлого давно сменили агрессия к самой себе и привычка обесценивать всех вокруг и, конечно, себя в первую очередь. Вы, как никто, знаете что такое муки от «синдрома самозванца», ведь внутренний критик вещает в режиме нон-стоп. Закрываясь от боли и стыда, Вы постоянно убегаете в дела и отвлекаетесь на <span class="stamp__hidden">Читать далее...</span><br> всё, что угодно, лишь бы не оставаться с этим наедине. Уровень сарказма зашкаливает, как и толщина наращенной брони. Остановиться и взглянуть в глаза своему стыду поможет Архетип Души.`;
            stamp2__name = "Амазонка";
            stamp2__text = `Архетип, который выражен в Вас ярче всего, это Амазонка.
            <br><br>Когда Архетип проявлен в минусе: 
            <br>Вы зациклены на успехе и постоянно пытаетесь конкурировать со всеми вокруг, особенно с мужчинами! Всячески подавляете их, провоцируете на равный «бой», при это проявляя сильное недоверие к ним. Мысль, что мужчина может быть сильнее априори, кажется Вам смешной. Тяжело даются эмоциональные связи с противоположным полом и детьми. Это касается <span class="stamp__hidden">Читать далее...</span><br> Амазонок с открытым проявлением агрессии. С другой стороны задавленная в детстве Амазонка может сделать Вас робкой и неуверенной, а всю невыраженную агрессию Вы направляете внутрь. Любой ценой закрываетесь от взаимодействия с социумом и ограничиваете себя и своё женское начало. Порой слишком зависимы от мнения окружающих. Ваша здоровая воинственность находится в зачаточном состоянии, зато полностью отсутствуют сила воли, стремление к победе и ощущение самоценности.
            <br><br>Когда Архетип проявлен в плюсе:
            <br>Вы - гармоничное сочетание Лары Крофт и успешной бизнес-леди! Очень активны и Вам по плечу достижение любой вершины будь то гора или очередная ступень карьерной лестницы. Вы всегда в гуще событий и в курсе всех нюансов происходящего. Люди горят желанием работать с Вами в одной команде, ведь если Вы принимаете участие в проекте со всей страстью Души, то он просто обречён на успех. Независимы от мнения окружающих и уверены в себе.
            `;
            stamp3__name = "Продюсер";
            stamp3__text = `Ваша задача - это быть лидером. Ваша суперсила - это трезвая оценка ресурсов окружающих и организация людей для их продуктивного взаимодействия друг с другом. К Вашему мнению прислушиваются и часто просят совета или рекомендации. Так как знают, что в потенциале вы способны привести любое дело к коммерческому успеху.
            <br>Вы прирожденный предприниматель, бизнес- коуч, продюсер, финансовый советник.
            <br>Вам по плечу руководящие должности со сплоченной командой.
            `;
            stamp__number = "3";
            break;
        case 4:
            stamp1linkText = "Чувство Отвержения";
            stamp2linkText = "Мать/Жена";
            stamp3linkText = "Режиссёр";
            stamp1__name = "Чувство Отвержения";
            stamp1__text = `Ваше глубинное чувство - это Отвержение. Как правило, такую рану Души получают женщины, у которых были эмоционально холодные родители. Внутри Вас до сих пор живет маленькая девочка, которая обижена и зла на своих маму и папу, но не может признаться в этом даже себе. Подсознание переносит эту модель взаимодействия на отношения с миром, и становится страшно, что Вас отвергнут. Сложно заводить отношения, друзей, искать достойную работу, ведь есть ощущение, что предательство ждёт на каждом шагу, поэтому Вы часто выбираете тактику отвергнуть первой. Внутри пульсирует потребность в любви, и Вы отчаянно ищите её снаружи, <span class="stamp__hidden">Читать далее...</span><br> постоянно попадая в созависимые отношения, где мертвой хваткой держите партнера. Контроль создает иллюзию, что так партнер не сможет предать, ведь Вы всегда знаете где он, с кем и чем занят. Любое отвержение становится драмой из-за недостатка любви к себе, научиться справляться с ним поможет Архетип Души.`;
            stamp2__name = "Мать/Жена";
            stamp2__text = `Когда Архетип проявлен в минусе:
            <br>Вы - истеричная личность, которая не слезает с эмоциональных качелей. Страдаете от расстройства пищевого поведения, не обращаете внимание на свои потребности, а испытывать дискомфорт уже стало для Вас нормой. Очень консервативны и любите раздавать непрошеные советы. Склонны к гиперопеке и гиперконтролю, потому что не способны доверять своим близким. Видите в своем мужчине неуклюжего ребенка, который без Вас никак не справится, и часто берете слишком много на себя. Вы не можете перейти в Архетип Жены и предпочитаете оставаться <span class="stamp__hidden">Читать далее...</span><br> матерью для партнера. Жена в минусовом проявлении ревнива, завистлива и не понимает своих истинных желаний. Вам сложно строить долгосрочные отношения и решиться на создание семьи.  
            <br><br>Когда Архетип проявлен в плюсе:
            <br>Вокруг Вас царит атмосфера тепла и любви, что способствует развитию нового будь то ребенок, идея, творческий проект. Как зрелая мать, Вы становитесь благославляющей силой для своих детей и учите их жить из состояния наполненности, а не дефицита. Как жена, вы способны построить здоровые и взаимозависимые отношения. Это значит, что Вы вступаете в них с равноценным партнером и выбираете друг друга каждый день. Между вами царит гармония, взаимная любовь и уважение, при этом каждый остается полноценной личностью.
            `;
            stamp3__name = "Режиссёр";
            stamp3__text = "Вы - талантливый продажник, ведь Вы обладаете даром сердечного убеждения и дипломатии. Продажи происходят легко и искренне в виде рекомендации. Легко даются коммуникации с людьми, они охотно верят и считаются с Вашим мнением. С легкостью можете руководить творческим процессом, обладаете даром гостеприимства и открытости. Вам легче всего реализовать себя, чувствуя, что Вы являетесь частью командного процесса. HR-менеджер, сетевой маркетинг, сфера услуг, директор, режиссёр, эксперт, консультант, менеджер по рекламе, общественные связи, продажи.";
            stamp__number = "4";
            break;
        case 5:
            stamp1linkText = "Чувство Вины";
            stamp2linkText = "Королева";
            stamp3linkText = "Управленец";
            stamp1__name = "Чувство Вины";
            stamp1__text = ` Ваше глубинное чувство - это Вина. Причем не за что-то конкретное, а за сам факт своего существования. Вы постоянно без объективной надобности извиняетесь и изо всех сил стремитесь минимизировать свои желания и потребности, чтобы не причинять окружающим лишнего дискомфорта. Внутри живет ощущение, что Вы всем должны и делаете слишком мало, а рядом всегда есть те, кто хочет этим воспользоваться. Порой Вам кажется, что от Вас зависит счастье других людей, что открывает потайной чулан с гордыней внутри. С раннего детства привыкли на самом глубинном уровне испытывать вину. Когда кому-то из родителей <span class="stamp__hidden">Читать далее...</span><br> было больно, Вы считали себя главной причиной этой боли. Постоянно ждёте наказания от окружающего мира и вините себя ещё больше. Научиться справляться с чувством вины Вам поможет Архетип Души.`;
            stamp2__name = "Королева";
            stamp2__text = `Когда Архетип проявлен в минусе: 
            <br>Вам сложно проявлять себя на людях. Есть склонность к болезням горла, и часто отсутствует музыкальный слух. Вы деспотичны, авторитарны и агрессивны. Подавляете свои истинные потребности и желания, начиная от простых бытовых удобств, заканчивая личной жизнью. Вы - холодная, безэмоциональная и надменная Снежная королева. Для собственной защиты Вы предпочли вытеснить все чувства, чтобы избежать внутренней боли. Очень часто сдерживаете себя и будто сами не пускаете необходимые блага в свою жизнь. Не считаетесь с чужим <span class="stamp__hidden">Читать далее...</span><br> мнением и любой ценой пытаетесь сохранить контроль. Зачастую пробуете конкурировать с мужчинами, проявляете жестокость в отношениях и развиваете мужские качества.
            <br><br>Когда Архетип проявлен в плюсе:
            <br>Вы - настоящая Королева, которая сражает наповал своей статью и достоинством. Идёте по жизни с высоко поднятой головой, но при этом в Вас совершенно нет тщеславия, только дух благородных королей.  Вы - мудрая женщина, которая четко осознает свои чувства и желания, а также знает как удовлетворить их легко и естественно. Щедры и считаете за честь помочь своим друзьям, коллегам, родственникам, соседям и тд. Вам свойственно глубокое чувство достоинства, идущее изнутри. Оно  помогает избежать ненужных контактов и открывает любые двери, привлекает благоденствие в свою жизнь и жизнь Вашего окружения. Главный талант - умение пробуждать это чувство в тех, с кем взаимодействуете. Все вокруг Вас купаются в изобилии и красоте. Королева активна, имеет высокий уровень социальной реализации и признание мужчин.
            `;
            stamp3__name = "Управленец";
            stamp3__text = ` Ваша задача - это управлять. Любой проект, за который берётесь, Вы способны вывести на новый уровень и сделать его достоянием всего мира. 
            <br>Вы не боитесь брать ответственность на себя и способны не только изменить структуру бизнеса, но и задать ему новые цели. Управленец, промоутер, проект-менеджер, организатор.
            `;
            stamp__number = "5";
            break;
        case 6:
            stamp1linkText = "Чувство Разделённости";
            stamp2linkText = "Жрица";
            stamp3linkText = "Инвестор";
            stamp1__name = "Чувство Разделённости";
            stamp1__text = `Ваше глубинное чувство - это Разделённость. Ощущение глубинной грусти и тоски не покидает с детства. Создается ощущение, что Вы не получите должно внимания и любви, потому что не достойны этого. Боязнь одиночества приводит к неумению выстраивать крепкие доверительные отношения и реализоваться в качестве равноценного партнера. Все время есть ощущение, что Вы где-то потеряли кусочек своей Души. Кажется, что этот мир никогда не сможет Вас принять, и поэтому ему срочно нужно доказать, что Вы чего-то стоите, самоутверждаясь за счет других. Научиться справляться с ощущением разделенности поможет Архетип Души.`;
            stamp2__name = "Жрица";
            stamp2__text = `Архетип, который выражен в Вас ярче всего, это Жрица.
            <br><br>Когда Архетип проявлен в минусе:
            <br>Отдаете всю свою энергию на спасение окружающих, но при этом не успеваете восстанавливаться и быстро истощаетесь. Чтобы чувствовать единство с миром и не испытывать страха одиночества, продолжаете одаривать окружающих несмотря на свою усталость. Всячески закрываясь от мира, становитесь к нему равнодушной, наблюдаете за всеми, как рак отшельник. <span class="stamp__hidden">Читать далее...</span><br> Постоянно сравниваете себя с другими и навязчиво ждёте одобрения, признания или хотя бы крошечной похвалы. Можете быть с кем-то, лишь бы не оставаться одной, и пытаетесь быть удобной, чтобы заслужить любовь. 
            <br><br>Когда Архетип проявлен в плюсе:
            <br>Вы имеете магическую связь со вселенной и источником творения всего сущего, являетесь своеобразным звеном между материальным и духовным мирами. Вы обладаете спокойным разумом, тонкой чувствительностью, склонны к рефлексии и ощущаете себя хозяйкой своей реальности. Глубокое понимание взаимодействия внутреннего и внешнего делает Вас волшебницей, способной изменить весь мир лишь одним своим присутствием, а жизненный путь легок и полон приятных сюрпризов.  
            `;
            stamp3__name = "Инвестор";
            stamp3__text = ` Главная задача - учить других людей, причем делать это самыми различными способами, но, что важно, в мягкой форме. Любите быть в роли учителя из позиции любви и доверия к своему ученику. 
            <br>Вы всегда можете найти подход и самый верный способ донести информацию конкретному человеку. Ваша Душа расцветает от деятельности, связанной с различной формой помощи людям. Истинное призвание быть филантропом, меценатом или инвестором в проекты, за которыми стоит будущее, возглавлять социальные движения.
            `;
            stamp__number = "6";
            break;
    }
    document.getElementById("stamp1linkText").innerHTML = stamp1linkText;
    document.getElementById("stamp2linkText").innerHTML = stamp2linkText;
    document.getElementById("stamp3linkText").innerHTML = stamp3linkText;
    document.getElementById("stamp1__name").innerHTML = stamp1__name;
    document.getElementById("stamp1__text").innerHTML = stamp1__text;
    document.getElementById("stamp2__name").innerHTML = stamp2__name;
    document.getElementById("stamp2__text").innerHTML = stamp2__text;
    document.getElementById("stamp3__name").innerHTML = stamp3__name;
    document.getElementById("stamp3__text").innerHTML = stamp3__text;
    document.getElementById("stamp__number").innerHTML = stamp__number;
    document.querySelectorAll(".stamp__hidden").forEach((elem) => {
        elem.addEventListener("click", (e) => {
            console.log(1);
            e.target.parentNode.classList.add("shown");
        });
    });
};

Calc.prototype.yandexGeoAPI = function() {
    const city = this.birthplaceDom.value ? this.birthplaceDom.value : "Москва";
    return fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=b1b7a737-e8c9-41e4-9e3c-6ee04a3a3b5a&geocode=${city}&format=json`)
    .then(
        (res)=> {
            return res.json();
        }
    )
    .then(
        (data) => {
            return data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
        }
    );
}

Calc.prototype.geonamesAPI = function(LangAndPos) {
    console.log(LangAndPos);
    return fetch(`https://secure.geonames.org/timezoneJSON?lat=${LangAndPos[1]}&lng=${LangAndPos[0]}&username=upndrey`)
    .then(
        (res)=> {
            return res.json();
        }
    )
    .then(
        (data) => {
            console.log(data);
            return data;
        }
    );
}

Calc.prototype.bingAPI = function(LangAndPos) {
    return fetch(`https://dev.virtualearth.net/REST/v1/TimeZone/${LangAndPos}?key=Anf-FzJYt-qzF54-19rju-MoXDgV0iyNGEdiJacmdi7S9u1wzdCQ5P1W06EQ3s41`)
    .then(
        (res)=> {
            return res.json();
        }
    )
    .then(
        (data) => {
            console.log(data);
            return data.resourceSets[0].resources[0].timeZone;
        }
    );
};

Calc.prototype.ipgeoAPI = function(LangAndPos) {
    const dateArr = this.birthdayDom.value.split(".");
    const day = dateArr[0];
    const month = dateArr[1];
    const year = dateArr[2];
    let time = "00:00";
    if(this.birthtimeDom.value)
        time = this.birthtimeDom.value;
    const timeArr = time.split(":");
    const hour = timeArr[0];
    const minute = timeArr[1];
    console.log(hour, minute);
    console.log(`https://api.ipgeolocation.io/timezone/convert?apiKey=207212f0704e43d480fb5b6625e2f1e8&lang=ru&time=${year}-${month}-${day}%20${hour}:${minute}&lat_from=${LangAndPos[1]}&long_from=${LangAndPos[0]}&lat_to=0&long_to=0`);
    return fetch(`https://api.ipgeolocation.io/timezone/convert?apiKey=207212f0704e43d480fb5b6625e2f1e8&lang=ru&time=${year}-${month}-${day}%20${hour}:${minute}&lat_from=${LangAndPos[1]}&long_from=${LangAndPos[0]}&lat_to=0&long_to=0`)
    .then(
        (res)=> {
            return res.json();
        }
    )
    .then(
        (data) => {
            console.log(data);
            return data;
        },
        (error) => {
            console.log(error);
            return error;
        }
    );
};

Calc.prototype.astroAPI = async function(ts) {
    let date = new Date(ts.converted_time);
    console.log(date);
    return fetch(`https://vibracii-dushi.tmweb.ru/server.php?d=${date.getDate()}&m=${date.getMonth() + 1}&y=${date.getFullYear()}&h=${("0" + date.getHours()).slice(-2)}&mi=${("0" + date.getMinutes()).slice(-2)}`)
    .then(
        (res)=> {
            console.log(res);
            return res.json();
        }
    )
    .then(
        (data) => {
            console.log(data.D.data.MARS.gate.line);
            return data.D.data.MARS.gate.line;
        }
    );
};


Calc.prototype.transformLayersBack = function(stepsCount) {
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        this.domEndModification();
        window.scroll(0,findPos(document.getElementById("calc__wrapper"), -100));
        mq = window.matchMedia( "(max-width: 1160px)" );
        if (!mq.matches) {
            this.transformationStep = 0;
            this.rotation = -1 * 25 / 2;

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
    var gradient3 = this.ctx.createLinearGradient(0, 0, 0, 900);
    gradient3.addColorStop(0, "rgba(98, 102, 165, 1)");
    gradient3.addColorStop(1, "rgba(189, 159, 211, 0)");
    this.layer3Transform(stepsCount, {
        centerX: 0,
        centerY: 0,
        minRadiusX: 250,
        minRadiusY: 250,
        rotation: 0,
        moveSizeX: 0,
        moveSizeY: 0,
        radiusSizeX: 35,
        radiusSizeY: 35,
        lineWidth: 1,
        color: gradient3,
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
        colorR = 234;
        colorG = 157;
        colorB = 195;
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
    let color3;
    if(this.gender == "Мужской") {
        var gradient3 = this.ctx.createLinearGradient(0, 0, 0, 900);
        gradient3.addColorStop(0, "rgba(98, 102, 165, 1)");
        gradient3.addColorStop(1, "rgba(189, 159, 211, 0)");
        color3 = gradient3;
    }
    else {
        var gradient3 = this.ctx.createLinearGradient(0, 0, 0, 900);
        gradient3.addColorStop(0, "rgba(98, 102, 165, 1)");
        gradient3.addColorStop(1, "rgba(189, 159, 211, 0)");
        color3 = gradient3;
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
        color: color3,
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
    
    window.requestAnimationFrame(this.drawLayers.bind(this));
    //this.drawLayers();
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
    this.layer3Params.color = endParams.color;
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
    this.stepsCount = 30;
    
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
    document.getElementById("video__container").classList.add("active");
};

Details.prototype.transform = function(drawInterval) {
    let params = JSON.parse(JSON.stringify(this));
    // let interval = setInterval(() => {
    //     this.transformationHandler(params);
    //     if(this.step == this.stepsCount) {
    //         clearInterval(interval);
    //         clearInterval(drawInterval);
    //         this.step = 0;
    //     }
    //     this.step++;
    // }, 40);
    function stepFunc() {
        this.transformationHandler(params);
        if(this.step >= this.stepsCount) {
            //clearInterval(interval);
            clearInterval(drawInterval);
            this.step = 0;
        }
        this.step++;
        window.requestAnimationFrame(stepFunc.bind(this));
    }
    stepFunc.call(this);
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
        //this.transformX = this.tFormula(params.transformX, );
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

    mq = window.matchMedia( "(max-width: 1160px)" );
    if (mq.matches) {
        if(this.state > this.lastState)
            this.state = 0;
        else if(this.state < 0)
            this.state = this.lastState;
    }
    else {
        if(this.state > this.lastState)
            this.state = this.lastState;
        else if(this.state < 0)
            this.state = 0;
    }

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
    mq = window.matchMedia( "(max-width: 1160px)" );
    if (!mq.matches) {
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