import '../styles/about.css'
import bgMain from '../assets/img/about-backgroung.jpg'
import member1 from '../assets/img/Member-1.jpg'
import member2 from '../assets/img/Member-2.jpg'
import member3 from '../assets/img/Member-3.jpg'
import member4 from '../assets/img/Member-4.jpg'
const About = () => {
    return (
        <div className="about">
            <div className="main-image">
                <h1>Designers, Thinkers & Collaborators</h1>
                <h2>Who we are</h2>
            </div>
            <div className="info">
                <h2>Inspired by technology we are creative team of amateurs from differrent parts of the world.</h2>
                <h3>Meet our team</h3>
                <div className="our-team">
                    <div>
                        <img src={member1} alt="" />
                        <h3>Shtono, Sr</h3>
                        <h4>Senior Full-Stack </h4>
                        <p>CEO and founder of the company, Shtono has more than 50 yeas experience in the world of programming.He is a model for his  younger and well motivated employees.</p>
                    </div>
                    <div>
                        <img src={member2} alt="" />
                        <h3>Shtono,Jr</h3>
                        <h4>Junior FrontEnd </h4>
                        <p>Our only Front-End member.He's been junior for 12 years now.Not the best talanted nor the most skilled dev but that's what we have.
                        He never stops learning new technologies.Strives to bring sense of simplicity and clarity.
                        </p>
                    </div>
                    <div>
                        <img src={member3} alt="" />
                        <h3>Shtono</h3>
                        <h4>FrontEnd Designer </h4>
                        <p>He Has seen the creative industry from many sides of the spectrum.He has very few projects none of which our clients agree with.</p>
                    </div>
                    <div>
                        <img src={member4} alt="" />
                        <h3>Shtono</h3>
                        <h4>Writer, Editor </h4>
                        <p>He is the driving force of our products.He writes content, articles and reviews that nobody reads.Tech nerd, passionate about PC hardware and pretty much all tech related.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;