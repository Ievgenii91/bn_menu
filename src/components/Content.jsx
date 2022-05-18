import Block from './Block';

const Content = ({ blocks }) => {
	return (
		<>
			{blocks.map((model, index) => (
				<Block data={model} key={index} />
			))}
		</>
	);
};

export default Content;
