// Assignment 0: Vector Library .js file
function main() {
    // Retrieve <canvas> element
    const canvas = document.getElementById("example");
    if (!canvas) {
        console.error("Failed to retrieve the <canvas> element.");
        return;
    }

    // Get the rendering context for 2DCG
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get the 2D context.");
        return;
    }

    // Set the background to black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Attach event listener to the main draw button
    const drawButton = document.getElementById("draw-button");
    drawButton.addEventListener("click", () => handleDrawEvent(ctx));

    // Attach event listener to the operation button
    const operationButton = document.getElementById("operation-button");
    operationButton.addEventListener("click", () => handleDrawOperationEvent(ctx));
}

// Function to draw a vector on the canvas
function drawVector(ctx, v, color) {
    const scale = 20;

    // Extract the scaled vector coordinates
    const x = v.elements[0] * scale;
    const y = v.elements[1] * scale;

    // Set the drawing style
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Draw the vector starting from the origin (200, 200)
    ctx.beginPath();
    ctx.moveTo(200, 200); // Canvas origin
    ctx.lineTo(200 + x, 200 - y); // Scaled vector endpoint
    ctx.stroke();
}

// Function to handle the draw event triggered by the draw button
function handleDrawEvent(ctx) {
    // Clear the canvas and redraw the background
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Get coordinates for v1 and v2
    const x1 = parseFloat(document.getElementById("x-coord").value) || 0;
    const y1 = parseFloat(document.getElementById("y-coord").value) || 0;
    const x2 = parseFloat(document.querySelectorAll("#x-coord")[1].value) || 0;
    const y2 = parseFloat(document.querySelectorAll("#y-coord")[1].value) || 0;

    // Create vectors
    const v1 = new Vector3([x1, y1, 0.0]);
    const v2 = new Vector3([x2, y2, 0.0]);

    // Draw the vectors
    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");
}

// Function to compute the angle between two vectors
function angleBetween(v1, v2) {
    const dotProduct = Vector3.dot(v1, v2);
    const magnitudeV1 = v1.magnitude();
    const magnitudeV2 = v2.magnitude();
    const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);

    // Calculate the angle in radians and then convert it to degrees
    const angleInRadians = Math.acos(cosTheta);
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    return angleInDegrees; // Returning the angle in degrees for easier interpretation
}

// Function to compute the area of a triangle formed by vectors v1 and v2
function areaTriangle(v1, v2) {
    const crossProd = Vector3.cross(v1, v2); // Get the cross product of v1 and v2
    const areaParallelogram = crossProd.magnitude(); // Magnitude of the cross product gives the area of the parallelogram
    const areaTriangle = areaParallelogram / 2; // Area of triangle is half the area of the parallelogram
    console.log("Area of triangle formed by v1 and v2: " + areaTriangle.toFixed(2));
    return areaTriangle;
}

// Function to handle the operation event triggered by the operation button
function handleDrawOperationEvent(ctx) {
    // Clear the canvas and redraw the background
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Get coordinates for v1 and v2
    const x1 = parseFloat(document.getElementById("x-coord").value) || 0;
    const y1 = parseFloat(document.getElementById("y-coord").value) || 0;
    const x2 = parseFloat(document.querySelectorAll("#x-coord")[1].value) || 0;
    const y2 = parseFloat(document.querySelectorAll("#y-coord")[1].value) || 0;

    const v1 = new Vector3([x1, y1, 0.0]);
    const v2 = new Vector3([x2, y2, 0.0]);

    // Get the operation selected in the dropdown
    const operation = document.getElementById("operation-selector").value;
    const scalar = parseFloat(document.getElementById("scalar-input").value) || 1;

    switch (operation) {
        case "magnitude":
            const v1Mag = v1.magnitude();
            const v2Mag = v2.magnitude();
            console.log("Magnitude of v1:", v1Mag);
            console.log("Magnitude of v2:", v2Mag);
            drawVector(ctx, v1, "red");
            drawVector(ctx, v2, "blue");
            break;

        case "normalize":
            const v1Normalized = new Vector3(v1.elements).normalize();
            const v2Normalized = new Vector3(v2.elements).normalize();
            console.log("Normalized v1:", Array.from(v1Normalized.elements));
            console.log("Normalized v2:", Array.from(v2Normalized.elements));
            drawVector(ctx, v1, "red");
            drawVector(ctx, v2, "blue");
            drawVector(ctx, v1Normalized, "green");
            drawVector(ctx, v2Normalized, "green");
            break;

        case "add":
            const v3 = new Vector3(v1.elements).add(v2);
            console.log("v1 + v2:", Array.from(v3.elements));
            drawVector(ctx, v1, "red");
            drawVector(ctx, v2, "blue");
            drawVector(ctx, v3, "green");
            break;

        case "subtract":
            const v3Sub = new Vector3(v1.elements).sub(v2);
            console.log("v1 - v2:", Array.from(v3Sub.elements));
            drawVector(ctx, v1, "red");
            drawVector(ctx, v2, "blue");
            drawVector(ctx, v3Sub, "green");
            break;

        case "multiply":
            const v3Mul = new Vector3(v1.elements).mul(scalar);
            const v4Mul = new Vector3(v2.elements).mul(scalar);
            console.log("v1 * scalar:", Array.from(v3Mul.elements));
            console.log("v2 * scalar:", Array.from(v4Mul.elements));
            drawVector(ctx, v1, "red");
            drawVector(ctx, v2, "blue");
            drawVector(ctx, v3Mul, "green");
            drawVector(ctx, v4Mul, "green");
            break;

        case "divide":
            if (scalar === 0) {
                console.error("Division by zero is not allowed.");
                return;
            }
            const v3Div = new Vector3(v1.elements).div(scalar);
            const v4Div = new Vector3(v2.elements).div(scalar);
            console.log("v1 / scalar:", Array.from(v3Div.elements));
            console.log("v2 / scalar:", Array.from(v4Div.elements));
            drawVector(ctx, v1, "red");
            drawVector(ctx, v2, "blue");
            drawVector(ctx, v3Div, "green");
            drawVector(ctx, v4Div, "green");
            break;

        case "anglebetween":
            const angle = angleBetween(v1, v2);
            console.log("Angle between v1 and v2: " + angle.toFixed(2) + " degrees");
            drawVector(ctx, v1, "red");
            drawVector(ctx, v2, "blue");
            break;

        case "area":
            const area = areaTriangle(v1, v2);
            console.log("Area of triangle formed by v1 and v2: " + area.toFixed(2));
            drawVector(ctx, v1, "red");
            drawVector(ctx, v2, "blue");
            break;

        default:
            console.log("Invalid operation");
    }
}
