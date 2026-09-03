var Lista = [];


function Gerar() {
    
    let n1 = document.getElementById("numero1").value;
    n1 = Number(n1);

    if (n1 < 1 || n1 > 10) {
        alert("Por favor, digite um número entre 1 e 10.");
        return;
    }

    const container = document.getElementById("resultado");
    container.innerHTML = "";


    if (n1 >= 1 && n1 <= 10) {
        for(let i = 1; i <= 10; i++) {
            let resultado = n1 * i;
            let linha = n1 + " x " + i + " = " + resultado;
            console.log(linha);
            
            const p = document.createElement("p");
            p.textContent = n1 + " x " + i + " = " + resultado;
            container.appendChild(p);
        } 
    }

}   