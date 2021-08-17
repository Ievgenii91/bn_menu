import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';

const trackEndpoint = '/api/user?zone=';
const QR_SCAN_FREQUENCY_TIMEOUT = 60000; // 1 min

const getData = async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const storage = window.localStorage;
	const zone = urlParams.get('zone');

	const fetchData = async () => {
		storage.setItem('lastUpdated', new Date().toISOString());
		const response = await fetch(trackEndpoint + zone);
		return await response.json();
	};

	let lastUpdated = storage.getItem('lastUpdated');
	if (lastUpdated) {
		let currentTime = new Date(new Date().toISOString()).getTime();
		if (
			currentTime - new Date(lastUpdated).getTime() >
			QR_SCAN_FREQUENCY_TIMEOUT
		) {
			return await fetchData();
		} else {
			return new Promise.resolve(false);
		}
	} else {
		return await fetchData();
	}
};

export default function Home() {
	const { data, error } = useSWR(trackEndpoint, getData, {
		dedupingInterval: 60000,
	});

	return (
		<div className={styles.container}>
			<Head>
				<title>БІЛИЙ НАЛИВ меню</title>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap"
					rel="stylesheet"
				></link>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* <div className={styles.preHeader}>Привіт, грішнику! Усі наіменування клікабельні, можеш робити замовлення прямо з сайту.</div> */}
			<div className={styles.header}>
				<Image
					className={styles.logo}
					priority={true}
					src="/logo.png"
					alt="БІЛИЙ НАЛИВ"
					width={350}
					height={80}
				/>
			</div>
			<div className={styles.miniCart}>Моє замовлення</div>
			<main className={styles.main}>
				<div className={styles.side}>
					<div className={styles.oystersBlock}>
						<h3 className={styles.oysters}>устриці.</h3>
						<div className={styles.center}>
							<Image
								src="/oyster.png"
								priority={true}
								width={160}
								height={160}
								alt="устриці білий налив"
							/>
						</div>
						<p className={styles.product}>
							Fine de Claire #3 з лимоном
							<span className={styles.price}>
								<b>29₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Голландський аффінаж #3 з лимоном
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							пушка-граната: додай гранатовий соус
							<span className={styles.price}>
								<b>9₴</b>
							</span>
						</p>
					</div>
					<div className={styles.dogBlock}>
						<h3 className={styles.dogs}>хот-доги.</h3>
						<div className={styles.product}>
							Хот-дог класік
							<span className={styles.price}>
								<b>29₴</b>
							</span>
							<div className={styles.dogImage}>
								<Image
									src="/dog.png"
									width={100}
									height={100}
									alt="хот дог класичний білий налив"
								/>
							</div>
						</div>
						<p className={styles.product}>
							Дабл-дог класік
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Хот-дог у вершковому бріоші
							<span className={styles.price}>
								<b>59₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Дабл-дог у вершковому бріоші
							<span className={styles.price}>
								<b>69₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Гуакамоле дог
							<span className={styles.price}>
								<b>69₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Хот-дог БЛЮ ЧІЗ
							<span className={styles.price}>
								<b>69₴</b>
							</span>
						</p>
						<div className={styles.brioshImage}>
							<Image
								src="/briosh.png"
								width={180}
								height={180}
								alt="хот дог у бріоші білий налив"
							/>
						</div>
						<p className={styles.attention}>
							Хочеш вега ? Скажи касиру і ми приготуємо
						</p>
						<p className={styles.product}>
							Хот-дог блючіз
							<span className={styles.price}>
								<b>59₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Дабл-дог блючіз
							<span className={styles.price}>
								<b>69₴</b>
							</span>
						</p>
					</div>

					<div className={styles.ciderBlock}>
						<h3 className={styles.cider}>сидр.</h3>
						<div className={styles.product}>
							Яблучний
							<span className={styles.price}>
								<b>29₴</b>
							</span>
							<div className={styles.dogImage}>
								<Image
									src="/cider.png"
									width={130}
									height={130}
									alt="сидр білий налив"
								/>
							</div>
						</div>
						<p className={styles.product}>
							Розе
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Сухий
							<span className={styles.price}>
								<b>49₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Фраголіно
							<span className={styles.price}>
								<b>49₴</b>
							</span>
						</p>
						<div className={styles.attention}>
							<b>Бери одразу пляшку 99₴</b>
							<div>Не соромся міксувати з наливками</div>
						</div>
					</div>

					<div className={styles.nalivkaBlock}>
						<h3 className={styles.nalivka}>наливки.</h3>
						<div className={styles.nalivkaImage}>
							<Image
								src="/nalivka.png"
								width={180}
								height={180}
								alt="сидр білий налив"
							/>
						</div>
						<p className={styles.product}>
							Яблуко
							<span className={styles.price}>
								<b>29₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Смородина
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Спотика4ка
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<div className={styles.product}>
							Кальвадос
							<span className={styles.price}>
								<b>29₴</b>
							</span>
							<div className={styles.attention}>дуже міцний яблучний напій</div>
							<br></br>
							<div className={styles.attention}>
								Бери одразу пляшку:
								<div>0.2л - 79₴</div>
								<div>0.5л - 215₴</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.side}>
					<div className={styles.divider}></div>

					<div className={styles.coffeeBlock}>
						<h3 className={styles.coffee}>кава.</h3>
						<p className={styles.product}>
							Еспрессо/Американо
							<span className={styles.price}>
								<b>19₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Лате/Капучино
							<span className={styles.price}>
								<b>29₴</b>
							</span>
						</p>		
						<p className={styles.product}>
							Додай молока
							<span className={styles.price}>
								<b>5₴</b>
							</span>
						</p>
					</div>

					<div className={styles.cesaBlock}>
						<h3 className={styles.cesa}>кесадилья.</h3>
						<p className={styles.attention}>
							Мексиканський хот-дог у тортильї з ананасом та кукурудзою
						</p>
						<div className={styles.cesaImage}>
							<Image
								src="/cesa.png"
								width={100}
								height={100}
								alt="кесадилья білий налив"
							/>
						</div>
						<p className={styles.product}>
							Кесадилья
							<span className={styles.price}>
								<b>49₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Кесадилья XXL
							<span className={styles.price}>
								<b>59₴</b>
							</span>
						</p>
					</div>

					<div className={styles.pieBlock}>
						<h3 className={styles.pie}>пиріг.</h3>
						<p className={styles.attention}>По олдскулу</p>
						<p className={styles.product}>
							З куркою
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							З яблуком
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<div className={styles.warning}>
							Більше сиру в хот-дог чи пиріг
							<b> 9₴</b>
						</div>
					</div>

					<div className={styles.punchBlock}>
						<h3 className={styles.punch}>сендвіч.</h3>
						<p className={styles.product}>
							Сендвіч з норвезьким оселедцем (голландський)
							<span className={styles.price}>
								<b>59₴</b>
							</span>
						</p>
					</div>

					<p style={{ height: '20px' }}></p>

					<div className={styles.avoskaBlock}>
						<h3 className={styles.avoska}>авоськи.</h3>
						<p className={styles.product}>
							CLASSIC:
							<div>пляшка сидру 0,7л</div>
							<div>пляшка наливки 0,2л</div>
							<span className={styles.price}>
								<b>199₴</b>
							</span>
						</p>
						<p className={styles.product}>
							MAX:
							<div>пляшка сидру 0,7л</div>
							<div>2 пляшки наливки 0,2л і 0,5л</div>
							<span className={styles.price}>
								<b>299₴</b>
							</span>
						</p>
						<p className={styles.product}>
							ALL INCLUSIVE:
							<div>пляшка сидру 0,7л</div>
							<div>пляшка наливки 0,5л</div>
							<div>пляшка кальвадосу 0,2л</div>
							<span className={styles.price}>
								<b>299₴</b>
							</span>
						</p>
					</div>

					<div className={styles.nonalcoBlock}>
						<h3 className={styles.nonalco}>б/a.</h3>
						<p className={styles.product}>
							Лимонад
							<span className={styles.price}>
								<b>29₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Ігристе вино б/а
							<div className={styles.attention}>
								<div>150 мл - 49₴</div>
								<div>750 мл - 259₴</div>
							</div>
						</p>
						<p className={styles.product}>
							Бонаква
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Кола
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Чай
							<span className={styles.price}>
								<b>29₴</b>
							</span>
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
