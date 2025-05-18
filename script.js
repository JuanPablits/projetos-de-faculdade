const steps = document.querySelectorAll(".step");
let currentStep = 0;

function mostrarEtapa(index) {
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === index);
    });
}

function proximaEtapa() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        mostrarEtapa(currentStep);
    }
}

function voltarEtapa() {
    if (currentStep > 0) {
        currentStep--;
        mostrarEtapa(currentStep);
    }
}