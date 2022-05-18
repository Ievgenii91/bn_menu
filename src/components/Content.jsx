import Block from './Block';

const Content = ({ blocks }) => {
	return (
		<>
			{blocks.map((model) => (
				<Block data={model} key={model.id} />
			))}
		</>
	);
};

export default Content;
