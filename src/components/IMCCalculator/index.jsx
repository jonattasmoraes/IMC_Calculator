import './main.css'

import React, { Component } from 'react';

class IMCCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peso: '',
            altura: '',
            resultado: null,
        };
    }

    validarNumero = (input) => {
        return input.replace(/[^0-9.,]/g, '');
    };

    calcularIMC = () => {
        const { peso, altura } = this.state;
        if (!peso || !altura) {
            this.setState({ resultado: 'Preencha o peso e a altura corretamente.' });
            return;
        }

        const pesoFloat = parseFloat(this.validarNumero(peso).replace(',', '.'));
        const alturaCm = parseFloat(this.validarNumero(altura).replace(',', '.'));
        const alturaMetros = alturaCm / 100;
        const imc = pesoFloat / (alturaMetros * alturaMetros);

        let classificacao = '';
        let mensagem = '';

        if (imc < 18.5) {
            classificacao = 'Abaixo do peso';
            mensagem = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc < 24.9) {
            classificacao = 'Peso normal';
            mensagem = 'Peso normal';
        } else if (imc >= 25 && imc < 29.9) {
            classificacao = 'Sobrepeso';
            mensagem = 'Sobrepeso';
        } else if (imc >= 30 && imc < 34.9) {
            classificacao = 'Obesidade Grau I';
            mensagem = 'Obesidade Grau I';
        } else if (imc >= 35 && imc < 39.9) {
            classificacao = 'Obesidade Grau II';
            mensagem = 'Obesidade Grau II';
        } else {
            classificacao = 'Obesidade Grau III';
            mensagem = 'Obesidade Grau III';
        }

        this.setState({
            resultado: `Seu IMC é ${imc.toFixed(2)} - ${classificacao}`,
            mensagem,
        });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        const valorValido = this.validarNumero(value);
        const valorLimitado = valorValido.slice(0, 3);
        this.setState({ [name]: valorLimitado });
    };

    render() {
        const { mensagem } = this.state;
        const mensagemStyle = mensagem !== 'Peso normal' ? { color: 'red' } : {};

        return (
            <div className="IMCCalculator">
                <div className="IMCCalculatorContainer">
                    <h2>Calculadora de IMC</h2>
                    <div>
                        <label>Peso (kg):</label>
                        <input
                            type="text"
                            name="peso"
                            value={this.state.peso}
                            onChange={this.handleInputChange}
                            maxLength={3}
                        />
                    </div>
                    <div>
                        <label>Altura (cm):</label>
                        <input
                            type="text"
                            name="altura"
                            value={this.state.altura}
                            onChange={this.handleInputChange}
                            maxLength={3}
                        />
                    </div>
                    <button onClick={this.calcularIMC}>Calcular</button>
                    {this.state.resultado && (
                        <p style={mensagemStyle}>{this.state.resultado}</p>
                    )}
                </div>
            </div>
        );
    }
}

export default IMCCalculator;