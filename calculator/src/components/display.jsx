export default function Display(props){
	return (
		<div className="Display badge bg-dark font-monospace p-3">
			{props.children}
		</div>
	);
}