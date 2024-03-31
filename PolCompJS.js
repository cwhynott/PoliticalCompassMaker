document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');

    let topLabel = "Top";
    let bottomLabel = "Bottom";
    let leftLabel = "Left";
    let rightLabel = "Right";

    let points = []; // Array to store points and their labels

    drawGraph();

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const label = prompt('Enter label for this point:');
        if (label !== null) { // Check if label is not null (user didn't click cancel)
            points.push({ x, y, label });
            drawGraph();
        }
    });

    canvas.addEventListener('mousedown', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check if the mouse is near any existing point
        const index = findNearbyPointIndex(x, y);
        if (index !== -1) {
            const confirmation = window.confirm("Are you sure you want to remove this point?");
            if (confirmation) {
                points.splice(index, 1); // Remove the point at the found index
                drawGraph();
            }
        }
    });

    document.getElementById('topLabel').addEventListener('input', function() {
        topLabel = this.value;
        drawGraph();
    });

    document.getElementById('bottomLabel').addEventListener('input', function() {
        bottomLabel = this.value;
        drawGraph();
    });

    document.getElementById('leftLabel').addEventListener('input', function() {
        leftLabel = this.value;
        drawGraph();
    });

    document.getElementById('rightLabel').addEventListener('input', function() {
        rightLabel = this.value;
        drawGraph();
    });

    function drawGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Define quadrant colors
        const topLeftColor = '#F0BDBC';
        const topRightColor = '#A1D8F4';
        const bottomLeftColor = '#CDE3BF';
        const bottomRightColor = '#DDC8DE';

        ctx.fillStyle = topLeftColor;
        ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

        ctx.fillStyle = topRightColor;
        ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);

        ctx.fillStyle = bottomLeftColor;
        ctx.fillRect(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);

        ctx.fillStyle = bottomRightColor;
        ctx.fillRect(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    
        // Draw axes
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    
        // Draw arrowhead pointing up
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2 - 5, 10);
        ctx.lineTo(canvas.width / 2 + 5, 10);
        ctx.closePath();
        ctx.fillStyle = '#000';
        ctx.fill();

        // Draw arrowhead pointing down
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height);
        ctx.lineTo(canvas.width / 2 - 5, canvas.height - 10);
        ctx.lineTo(canvas.width / 2 + 5, canvas.height - 10);
        ctx.closePath();
        ctx.fill();
    
        // Draw arrowhead pointing right
        ctx.beginPath();
        ctx.moveTo(canvas.width, canvas.height / 2);
        ctx.lineTo(canvas.width - 10, canvas.height / 2 - 5);
        ctx.lineTo(canvas.width - 10, canvas.height / 2 + 5);
        ctx.closePath();
        ctx.fill();

        // Draw arrowhead pointing left
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(10, canvas.height / 2 - 5);
        ctx.lineTo(10, canvas.height / 2 + 5);
        ctx.closePath();
        ctx.fill();
    
        // Draw points
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.closePath();
    
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText(point.label, point.x, point.y - 10);
        });
    
        // Draw axis labels
        ctx.fillStyle = '#000';
        ctx.textAlign = 'left';
        ctx.fillText(topLabel, (canvas.width / 2) + 10, 20);
        ctx.fillText(bottomLabel, (canvas.width / 2) + 14, canvas.height - 10);
        ctx.fillText(leftLabel, 15, (canvas.height / 2) - 6);
        ctx.textAlign = 'right';
        ctx.fillText(rightLabel, canvas.width - 20, (canvas.height / 2) - 8);
    }
        

    function findNearbyPointIndex(x, y) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const distanceSquared = (point.x - x) ** 2 + (point.y - y) ** 2;
            if (distanceSquared <= 25) { // If the click is within 5 pixels of the point
                return i; // Return the index of the point
            }
        }
        return -1; // If no nearby point is found
    }
});
