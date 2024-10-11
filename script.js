document.addEventListener('DOMContentLoaded', function() {
 
    var clearAllButton = document.getElementById('clearAll');
    
    clearAllButton.addEventListener('click', function() {
        var inputs = document.getElementsByTagName('input');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const mortgageAmountInput = document.getElementById('mortgage-amount');
    const mortgageTermInput = document.querySelector('.mortgage-term');
    const interestRateInput = document.querySelector('.interest-rate');
    const repaymentButton = document.querySelector('.repayment');
    const interestOnlyButton = document.querySelector('.interest-only');
    const calculateButton = document.querySelector('.calculate');
    const clearAllButton = document.getElementById('clearAll');
    const mortgageTypeContainer = document.querySelector('.mortgage-type-container');

    function mostrarError(elemento) {
        const container = elemento.closest('.mortgage-amount-container, .mortgage-term-container, .interest-rate-container, .mortgage-type-container');
        if (container) {
            container.classList.add('error');
            const errorMensaje = container.querySelector('.error-message') || container.nextElementSibling;
            if (errorMensaje && errorMensaje.classList.contains('error-message')) {
                errorMensaje.classList.add('visible');
            }
        }
    }

    function ocultarError(elemento) {
        const container = elemento.closest('.mortgage-amount-container, .mortgage-term-container, .interest-rate-container, .mortgage-type-container');
        if (container) {
            container.classList.remove('error');
            const errorMensaje = container.querySelector('.error-message') || container.nextElementSibling;
            if (errorMensaje && errorMensaje.classList.contains('error-message')) {
                errorMensaje.classList.remove('visible');
            }
        }
    }

    calculateButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const inputs = [mortgageAmountInput, mortgageTermInput, interestRateInput];
        inputs.forEach(input => {
            if (!input.value.trim()) {
                mostrarError(input);
            } else {
                ocultarError(input);
            }
        });

        if (!repaymentButton.classList.contains('selected') && !interestOnlyButton.classList.contains('selected')) {
            mostrarError(mortgageTypeContainer);
        } else {
            ocultarError(mortgageTypeContainer);
        }
    });

    clearAllButton.addEventListener('click', function() {
        const inputs = [mortgageAmountInput, mortgageTermInput, interestRateInput];
        inputs.forEach(input => {
            input.value = '';
            ocultarError(input);
        });
        repaymentButton.classList.remove('selected');
        interestOnlyButton.classList.remove('selected');
        ocultarError(mortgageTypeContainer);
    });

    [mortgageAmountInput, mortgageTermInput, interestRateInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                ocultarError(this);
            }
        });
    });

    repaymentButton.addEventListener('click', function() {
        this.classList.add('selected');
        interestOnlyButton.classList.remove('selected');
        ocultarError(mortgageTypeContainer);
    });

    interestOnlyButton.addEventListener('click', function() {
        this.classList.add('selected');
        repaymentButton.classList.remove('selected');
        ocultarError(mortgageTypeContainer);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mortgageAmountInput = document.getElementById('mortgage-amount');
    const mortgageTermInput = document.querySelector('.mortgage-term');
    const interestRateInput = document.querySelector('.interest-rate');
    const repaymentButton = document.querySelector('.repayment');
    const interestOnlyButton = document.querySelector('.interest-only');
    const calculateButton = document.querySelector('.calculate');
    const clearAllButton = document.getElementById('clearAll');
    const mortgageTypeContainer = document.querySelector('.mortgage-type-container');
    const resultadosLlenos = document.querySelector('.resultados-llenos');
    const preresultado = document.querySelector('.preresultado');
    const pagoMensual = document.getElementById('pago-mensual');
    const pagoTotal = document.getElementById('pago-total');

    function calcularHipoteca(monto, plazo, tasa, tipo) {
        const tasaMensual = tasa / 100 / 12;
        const plazoBimestres = plazo * 12;
        
        let pagoMensual;
        if (tipo === 'repayment') {
            pagoMensual = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazoBimestres)) / (Math.pow(1 + tasaMensual, plazoBimestres) - 1);
        } else {
            pagoMensual = monto * tasaMensual;
        }
        
        const totalPagado = pagoMensual * plazoBimestres;
        
        return {
            mensual: pagoMensual.toFixed(2),
            total: totalPagado.toFixed(2)
        };
    }

    function mostrarResultados(resultados) {
        pagoMensual.textContent = `£${resultados.mensual}`;
        pagoTotal.textContent = `£${resultados.total}`;
        preresultado.style.display = 'none';
        resultadosLlenos.style.display = 'block';
    }

    calculateButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const monto = parseFloat(mortgageAmountInput.value);
        const plazo = parseFloat(mortgageTermInput.value);
        const tasa = parseFloat(interestRateInput.value);
        const tipo = repaymentButton.classList.contains('selected') ? 'repayment' : 'interest-only';

        if (monto && plazo && tasa && (repaymentButton.classList.contains('selected') || interestOnlyButton.classList.contains('selected'))) {
            const resultados = calcularHipoteca(monto, plazo, tasa, tipo);
            mostrarResultados(resultados);
        } else {
            if (!monto) mostrarError(mortgageAmountInput);
            if (!plazo) mostrarError(mortgageTermInput);
            if (!tasa) mostrarError(interestRateInput);
            if (!repaymentButton.classList.contains('selected') && !interestOnlyButton.classList.contains('selected')) {
                mostrarError(mortgageTypeContainer);
            }
        }
    });

});
