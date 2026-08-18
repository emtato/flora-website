import {useState} from 'react'
import profilePhoto from './assets/Flora Li Profile Photo.jpeg'
import './App.css'

const services = [
    {
        number: '01',
        title: 'Sell with confidence',
        copy: 'Thoughtful positioning, polished presentation, and clear guidance from pricing through closing.',
        link: 'Discuss selling',
    },
    {
        number: '02',
        title: 'Find the right home',
        copy: 'A focused search shaped around your priorities, with candid advice at every viewing and offer.',
        link: 'Start your search',
    },
    {
        number: '03',
        title: 'Commercial & investment',
        copy: 'Practical support for investors, business owners, and clients exploring commercial opportunities.',
        link: 'Explore opportunities',
    },
]

const steps = [
    ['Listen', 'We start with your priorities, timing, and the outcome that matters most.'],
    ['Plan', 'You receive a clear, considered strategy tailored to the market and your goals.'],
    ['Move', 'From negotiation to closing, every detail is handled with calm, responsive care.'],
]

const googleReviewsUrl = 'https://www.google.com/maps/place/Flora+Li,+MBA+%26+MCNE,+Broker/@43.8448436,-79.3600894,915m/data=!3m2!1e3!4b1!4m6!3m5!1s0x882b431ae463bb11:0x7b3a8a30d93b53d1!8m2!3d43.8448436!4d-79.3575145!16s%2Fg%2F11m86mgcgv?entry=ttu'

const reviewCaptureDate = new Date('2026-08-17T12:00:00-04:00')
const dayInMilliseconds = 24 * 60 * 60 * 1000

const approximateReviewDate = (amount: number, unit: 'month' | 'year') => {
    const unitLength = unit === 'month' ? 30 : 365
    const earliestDaysAgo = amount * unitLength
    const latestDaysAgo = (amount + 1) * unitLength
    const midpointDaysAgo = (earliestDaysAgo + latestDaysAgo) / 2

    return new Date(reviewCaptureDate.getTime() - midpointDaysAgo * dayInMilliseconds)
}

const formatReviewAge = (publishedAt: Date, edited = false) => {
    const elapsedDays = Math.max(1, Math.floor((Date.now() - publishedAt.getTime()) / dayInMilliseconds))
    let amount: number
    let unit: string

    if (elapsedDays < 7) {
        amount = elapsedDays
        unit = 'day'
    } else if (elapsedDays < 30) {
        amount = Math.floor(elapsedDays / 7)
        unit = 'week'
    } else if (elapsedDays < 365) {
        amount = Math.floor(elapsedDays / 30)
        unit = 'month'
    } else {
        amount = Math.floor(elapsedDays / 365)
        unit = 'year'
    }

    const relativeTime = amount === 1 ? `a ${unit} ago` : `${amount} ${unit}s ago`
    return edited ? `Edited ${relativeTime}` : relativeTime.charAt(0).toUpperCase() + relativeTime.slice(1)
}

const googleReviews = [
    {
        name: 'June Lin',
        publishedAt: approximateReviewDate(1, 'month'),
        stars: 5,
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJENRwKDqX4uFqAmecOHoKZfH3nOrEms8ximjBVKkFkq0MczA=w72-h72-p-rp-mo-br100',
        profile: 'https://www.google.com/maps/contrib/115219943899367060479/reviews?hl=en',
        text: "Before we even signed the agreement, Flora took the time to show us comparable homes and different renovation examples, which really helped us understand the market and clarify our direction. What stood out most was her calm and thoughtful approach — she didn't impose her own opinion but instead guided with practical insights and respect for our preferences. It makes sellers feel a part of the team, working together toward the same goal. I firmly believe that with Flora's guidance and support, we will succeed in selling our house.",
    },
    {
        name: '李勃',
        publishedAt: approximateReviewDate(3, 'month'),
        stars: 5,
        avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVD35Yz8-2T2FcnLE23AcoXy1EEFIkFr83uL19UGLGjjMQb8Hqg=w72-h72-p-rp-mo-br100',
        profile: 'https://www.google.com/maps/contrib/113682394976551149366/reviews?hl=en',
        text: 'Flora was an exceptional realtor throughout our home-buying process. She was professional, knowledgeable, responsive, and genuinely committed to helping us find the right property. Her guidance made the experience feel much less stressful…',
    },
    {
        name: 'Cindy Yin',
        publishedAt: approximateReviewDate(4, 'month'),
        stars: 5,
        avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVub1QUWXGCaFg8TsJscZXiAkPTWn2NuwSBMeeNKVOUHuNsb-7-=w72-h72-p-rp-mo-br100',
        profile: 'https://www.google.com/maps/contrib/105398611751789630615/reviews?hl=en',
        text: 'Working with Flora to buy a Toronto home was an outstanding experience from start to finish. She consistently went above and beyond, especially when it came to accommodating last-minute home viewings and navigating incredibly tight offer…',
    },
    {
        name: 'Synthia Zhuang',
        publishedAt: approximateReviewDate(8, 'month'),
        stars: 5,
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLPTrHsi1dGtJq1cKS20IK94PfFLn7SECJVNBLPNC048dNcMA=w72-h72-p-rp-mo-br100',
        profile: 'https://www.google.com/maps/contrib/103907373342516682973/reviews?hl=en',
        text: 'Flora is super professional and diligent. You get nothing to worry about with her service.',
    },
    {
        name: 'xtina f',
        publishedAt: approximateReviewDate(10, 'month'),
        edited: true,
        stars: 5,
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKtrEh58ZTZT_B0wErE4di-ZCDokxPD120XBRZehUm4UXeRLQ=w72-h72-p-rp-mo-br100',
        profile: 'https://www.google.com/maps/contrib/107406503577916727081/reviews?hl=en',
        text: 'Flora is an extremely knowledgeable and professional real estate agent. She is very patient, understanding, and will advocate on behalf of her clients. We are so grateful that we have found her. She is highly recommended and if ever we need to find another property, we will definitely go with Flora again!',
    },
    {
        name: 'Bo Gao',
        publishedAt: approximateReviewDate(1, 'year'),
        stars: 5,
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKepVjwTOreTKcy6UfQV6o3dRm_qW6uzs1_DuD9hGKoafXmS7S8=w72-h72-p-rp-mo-ba12-br100',
        profile: 'https://www.google.com/maps/contrib/109035245576500095650/reviews?hl=en',
        text: "Flora is an exceptional real estate agent! She was instrumental in helping us sell our condo, and we couldn't be more grateful. Her extensive knowledge of the market, excellent communication skills, and impressive network of potential…",
    },
]

function App() {
    const [menuOpen, setMenuOpen] = useState(false)
    const closeMenu = () => setMenuOpen(false)

    return (
        <div className="site-shell">
            <header className="site-header">
                <a className="brand" href="#top" aria-label="Flora Li, home">
                    <span className="brand-mark">FL</span>
                    <span className="brand-copy">
            <strong>Flora Li</strong>
            <small>Broker · MBA · MCNE</small>
          </span>
                </a>
                <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-nav"
                        onClick={() => setMenuOpen((open) => !open)}>
                    <span>{menuOpen ? 'Close' : 'Menu'}</span><i aria-hidden="true"/>
                </button>
                <nav id="site-nav" className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation">
                    <a href="#about" onClick={closeMenu}>About</a>
                    <a href="#services" onClick={closeMenu}>Services</a>
                    <a href="#approach" onClick={closeMenu}>Approach</a>
                    <a href="#contact" onClick={closeMenu}>Contact</a>
                    <a className="nav-call" href="tel:+19054668776" onClick={closeMenu}>Call Flora</a>
                </nav>
            </header>

            <main id="top">
                <section className="hero-section" aria-labelledby="hero-title">
                    <div className="hero-copy">
                        <p className="eyebrow"><span/> Real estate, personally guided</p>
                        <h1 id="hero-title">Your next move,<br/><em>made thoughtfully.</em></h1>
                        <p className="hero-intro">Residential buying and selling, commercial real estate, and investment
                            guidance across Markham and the Greater Toronto Area.</p>
                        <div className="hero-actions">
                            <a className="button button-dark" href="tel:+19054668776">Let’s talk <span
                                aria-hidden="true">↗</span></a>
                            <a className="text-link" href="#services">Explore services <span aria-hidden="true">↓</span></a>
                        </div>
                        <div className="hero-trust">
                            <div><strong>2025</strong><span>Ovation Award</span></div>
                            <div><strong>2024</strong><span>Gold Award</span></div>
                            <div><strong>2022 / 2023</strong><span>President Award</span></div>
                            <div><strong>2021</strong><span>Platinum Award</span></div>
                            <div><strong>MCNE</strong><span>Negotiation Expertise</span></div>
                            <div><strong>MBA</strong><span>Business Insight</span></div>

                        </div>
                    </div>
                    <div className="hero-portrait">
                        <div className="portrait-frame">
                            <img src={profilePhoto} alt="Flora Li, real estate broker"/>
                            <p className="portrait-note"><span>Flora Li</span> Broker · MBA · MCNE</p>
                        </div>
                        <p className="vertical-note">Professional expertise · Personal attention</p>
                    </div>
                </section>

                <div className="service-ribbon" aria-label="Core real estate services">
                    <span>Sell</span><i>◆</i><span>Buy</span><i>◆</i><span>Invest</span><i>◆</i><span>Lease</span>
                </div>

                <section className="about-section section-pad" id="about">
                    <div className="section-label">01 · Meet Flora</div>
                    <div className="about-heading"><h2>Expertise you can trust.<br/>Care you can feel.</h2></div>
                    <div className="about-copy">
                        <p className="lead">Real estate is never just about a property. It’s about what comes next for
                            you.</p>
                        <p>Flora brings accomplished negotiation, business insight, and a steady, personal approach to
                            every client relationship. Whether you’re moving or evaluating an investment, you’ll
                            always know what’s happening, why it matters, and what comes next.</p>
                        <a className="inline-link" href="mailto:flora.fang.li@gmail.com">Email Flora <span
                            aria-hidden="true">↗</span></a>
                    </div>
                </section>

                <section className="services-section" id="services" aria-labelledby="services-title">
                    <div className="services-top section-pad">
                        <div className="section-label light">02 · How I can help</div>
                        <div><p className="kicker">Residential & commercial</p><h2 id="services-title">A clear path
                            for<br/><em>every move.</em></h2></div>
                    </div>
                    <div className="service-list">
                        {services.map((service) => (
                            <article className="service-card" key={service.number}>
                                <span className="service-number">{service.number}</span>
                                <h3>{service.title}</h3>
                                <p>{service.copy}</p>
                                <a href="tel:+19054668776"
                                   aria-label={`${service.link} by calling Flora`}>{service.link} <span
                                    aria-hidden="true">↗</span></a>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="approach-section section-pad" id="approach">
                    <div className="section-label">03 · The approach</div>
                    <div className="approach-content">
                        <p className="kicker">Calm, clear, considered</p>
                        <h2>Good decisions start<br/>with a good conversation.</h2>
                        <div className="steps">
                            {steps.map(([title, copy], index) => (
                                <article className="step" key={title}><span>0{index + 1}</span>
                                    <div><h3>{title}</h3><p>{copy}</p></div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="credentials-section">
                    <div className="credentials-copy">
                        <p className="kicker">Experience that shows</p>
                        <h2>Award-winning service, grounded in trust.</h2>
                        <div className="credentials-body">
                            <div className="award-grid" aria-label="Awards and credentials">
                                <div><strong>Ovation Award</strong><span>2025</span></div>
                                <div><strong>Gold Award</strong><span>2024</span></div>
                                <div><strong>President Award</strong><span>2022 & 2023</span></div>
                                <div><strong>Platinum Award</strong><span>2021</span></div>
                                <div><strong>MCNE</strong><span>Negotiation expertise</span></div>
                                <div><strong>MBA</strong><span>Business insight</span></div>
                            </div>

                            <aside className="reviews-panel" id="reviews" aria-labelledby="reviews-title">
                                <div className="reviews-heading">
                                    <div>
                                        <span className="google-wordmark"><i>G</i> Google reviews</span>
                                        <h3 id="reviews-title">What clients are saying.</h3>
                                    </div>
                                    <a className="reviews-all-link" href={googleReviewsUrl} target="_blank"
                                       rel="noreferrer">All reviews on Google ↗</a>
                                </div>

                                <div className="reviews-track" aria-label="Six recent Google reviews">
                                    {googleReviews.map((review, index) => (
                                        <article className="review-card" key={review.name}>
                                            <div className="review-author">
                                                <a href={review.profile} target="_blank" rel="noreferrer">
                                                    <img src={review.avatar} alt={`${review.name} Google profile`}
                                                         loading="lazy" referrerPolicy="no-referrer"/>
                                                </a>
                                                <div>
                                                    <a href={review.profile} target="_blank"
                                                       rel="noreferrer">{review.name}</a>
                                                    <time
                                                        dateTime={review.publishedAt.toISOString()}>{formatReviewAge(review.publishedAt, review.edited)}</time>
                                                </div>
                                                <span
                                                    className="review-number">{String(index + 1).padStart(2, '0')}</span>
                                            </div>
                                            <div className="stars"
                                                 aria-label={`${review.stars} out of 5 stars`}>{'★'.repeat(review.stars)}</div>
                                            <blockquote>{review.text}</blockquote>
                                            <a className="review-source" href={googleReviewsUrl} target="_blank"
                                               rel="noreferrer">
                                                View on Google <span aria-hidden="true">↗</span>
                                            </a>
                                        </article>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                <section className="contact-section section-pad" id="contact">
                    <div className="contact-title">
                        <p className="eyebrow"><span/> Start a conversation</p>
                        <h2>Thinking about<br/>your next move?</h2>
                        <p>Tell Flora what you have in mind. No pressure: just straightforward advice.</p>
                    </div>
                    <div className="contact-details">
                        <a className="contact-line"
                           href="tel:+19054668776"><span>Mobile</span><strong>905.466.8776</strong><i
                            aria-hidden="true">↗</i></a>
                        <a className="contact-line"
                           href="weixin://dl/profile/?florali0956"><span>WeChat ID</span><strong>FloraLi0956</strong><i
                            aria-hidden="true">↗</i></a>
                        <a className="contact-line"
                           href="mailto:flora.fang.li@gmail.com"><span>Email</span><strong>Flora.Fang.Li@gmail.com</strong><i
                            aria-hidden="true">↗</i></a>
                        <a className="contact-line" href="https://www.linkedin.com/in/florafangli/" target="_blank"
                           rel="noreferrer"><span>Professional profile</span><strong>LinkedIn</strong><i
                            aria-hidden="true">↗</i></a>

                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <div className="footer-brand"><span className="brand-mark light-mark">FL</span>
                    <div><strong>Flora Li</strong><span>Real Estate Broker</span></div>
                </div>
                <div className="footer-address"><span>Bay Street Group Inc. Brokerage</span><span>8300 Woodbine Ave, Suite 500, Markham, ON L3R 9Y7</span><a
                    href="mailto:flora.fang.li@gmail.com">flora.fang.li@gmail.com</a></div>
                <div className="footer-side"><a href="#top">Back to top
                    ↑</a><span>© {new Date().getFullYear()} Flora Li</span></div>
            </footer>
        </div>
    )
}

export default App
