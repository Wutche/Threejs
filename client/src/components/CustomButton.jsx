/** @format */

const CustomButton = ({ type, title, handleClick, customStyles }) => {
	return (
		<button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}>
			{title}
		</button>
	);
};

export default CustomButton;
