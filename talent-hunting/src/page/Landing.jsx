import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";



const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Jobster Logo" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Let the power of AI help you · Find your dream job · Find the best
            talent · Jobster is an AI platform that matches the right people to
            the right jobs
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="Job Hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
