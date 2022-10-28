function CalcButton_getClasses(value){
	return "CalcButton btn btn-warning" + (
		value === '0' ? " CalcButton-double" : ""
	);
}

export default function CalcButton(props){
	return(
		<button onClick={() => props.onClick(props.value)} className={CalcButton_getClasses(props.value)}>
			{props.value}
		</button>
	);
}