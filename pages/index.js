import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
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
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA}', {
              page_path: window.location.pathname,
            });
          `,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						!function(f,b,e,v,n,t,s)
						{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
						n.callMethod.apply(n,arguments):n.queue.push(arguments)};
						if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
						n.queue=[];t=b.createElement(e);t.async=!0;
						t.src=v;s=b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t,s)}(window, document,'script',
						'https://connect.facebook.net/en_US/fbevents.js');
						fbq('init', '${process.env.NEXT_PUBLIC_PIXEL}');
						fbq('track', 'PageView');
          `,
					}}
				/>
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_PIXEL}&ev=PageView&noscript=1" />`,
					}}
				/>
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
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Голландський аффінаж #3 з лимоном
							<span className={styles.price}>
								<b>49₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Святий Патрік #2
							<span className={styles.price}>
								<b>59₴</b>
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
								<b>39₴</b>
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
								<b>49₴</b>
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
								<b>59₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Дабл гуакамоле дог
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
							Груша
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Медуза
							<span className={styles.price}>
								<b>49₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Пляшечка 0,33 яблуко або смородина
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<div className={styles.attention}>
							<b>Бери одразу пляшку 750мл за 99₴ (Яблуко, Розе, Сухий)</b>
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
								<b>59₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Кесадилья XXL
							<span className={styles.price}>
								<b>69₴</b>
							</span>
						</p>
					</div>

					<div className={styles.pieBlock}>
						<h3 className={styles.pie}>пиріг.</h3>
						<p className={styles.attention}>По олдскулу</p>
						<p className={styles.product}>
							З куркою та сиром
							<span className={styles.price}>
								<b>69₴</b>
							</span>
						</p>
						<p className={styles.product}>
							З вишнею
							<span className={styles.price}>
								<b>69₴</b>
							</span>
						</p>
						<p className={styles.product}>
							Кальцоне з куркою або з грибами
							<span className={styles.price}>
								<b>39₴</b>
							</span>
						</p>
						<div className={styles.warning}>
							Більше сиру в хот-дог чи пиріг
							<b> 9₴</b>
						</div>
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
			<div className={styles.info}>
				<h3>Сигаретне меню/сигарети</h3>
				<i>**вміст смоли/нікотину, мг</i>
				<p>WINSTON BLUE 6/0,5**</p>
				<p>WINSTON EXPAND DUO 5/0,4**</p>
				<p>WINSTON XSTYLE BLUE 6/0,5**</p>
				<p>WINSTON XSTYLE SILVER 4/0,3**</p>
				<p>WINSTON XSPRESSION FRESH 5/0,4**</p>
				<p>WINSTON XSPRESSION PURPLE 5/0,4**</p>
				<p> WINSTON XSPRESSION SPARKLING MIX 5/0,4**</p>
				<p>WINSTON XSTYLE DUO GREEN 5/0,4**</p>
				<p>CAMEL BLUE 6/0,5**</p>
				<p>SOBRANIE GOLD 3/0,3**</p>
				<p>SOBRANIE EVOLVE GOLD 4/0,4**</p>
				<i>
					*Інформація про ціни на тютюнові вироби доступна в місці торгівлі
					Відповідно до закону України №71-VIII від 28.12.2014, продаж об'єктами
					господарювання роздрібної торгівлі підакцизних товарів, на які
					встановлюються максимально роздрібні ціни, не може здійснюватись за
					цінами, вищими за максимально роздрібні ціни, збільшені на суму
					акцизного податку з роздрібної торгівлі підакцизних товарів.
				</i>
			</div>
		</div>
	);
}
