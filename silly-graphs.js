class SillyGraph {
    margins = {
        "left": 25,
        "right": 25,
        "top": 25,
        "bottom": 25,
    }

    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }


    drawAxis(){       
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'black';
        // Y line
        this.context.beginPath();
        this.context.moveTo(2*this.margins.left, this.margins.top);
        this.context.lineTo(2*this.margins.left, this.height-2*this.margins.bottom);
        this.context.closePath();
        this.context.stroke();
        this.context.beginPath();
    
        // Y arrow tip
        this.context.moveTo(this.margins.left, 2*this.margins.top);
        this.context.lineTo(2*this.margins.left, this.margins.top);
        this.context.lineTo(3*this.margins.left, 2*this.margins.top);
        this.context.stroke();
    
        // X line
        this.context.beginPath();
        this.context.moveTo(2*this.margins.left, this.height-2*this.margins.bottom);
        this.context.lineTo(this.width-this.margins.right, this.height-2*this.margins.bottom);
        this.context.closePath();
        this.context.stroke();
    
        // X arrow tip
        this.context.moveTo(this.width-2*this.margins.right, this.height-3*this.margins.top);
        this.context.lineTo(this.width-this.margins.right, this.height-2*this.margins.top);
        this.context.lineTo(this.width-2*this.margins.right, this.height-this.margins.top);
        this.context.stroke();
    }
    getLabels(axis){
        if(axis.labels){
            if(axis.labels instanceof Array){
                return axis.labels;
            } else {
                const step = (axis.max !== undefined && axis.min !== undefined) ? (axis.max-axis.min)/(axis.labels-1) : 1;
                const start = axis.min ? axis.min : 0;
                return Array.from({length: axis.labels}, (v, i) => Math.round(start+i*step));
            }
        }
    }

    getScaleFactor(axis, min, max){
        let relativeMin = 1;
        let relativeMax = 2;
        if(axis.max !== undefined  && axis.min !== undefined ) {
            relativeMax = axis.max;
            relativeMin = axis.min;
        } else {
            if(axis.labels instanceof Array){
                relativeMin = Number(axis.labels[0]);
                relativeMax = Number(axis.labels.slice(-1));
                if(isNaN(relativeMax) || isNaN(relativeMin)) {
                    relativeMin = 0;
                    relativeMax = axis.labels.length;
                }
            }
        }
        return (max-min)/(relativeMax-relativeMin)
        

    }

    drawLabelsX(axis){
        const labels = this.getLabels(axis)
        console.log("Labels", labels);
        const stepX = (this.maxX - this.minX) / (labels.length-1);
        const labelTemplate = axis.labelTemplate ? axis.labelTemplate : '#';
        labels.forEach((label, index) => {
            this.context.save();
            this.context.translate(this.minX+this.margins.left*2+(index-1)*stepX, this.height-this.margins.bottom);
            this.context.rotate(-Math.PI/4);
            this.context.fillText(labelTemplate.replace('#', String(label)), 0, this.margins.bottom);
            this.context.restore();
        });
    };
    
    drawLabelsY(axis) {
       
        const labels = this.getLabels(axis);
        console.log("Labels", labels);
        const stepY = (this.minY - this.maxY) / (labels.length-1);
        const labelTemplate = axis.labelTemplate ? axis.labelTemplate : '#';
        labels.forEach((label, index) => {
            this.context.fillText(labelTemplate.replace('#', String(label)), 0.25*this.margins.left, this.minY-index*stepY);
        }); 
    };
    
    drawPoints(points, graphData){

        this.context.lineWidth = 3;
        this.context.strokeStyle = '#459AED';
        if(graphData.config?.lineWidth) {this.context.lineWidth = graphData.config.lineWidth;}
        if(graphData.config?.color) {this.context.strokeStyle = graphData.config.color;}
        
        this.context.beginPath();
        this.context.moveTo(this.minX+points[0].x*this.scaleX, this.minY-points[0].y*this.scaleY);
        points.slice(1).forEach(point => {
            this.context.lineTo(this.minX+point.x*this.scaleX, this.minY-point.y*this.scaleY);
        });
        this.context.stroke();
    
    }
    
    load(graphData) {
        this.width  = this.canvas.getBoundingClientRect().width;
        this.height  = this.canvas.getBoundingClientRect().height;
        this.maxY = this.margins.top*2.5;
        this.minY = this.height-2.5*this.margins.bottom;
        this.maxX = this.width-this.margins.right*2;
        this.minX = 2*this.margins.left;
        this.scaleX = 1;
        this.scaleY = 1;
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.font = "12px Arial";
        this.drawAxis();
        if(graphData.axisX){
            this.drawLabelsX(graphData.axisX);
            this.scaleX = this.getScaleFactor(graphData.axisX, this.minX, this.maxX);
        }
        if(graphData.axisY){
            this.drawLabelsY(graphData.axisY);
            this.scaleY = this.getScaleFactor(graphData.axisY, this.maxY, this.minY);
        }
        if(graphData.points){
            this.drawPoints(graphData.points, graphData);
        }
        console.log(this.scaleX)
        console.log(this.scaleY)
    };
}


