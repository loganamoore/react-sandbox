import React, {useState} from "react";
import Display from './display';
import CalcButton from "./calcButton";

import './calc.css';

export default function Calc(props){
	const [buttons, setButtons] = useState([
		'CC', '+/-', '%', '/',
		'7', '8', '9', '*',
		'4', '5', '6', '-',
		'1', '2', '3', '+',
		'0', '.', '='
	]);

	const [display, setDisplay] = useState('Calculator');
	const [register, setRegister] = useState(0);
	const [operator, setOperator] = useState('=');
	const [fractionCounter, setFractionCounter] = useState(0);

	function Calc_handleButton(value){
		// Initialize the display.
		if(display == 'Calculator')
			setDisplay(0);

		// Handle all number presses.
		if(value >= '0' && value <= '9'){
			let number = parseInt(value);

			// Correct direction if adding to negative number.
			if(display < 0)
				number *= -1;

			// Check if there is a decimal place.
			if(fractionCounter){
				setDisplay((previousDisplay) => previousDisplay + (number / Math.pow(10, fractionCounter)));
				
				// increment the fraction counter (one place smaller)
				setFractionCounter((previousFractionCounter) => previousFractionCounter + 1);
			}
			else
				setDisplay((previousDisplay) => previousDisplay * 10 + number);

			return;
		}

		// Handle all operators.
		switch(value){
			// Clear the calculator.
			case 'CC':
				setDisplay(0);
				setRegister(0);
				setOperator('=');
				break;

			// Invert between positive and negative.
			case '+/-':
				setDisplay((previousDisplay) => previousDisplay * -1);
				break;

			// Set the decimal place.
			case '.':
				// Ignore if it already exists.
				if(fractionCounter > 0)
					return;
				
				// Get it started.
				setFractionCounter(1);
				break;

			case '=':
				setDisplay((previousDisplay) => eval(register + operator + previousDisplay));
				setOperator('=');
				setFractionCounter(0);
				break;

			default:
				if(operator != '=')
					setRegister((previousRegister) => eval(previousRegister + operator + display));
				else
					setRegister(display);

				setOperator(value);
				setFractionCounter(0);
				setDisplay(0);
				break;
		}
		
	};

	return (
		<div className="Calc-wrapper bg-dark">
			<div className="Calc bg-light p-2 m-3">
				<Display>{display}</Display>
				{ 
					buttons.map(( val, idx ) => (
						<CalcButton key={idx} value={val} onClick={Calc_handleButton} />
					))
				}
			</div>
		</div>
	);
}