const Footer = () => {

  return (
    <div className="footer">
      <div className="container">
        <div className="info">
          <p>Garage <span><i className="far fa-copyright"></i> 2020</span> </p>
        </div>
        <div className="links">

          <a href="https://www.youtube.com/" target="_blank">
            <i className="fab fa-youtube fa-3x"></i>
          </a>

          <a href="https://www.facebook.com/shtono.kuzmanov/" target="_blank">
            <i className="fab fa-facebook fa-3x"></i>
          </a>

          <a href="https://github.com/Shtono" target="_blank">
            <i className="fab fa-github fa-3x"></i>
          </a>

          <a href="https://www.linkedin.com/" target="_blank">
            <i className="fab fa-linkedin fa-3x"></i>
          </a>
        </div>
      </div>
    </div>

  );
}

export default Footer;