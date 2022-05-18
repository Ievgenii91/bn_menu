import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import Content from '../components/Content';

export default function Home({ products, blocks, categories }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>БІЛИЙ НАЛИВ меню</title>
				<meta name="description" content="БІЛИЙ НАЛИВ меню Житомир" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin={'true'}
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin={'true'}
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@1,400;1,600;1,700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<main className={styles.main}>
				<header>
					<Image alt="лого2" src="/bn-logo.png" width="100" height="200" />
					<Image
						className={styles.logo}
						alt="лого"
						src="/logo.svg"
						width="500"
						height="100"
					/>
				</header>
				<Content blocks={blocks} />
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
}

export async function getServerSideProps() {
	const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
	const host = process.env.HOST;
	const res = await fetch(
		`https://${host}/api/v1/categories?clientId=${clientId}`
	);
	const productsRes = await fetch(
		`https://${host}/api/v1/products?clientId=${clientId}`
	);

	const { data: categoriesFromServer } = await res.json();
	const { data: products } = await productsRes.json();

	if (!categoriesFromServer || !products) {
		return {
			notFound: true,
		};
	}

	const blocks = [];
	const availableProducts = products.filter((v) => v.available);

	const categories = categoriesFromServer.map((cat) => {
		const products = availableProducts
			.filter((v) => v.category === cat._id)
			.sort((a, b) => a.price - b.price);
		if (products.length) {
			const type = products[0].type;
			blocks.push({
				id: cat._id,
				blockName: cat.name,
				classes: cat.classes || '',
				description: cat.description,
				products,
				type,
				subCategories: cat.children,
				order: cat.order || 1,
			});
			return {
				...cat,
				type,
			};
		}
		return cat;
	});
	const filteredCategories = categories.filter(
		(cat) =>
			availableProducts.filter(({ category }) => category === cat._id).length >
			0
	);
	return {
		props: {
			categories: filteredCategories,
			products,
			blocks: blocks.sort((a, b) => (a.order > b.order ? 1 : -1)),
		}, // will be passed to the page component as props
	};
}
