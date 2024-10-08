import "./home.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import ProjectsComponent from "../../components/ProjectsComponent";
import AcademyComponent from "../../components/AcademyComponent";
import ParticlesBackground from "../../components/ParticlesBackground";
import { Context } from "../../context/Context";
import { topStarting } from "../../components/Header";
import ServicesCard from "../services/ServicesCard";
import axios from "axios";
import Svg from "./Svg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.7, // 50% of the element is visible
    triggerOnce: true, // Trigger only once
  });
  //context for language
  const context = useContext(Context);

  const language = context.language && context.language;
  const [projects, setProjects] = useState([]);
  const [projectsLength, setProjectsLength] = useState(0);
  //this might be a problem
  useEffect(() => {
    const imgElements = document.querySelectorAll("img");
    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages += 1;
      if (loadedImages === imgElements.length) {
        setLoading(false);
      }
    };

    imgElements.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      imgElements.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8000/api/projects?limit=3").then((res) => {
      setProjects(res.data.projects);
      setProjectsLength(res.data.totalProjects);
    });
  }, []);

  if (!context) {
    <Loader />;
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <ParticlesBackground />
      <main className="landing center">
        <div className="container">
          <div className="center opavity-animation flex-direction">
            {context.selectedLang === "english" ? (
              <h1>
                welcome to
                <span className="inside-span"> blue elite tech </span>
                company
              </h1>
            ) : context.selectedLang === "arabic" ? (
              <h1>
                مرحبًا بكم في شركة
                <span className="inside-span"> blue elite tech </span>
              </h1>
            ) : (
              <h1>
                Kurdish
                <span className="inside-span"> blue elite tech </span>
                company
              </h1>
            )}
            <p>{language.landing && language.landing.landing_p}</p>
            <div className="flex">
              <Link onClick={topStarting} to={`/contact_us`} className="btn2 ">
                {language.landing && language.landing.first_button}
                <i className="fa-solid fa-phone"></i>
              </Link>
              <Link
                to={`/join_us`}
                onClick={topStarting}
                className="btn center"
              >
                {language.landing && language.landing.second_button}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <main className="center body-color wrap">
        <div className="container">
          <div className="title">
            <h1
              data-fill={
                language.about_home && language.about_home.about_header
              }
              className="title body-color"
            >
              {language.about_home && language.about_home.about_header}
            </h1>
          </div>
        </div>
        <div className="container flex about-company">
          <div>
            <div className="relative">
              <div>
                <h2>
                  {language.about_home && language.about_home.first_h1}{" "}
                  <span> Blue ELite Tech</span>
                </h2>
                <h3>{language.about_home && language.about_home.first_p}</h3>
              </div>
              <div>
                <h2> {language.about_home && language.about_home.second_h1}</h2>
                <h3>{language.about_home && language.about_home.second_p}</h3>
              </div>
              <div className="before">
                <h2> {language.about_home && language.about_home.third_h1}</h2>
                <h3>{language.about_home && language.about_home.third_p}</h3>
              </div>
            </div>

            <Link
              to={"/contact_us"}
              onClick={topStarting}
              className="btn d-block"
            >
              {language.about_home && language.about_home.about_btn}
            </Link>
          </div>
          <div
            ref={ref}
            className={`${inView ? "slide-up-animation" : ""}  flex-100 center`}
          >
            <div className={` ${inView && "svg-active"}  flex svg `}>
              <div className=" animation-image">
                <Svg className="svg-image" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <main className="center section-color home-services">
        <div className="container">
          <div className="title">
            <h1
              data-fill={
                language.services && language.services.sevices_home_header
              }
              className="title section-color"
            >
              {language.services && language.services.sevices_home_header}
            </h1>
          </div>
          <div className="services grid-3">
            <ServicesCard>
              <ServicesCard.Body>
                <ServicesCard.Body.Icon>
                  <i className="fa-solid fa-laptop-code"></i>
                </ServicesCard.Body.Icon>
                <ServicesCard.Body.Title>
                  {language.services && language.services.desktop_header}
                </ServicesCard.Body.Title>
                <ServicesCard.Body.Paragraph>
                  {language.services && language.services.desktop_p}
                </ServicesCard.Body.Paragraph>
              </ServicesCard.Body>
              <ServicesCard.Bottom>
                <ServicesCard.Bottom.StartedLink
                  className="started"
                  title={
                    language.services && language.services.button_getStarted
                  }
                  state={language.services && language.services.desktop_header}
                />
                <ServicesCard.Bottom.Details
                  title={language.services && language.services.details}
                />
              </ServicesCard.Bottom>
            </ServicesCard>

            <ServicesCard>
              <ServicesCard.Body>
                <ServicesCard.Body.Icon>
                  <i className="fa-solid fa-mobile-screen-button"></i>
                </ServicesCard.Body.Icon>
                <ServicesCard.Body.Title>
                  {language.services && language.services.mobile_header}
                </ServicesCard.Body.Title>
                <ServicesCard.Body.Paragraph>
                  {language.services && language.services.mobile_p}
                </ServicesCard.Body.Paragraph>
              </ServicesCard.Body>
              <ServicesCard.Bottom>
                <ServicesCard.Bottom.StartedLink
                  className="started"
                  title={
                    language.services && language.services.button_getStarted
                  }
                  state={language.services && language.services.mobile_header}
                />
                <ServicesCard.Bottom.Details
                  title={language.services && language.services.details}
                />
              </ServicesCard.Bottom>
            </ServicesCard>

            <ServicesCard>
              <ServicesCard.Body>
                <ServicesCard.Body.Icon>
                  <i className="fa-brands fa-chrome"></i>
                </ServicesCard.Body.Icon>
                <ServicesCard.Body.Title>
                  {language.services && language.services.websites_header}
                </ServicesCard.Body.Title>
                <ServicesCard.Body.Paragraph>
                  {language.services && language.services.websites_p}
                </ServicesCard.Body.Paragraph>
              </ServicesCard.Body>
              <ServicesCard.Bottom>
                <ServicesCard.Bottom.StartedLink
                  className="started"
                  title={
                    language.services && language.services.button_getStarted
                  }
                  state={language.services && language.services.websites_header}
                />
                <ServicesCard.Bottom.Details
                  title={language.services && language.services.details}
                />
              </ServicesCard.Bottom>
            </ServicesCard>

            <ServicesCard>
              <ServicesCard.Body>
                <ServicesCard.Body.Icon>
                  <i className="fa-solid fa-cloud"></i>
                </ServicesCard.Body.Icon>
                <ServicesCard.Body.Title>
                  {language.services && language.services.server_header}
                </ServicesCard.Body.Title>
                <ServicesCard.Body.Paragraph>
                  {language.services && language.services.server_p}
                </ServicesCard.Body.Paragraph>
              </ServicesCard.Body>
              <ServicesCard.Bottom>
                <ServicesCard.Bottom.StartedLink
                  className="started"
                  title={
                    language.services && language.services.button_getStarted
                  }
                  state={language.services && language.services.server_header}
                />
                <ServicesCard.Bottom.Details
                  title={language.services && language.services.details}
                />
              </ServicesCard.Bottom>
            </ServicesCard>

            <ServicesCard>
              <ServicesCard.Body>
                <ServicesCard.Body.Icon>
                  <i className="fa-solid fa-network-wired"></i>
                </ServicesCard.Body.Icon>
                <ServicesCard.Body.Title>
                  {language.services && language.services.local_header}
                </ServicesCard.Body.Title>
                <ServicesCard.Body.Paragraph>
                  {language.services && language.services.local_p}
                </ServicesCard.Body.Paragraph>
              </ServicesCard.Body>
              <ServicesCard.Bottom>
                <ServicesCard.Bottom.StartedLink
                  className="started"
                  title={
                    language.services && language.services.button_getStarted
                  }
                  state={language.services && language.services.local_header}
                />
                <ServicesCard.Bottom.Details
                  title={language.services && language.services.details}
                />
              </ServicesCard.Bottom>
            </ServicesCard>
          </div>
          <Link to={"/services"} onClick={topStarting} className="btn">
            {language.services && language.services.button_seeAllServices}
          </Link>
        </div>
      </main>
      {projectsLength >= 1 && (
        <main className="body-color center">
          <div className="container">
            <div className="title">
              <h1
                className="title body-color"
                data-fill={
                  language.projects && language.projects.projects_home_header
                }
              >
                {language.projects && language.projects.projects_home_header}
              </h1>
            </div>
            <ProjectsComponent data={projects && projects} />

            <Link
              onClick={topStarting}
              to={"/our_projects"}
              className="btn home-projects"
            >
              {language.projects && language.projects.btn_allProjects}
            </Link>
          </div>
        </main>
      )}
      <AcademyComponent
        classStyle={`${projectsLength < 1 ? "body-color" : "section-color"}`}
      />
    </>
  );
};

export default Home;
