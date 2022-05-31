import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Footer() {
  const language = useSelector((state) => state.root.language);

  const [supports, setSupports] = useState([]);
  const [community, setCommunity] = useState([]);
  const [guest, setGuest] = useState([]);
  const [intro, setIntro] = useState([]);
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    setSupports({
      title: language.FooterSupport,
      data: [
        language.FooterHelpCentert,
        language.FooterSafetyInformation,
        language.FooterSupportingPeople,
        language.FooterResponse,
        language.FooterReport,
      ],
    });
    setCommunity({
      title: language.FooterCommunity,
      data: [
        language.FooterDisaster,
        language.FooterSupportAfghan,
        language.FooterCombatingt,
      ],
    });
    setGuest({
      title: language.FooterHosting,
      data: [
        language.FooterTryHosting,
        language.FooterAirCover,
        language.FooterExplore,
        language.FooterVisit,
        language.FooterHostResponsibly,
      ],
    });
    setIntro({
      title: language.FooterAbout,
      data: [
        language.FooterNewsroom,
        language.FooterLearn,
        language.FooterLetter,
        language.FooterCareers,
        language.FooterInvestors,
      ],
    });
    setPolicy([
      language.FooterPrivacy,
      language.FooterTerms,
      language.FooterSitemap,
    ]);
  }, [language]);

  return (
    <div className="  w-full flex flex-col justify-end flex-1 bg-gray-100 dark:bg-gray-800">
      <div className="md:container mx-auto lg:px-20 md:px-10 px-5">
        <div className="  border-b-[1px] py-10 flex flex-wrap justify-between sm:text-left text-center">
          <div className="lg:w-1/4 sm:w-1/2 w-full p-2  px-2">
            <h5 className="font-bold">{supports?.title}</h5>
            <ul className="mt-2">
              {supports?.data?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="my-2 font-light cursor-pointer hover:text-blue-600 transition-all ease-linear duration-100"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:w-1/4 sm:w-1/2 w-full p-2  px-2">
            <h5 className="font-bold">{community?.title}</h5>
            <ul className="mt-2">
              {community?.data?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="my-2 font-light cursor-pointer hover:text-blue-600 transition-all ease-linear duration-100"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:w-1/4 sm:w-1/2 w-full p-2  px-2">
            <h5 className="font-bold">{guest?.title}</h5>
            <ul className="mt-2">
              {guest?.data?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="my-2 font-light cursor-pointer hover:text-blue-600 transition-all ease-linear duration-100"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:w-1/4 sm:w-1/2 w-full p-2  px-2">
            <h5 className="font-bold">{intro?.title}</h5>
            <ul className="mt-2">
              {intro?.data?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="my-2 font-light cursor-pointer hover:text-blue-600 transition-all ease-linear duration-100"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className=" flex py-5 justify-between ">
          <div className="flex w-full flex-wrap items-center px-2 ">
            <div className="sm:w-auto sm:text-left text-center w-full">
              <span>© 2022 Duy Thinh.</span>
            </div>
            <div className="sm:w-auto sm:justify-start w-full flex justify-center">
              {policy?.map((item, index) => {
                return (
                  <div className="flex items-center">
                    <span className="align-middle mx-2">.</span>
                    <div
                      key={index}
                      className="font-light  hover:text-blue-600 transition-all ease-linear duration-100 cursor-pointer"
                    >
                      {item}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
