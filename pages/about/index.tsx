import H1 from "@/components/reusables/typography/h1";
import React from "react";

const About = () => {
  return (
    <div className="w-full pt-24 flex flex-col items-center">
      <H1 fontBold={true}>Otentikator</H1>
      <div className="max-w-2xl">
        <p className="pt-3 font-normal">
          Otentikator is an open source app that offers a secure and convenient
          two-factor authentication solution for web-based applications. The app
          is designed to work similarly to Google Authenticator, but with the
          added benefit of running on a web-based version, making it easily
          accessible from anywhere.
        </p>
        <div className="pt-2 font-medium">
          Developed by{" "}
          <a
            href="https://github.com/mazkaaa"
            className="font-bold dark:border-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white dark:hover:bg-slate-200 dark:hover:text-slate-700 transition-all border-b border-dashed"
          >
            Azka
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
