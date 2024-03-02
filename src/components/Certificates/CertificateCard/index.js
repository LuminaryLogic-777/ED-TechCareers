import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useCookie } from "react-use";
import jsPDF from "jspdf";
// import format from "date-fns";
import { Grid } from "@mui/material";
import ReportTemplate from "../ReportTemplate";
import { format } from "date-fns";
import { DUMMY_CERTIFICATES } from "../../../utils/index";
import { ApiBaseURL } from "../../ApiConfig";

const tags = ["Interview Preparation Course", "Course Name 2", "Course Name 3"];

const CertificateCard = () => {
  const isAllowdFilter = false;
  const reportTemplateRef = useRef(null);
  const [tag, setTag] = useState("Interview Preparation Course");
  const [loggedIn] = useCookie("maang");
  const [certificates, setCertificates] = useState([]);
  const [info, setInfo] = useState();
  const [studName, setStudName] = useState("");
  const userData = JSON.parse(loggedIn);

  useEffect(() => {
    if (loggedIn) {
      fetch(
        `${ApiBaseURL}course-management/list-certificates`,
        {
          headers: {
            Authorization: `Token ${userData.token}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const certificateList =
            data && data.length > 0 ? data : DUMMY_CERTIFICATES;
          setCertificates(certificateList);

          //set student full name for certificate
          const first_name = userData?.user?.first_name || "";
          const last_name = userData?.user?.last_name || "";
          setStudName(`${first_name} ${last_name}`);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const Tags = () => {
    return (
      <>
        <div className="certificate-tags">
          {tags.map((tagName) => (
            <div
              key={tagName}
              className={tagName === tag ? "active-tag" : ""}
              onClick={() => setTag(tagName)}
            >
              <span>{tagName}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
      orientation: "l",
    });

    doc.setFont("Inter-Regular", "normal");
    doc.html(reportTemplateRef.current, {
      margin: [0, 20, 0, 25],
      async callback(doc) {
        await doc.save("maang-certificate");
      },
    });
  };

  const Layout = ({
    children,
    isDisabled,
    message,
    certificateYear,
    isShowDownloadCTA = false,
  }) => {
    if (isDisabled) {
      return (
        <div className="certificate-disabled">
          <div className="certificate-disabled-content">
            <img src="/images/Practice/lock.svg" alt="lock icon" />
            <span>{message}</span>
          </div>
          <div className="certificate-disabled-footer">
            {isShowDownloadCTA && (
              <button disabled>
                <img
                  src="/images/Certificates/download.svg"
                  alt="download icon"
                />
                Download
              </button>
            )}
          </div>
          {children}
        </div>
      );
    }

    return (
      <div className="certificate-open">
        <div className="certificate-open-footer">
          <button
            onClick={() => {
              setInfo({
                //name: userData?.user?.username || "", //old value get
                name: studName,
                message,
                certificateYear,
              });
              handleGeneratePdf();
            }}
          >
            <img
              src="/images/Certificates/download.svg"
              alt="download icon"
              className="pr-1"
            />
            Download
          </button>
        </div>
        {children}
      </div>
    );
  };

  return (
    <>
      {isAllowdFilter && <Tags />}

      <div className="certificate-box">
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {certificates &&
            certificates.length > 0 &&
            certificates.map((item, idx) => {
              const {
                course_name,
                end_date,
                is_show_download_action = true,
              } = item;
              const certificateYear = format(new Date(end_date), "MMMM yyyy");
              return (
                <Grid item xs={6} key={idx}>
                  <Layout
                    message={course_name}
                    isDisabled={!end_date}
                    certificateYear={certificateYear}
                    isShowDownloadCTA={is_show_download_action}
                  >
                    <div className="certificate-card"></div>
                  </Layout>
                </Grid>
              );
            })}
        </Grid>
      </div>
      <div className="report-template-pdf">
        <div ref={reportTemplateRef}>
          <ReportTemplate info={info} />
        </div>
      </div>
    </>
  );
};

export default CertificateCard;
