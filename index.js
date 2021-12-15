document.addEventListener("DOMContentLoaded", main);
function main() {
    const figure = new Figure();
    figure.setLayer1Params({
        centerX: 100,
        centerY: -100,
        color: "#3f45a7",
        radius: 100,
    });
    figure.setLayer2Params({
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
    for(let i = 0; i < 11; i++) {
        list.push(20);
    }
    figure.setLayer3Params({
        centerX: 0,
        centerY: 0,
        color: "#6c6598",
        count: 11,
        list: list,
        minRadiusX: 250,
        minRadiusY: 250,
        rotation: 0,
        radiusSizeX: 20,
        radiusSizeY: 20,
        moveSizeX: 0,
        moveSizeY: 0,
        lineWidth: 1,
    });
    figure.init();

    document.getElementById("someButton").addEventListener("click", figure.transformLayers.bind(figure, 100), {once: true});
    
}

function Figure(canvas = document.getElementById("canvas")) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rotation = 0;
    this.layer1Params = null;
    this.layer1ParamsTemp = null;
    this.layer2Params = null;
    this.layer2ParamsTemp = null;
    this.layer3Params = null;
    this.layer3ParamsTemp = null;
}

Figure.prototype.init = function() {
        this.setTemporaryParams();
        this.ctx.translate(500, 550);
        this.drawLayers();
};

Figure.prototype.setTemporaryParams = function() {
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        this.layer1ParamsTemp = JSON.parse(JSON.stringify(this.layer1Params));
        this.layer2ParamsTemp = JSON.parse(JSON.stringify(this.layer2Params));
        this.layer3ParamsTemp = JSON.parse(JSON.stringify(this.layer3Params));
    }
}

Figure.prototype.drawLayers = function() {
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        this.ctx.clearRect(-500, -500, this.canvas.width, this.canvas.height);
        this.ctx.rotate(this.rotation * Math.PI / 180)
        this.drawLayer3Part2();
        this.drawLayer2Part1();
        this.drawLayer2Transformed();
        this.drawLayer2Part2();
        this.drawLayer1();
        this.drawLayer3Part1();
    }
};

Figure.prototype.transformLayers = function(stepsCount) {
    if(this.layer1Params && this.layer2Params && this.layer3Params) {
        this.transformationStep = 0;
        
        this.rotation = 25 * 1/stepsCount;
        let interval = setInterval(() => {
            this.transformationHandler(stepsCount);
            if(this.transformationStep == stepsCount) {
                clearInterval(interval);
                this.setTemporaryParams();
                this.transformationStep = 0;
            }
        }, 20);
    }
};

Figure.prototype.transformationHandler = function(stepsCount) {
    
    this.layer1Transform(stepsCount, {
        centerX: 0,
        centerY: -60,
        radius: 100
    });
    this.layer2Transform(stepsCount, {
        centerX: 0,
        centerY: 0,
        radius: 250,
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
    this.drawLayers();
    this.transformationStep += 1;
}

Figure.prototype.setLayer1Params = function(params) {
    if(this.layer1Params) {
        Object.keys(params).forEach((elem) => {
            this.layer1Params[elem] = params[elem];
        });
    }
    else
        this.layer1Params = params;
};

Figure.prototype.setLayer2Params = function(params) {
    if(this.layer2Params) {
        Object.keys(params).forEach((elem) => {
            this.layer2Params[elem] = params[elem];
        });
    }
    else
        this.layer2Params = params;
};

Figure.prototype.setLayer3Params = function(params) {
    if(this.layer3Params) {
        Object.keys(params).forEach((elem) => {
            this.layer3Params[elem] = params[elem];
        });
    }
    else
        this.layer3Params = params;
};

Figure.prototype.drawLayer1 = function() {
    params = this.layer1Params;

    this.ctx.beginPath();
    this.ctx.arc(params.centerX, params.centerY, params.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = params.color;
    this.ctx.fill();
    this.ctx.closePath();
};

Figure.prototype.drawLayer2Part1 = function() {
    params = this.layer2Params;

    this.ctx.beginPath();
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius, 0, 0, 1*Math.PI);    
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    this.ctx.fillStyle = `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, 1)`;
    this.ctx.fill();
    this.ctx.closePath();
};

Figure.prototype.drawLayer2Part2 = function() {
    params = this.layer2Params;


    let gradient2 = this.ctx.createLinearGradient(-250, -250, 250, 250);
    gradient2.addColorStop(0, `rgba(147, 96, 175, ${params.colorA})`);
    gradient2.addColorStop(1, `rgba(255, 255, 255, ${params.colorA})`);

    this.ctx.beginPath();
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius, .25, 0, 2*Math.PI); 
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    this.ctx.fillStyle = gradient2;
    this.ctx.fill();
    this.ctx.closePath();

    let gradient1 = this.ctx.createRadialGradient(50,-50,150, 50,-50,250);
    gradient1.addColorStop(0, `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, ${params.colorA})`);
    gradient1.addColorStop(1, `rgba(${params.colorR}, ${params.colorG}, ${params.colorB}, 0)`);

    this.ctx.beginPath();
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius, .25, 0, 2*Math.PI); 
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    this.ctx.fillStyle = gradient1;
    this.ctx.fill();
    this.ctx.closePath();
};

Figure.prototype.drawLayer2Transformed = function() {
    params = this.layer2Params;

    this.ctx.beginPath();
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius, params.radius - 150, 0, 0, 2*Math.PI);    
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    this.ctx.fillStyle = "#568bd7";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.moveTo(params.centerX - params.radius, params.centerY);
    this.ctx.ellipse(params.centerX, params.centerY, params.radius - 125, params.radius - 200, 0, 0, 2*Math.PI);    
    this.ctx.lineTo(params.centerX - params.radius, params.centerY);
    this.ctx.fillStyle = "#5373c8";
    this.ctx.fill();
    this.ctx.closePath();
};

Figure.prototype.drawLayer3Part1 = function() {
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

Figure.prototype.drawLayer3Part2 = function() {
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


Figure.prototype.layer1Transform = function(stepsCount, endParams) {
    let tempParam = this.layer1ParamsTemp;
    this.setLayer1Params({
        radius: tempParam.radius + (endParams.radius - tempParam.radius) * this.transformationStep / stepsCount,
        centerX: tempParam.centerX + (endParams.centerX - tempParam.centerX) * this.transformationStep / stepsCount,
        centerY: tempParam.centerY + (endParams.centerY - tempParam.centerY) * this.transformationStep / stepsCount
    });
};

Figure.prototype.layer2Transform = function(stepsCount, endParams) {
    let tempParam = this.layer2ParamsTemp;
    this.setLayer2Params({
        radius: tempParam.radius + (endParams.radius - tempParam.radius) * this.transformationStep / stepsCount,
        centerX: tempParam.centerX + (endParams.centerX - tempParam.centerX) * this.transformationStep / stepsCount,
        centerY: tempParam.centerY + (endParams.centerY - tempParam.centerY) * this.transformationStep / stepsCount,
        colorA: tempParam.colorA + (endParams.colorA - tempParam.colorA) * this.transformationStep / stepsCount
    });
};

Figure.prototype.layer3Transform = function(stepsCount, endParams) {
    let tempParam = this.layer3ParamsTemp;
    this.layer3Params.list = this.layer3Params.list.map((listElem, i) => {
        return tempParam.list[i] + (endParams.list[i] - tempParam.list[i]) * this.transformationStep / stepsCount;
    });
    this.setLayer3Params({
        minRadiusX: tempParam.minRadiusX + (endParams.minRadiusX - tempParam.minRadiusX) * this.transformationStep / stepsCount,
        minRadiusY: tempParam.minRadiusY + (endParams.minRadiusY - tempParam.minRadiusY) * this.transformationStep / stepsCount,
        rotation: tempParam.rotation + (endParams.rotation - tempParam.rotation) * this.transformationStep / stepsCount,
        centerX: tempParam.centerX + (endParams.centerX - tempParam.centerX) * this.transformationStep / stepsCount,
        centerY: tempParam.centerY + (endParams.centerY - tempParam.centerY) * this.transformationStep / stepsCount,
        moveSizeX: tempParam.moveSizeX + (endParams.moveSizeX - tempParam.moveSizeX) * this.transformationStep / stepsCount,
        moveSizeY: tempParam.moveSizeY + (endParams.moveSizeY - tempParam.moveSizeY) * this.transformationStep / stepsCount,
        radiusSizeX: tempParam.radiusSizeX + (endParams.radiusSizeX - tempParam.radiusSizeX) * this.transformationStep / stepsCount,
        radiusSizeY: tempParam.radiusSizeY + (endParams.radiusSizeY - tempParam.radiusSizeY) * this.transformationStep / stepsCount,
        lineWidth: tempParam.lineWidth + (endParams.lineWidth - tempParam.lineWidth) * this.transformationStep / stepsCount,
    });
};