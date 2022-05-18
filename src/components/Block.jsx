import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Block.module.css';
import Image from 'next/image';

const getClasses = (classes) => classes.split(' ').map((v) => styles[v]);

const Block = ({ data }) => {
	return (
		<>
			{data.classes.includes('asset') && (
				<img src={`/${data.classes}.png`} alt="txt" />
			)}
			<section
				className={classNames(styles.block, ...getClasses(data.classes))}
			>
				<h2 className={styles.heading}>
					{data.blockName}{' '}
					{data.classes.includes('fresh') && (
						<Image src={'/asset_4.png'} alt="fresh" width="20" height="20" />
					)}
				</h2>
				{data.description && (
					<p className={styles.description}>{data.description}</p>
				)}
				{data.products.map((model, index) => {
					return (
						<>
							<p
								key={index}
								className={classNames(
									styles.name,
									...getClasses(model.additionalText)
								)}
							>
								{model.additionalText.includes('new') && (
									<span className={styles.new}>
										<Image
											src="/asset_2.png"
											alt="new"
											width="30"
											height="50"
										/>
									</span>
								)}
								{model.additionalText.includes('love') && (
									<span className={styles.love}>
										<Image
											src="/asset_1.png"
											alt="new"
											width="20"
											height="20"
										/>
									</span>
								)}
								{model.name}
								<span className={styles.price}> {model.price}₴</span>
							</p>
							<span className={styles.description}>{model.description}</span>
						</>
					);
				})}
			</section>
		</>
	);
};

export default Block;
