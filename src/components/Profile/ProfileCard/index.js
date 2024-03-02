// import React, { useState, useEffect } from "react";
// import { useCookie } from "react-use";
// import Switch from "@mui/material/Switch";
// import TextField from "@mui/material/TextField";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import "./index.css";
// import DemoImage from "../../../assets/student-banner.svg";
// import { formatDate } from "@fullcalendar/core";

// const ProfileCard = () => {
//   const [loggedIn] = useCookie("maang");
//   const [isAllowPasswordChange, setIsAllowPasswordChange] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     phoneNum: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     profilePic: null,
//     Stud_course_details: [],
//   });
//   const [passwordFields, setPasswordFields] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editedPhoneNum, setEditedPhoneNum] = useState("");
//   const [editedFirstName, setEditedFirstName] = useState("");
//   const [editedLastName, setEditedLastName] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [updateStatus, setUpdateStatus] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//   };

//   const userData = JSON.parse(loggedIn);

//   const switchHandler = (event) => {
//     setIsAllowPasswordChange(event.target.checked);
//   };

//   const Capitalize = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };
//   // useEffect(() => {
//   //   if (loggedIn) {
//   //     const student_Id = userData?.user?.student?.id || 0;
//   //     fetch(
//   //       `${ApiBaseURL}user-management/profile/${student_Id}`,
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           Authorization: `Token ${JSON.parse(loggedIn).token}`,
//   //         },
//   //       }
//   //     )
//   //       .then((res) => {
//   //         return res.json();
//   //       })
//   //       .then((data) => {
//   //         const { user } = data || {
//   //           user: {},
//   //         };
//   //         setUserProfile({
//   //           phoneNum: data.phone_num,
//   //           firstName: user?.first_name || "",
//   //           lastName: user?.last_name || "",
//   //           email: user?.email || "",
//   //         });
//   //       })
//   //       .catch((err) => console.error(err));
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (loggedIn) {
//       fetch(
//         `${ApiBaseURL}user-management/studentprofileinfo/`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Token ${JSON.parse(loggedIn).token}`,
//           },
//         }
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           const {
//             user,
//             message,
//             Student_f_nm,
//             Student_l_nm,
//             Student_email,
//             Student_ph_no,
//             Student_profile_pic,
//             Stud_course_details,
//           } = data || {};

//           if (message === 1) {
//             setUserProfile({
//               firstName: Student_f_nm || "",
//               lastName: Student_l_nm || "",
//               email: Student_email || "",
//               phoneNum: Student_ph_no || "",
//               profilePic: Student_profile_pic || null,
//               Stud_course_details: Stud_course_details || [],
//             });
//           } else {
//             console.error("Invalid API response:", data);
//           }
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [loggedIn]);

//   console.log("USER PROFILE", userProfile);

//   const isStrongPassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handlePasswordChange = () => {
//     const { oldPassword, newPassword, confirmNewPassword } = passwordFields;

//     if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
//       openSnackbar("Please fill in all password fields.", "warning");
//       return;
//     }

//     if (newPassword !== confirmNewPassword) {
//       openSnackbar(
//         "New password and confirm password do not match.",
//         "warning"
//       );
//       return;
//     }
//     if (!isStrongPassword(newPassword)) {
//       openSnackbar(
//         "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.",
//         "warning"
//       );
//       return;
//     }

//     console.log("Data to be sent:", {
//       old_password: oldPassword,
//       password1: newPassword,
//       password2: confirmNewPassword,
//     });

//     const requestData = {
//       old_password: oldPassword,
//       password1: newPassword,
//       password2: confirmNewPassword,
//     };

//     const formDataString = new URLSearchParams(requestData).toString();
//     fetch(
//       "${ApiBaseURL}user-management/profilepasswordupdate/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Token ${JSON.parse(loggedIn).token}`,
//         },
//         body: formDataString,
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.message);
//         if (data.message === 1) {
//           openSnackbar("Password updated successfully!");
//           setPasswordFields({
//             oldPassword: "",
//             newPassword: "",
//             confirmNewPassword: "",
//           });
//         } else {
//           console.log("Password update failed:", data.message);
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const handleEditModalOpen = () => {
//     setEditedFirstName(userProfile.firstName);
//     setEditedLastName(userProfile.lastName);
//     setEditedPhoneNum(userProfile.phoneNum);
//     setIsEditModalOpen(true);
//   };

//   const handleEditModalClose = () => {
//     setIsEditModalOpen(false);
//   };

//   const handleSaveEditedPhoneNum = (e) => {
//     e.preventDefault();
//     const updatedData = {
//       first_name: editedFirstName,
//       last_name: editedLastName,
//       // phone_num: editedPhoneNum,
//     };

//     const formData = new FormData();
//     formData.append("first_name", updatedData.first_name);
//     formData.append("last_name", updatedData.last_name);

//     if (selectedImage) {
//       formData.append("profile_pic", selectedImage);
//     }

//     console.log("FORM DATA", formData);

//     fetch(
//       "${ApiBaseURL}user-management/profiledetailsupdate/",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Token ${JSON.parse(loggedIn).token}`,
//         },
//         body: formData,
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.message === 1) {
//           openSnackbar("Profile details updated successfully!");
//         } else {
//           console.log("Profile details update failed:", data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       })
//       .finally(() => {
//         setIsEditModalOpen(false);
//         window.location.reload();
//       });
//   };

//   const openSnackbar = (message, severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };
//   return (
//     <div className="card p-5 rounded-xl bg-white">
//       <div className="student-card relative">
//         <div className="student-info flex pb-5 border-b border-solid border-[#A4C3C8">
//           {console.log("Profile Picture Path:", userProfile.profilePic)}
//           {!userProfile?.profilePic ? (
//             <img
//               src={DemoImage}
//               alt="default profile"
//               style={{ width: "100px", height: "100px" }}
//             />
//           ) : (
//             <div className="w-[100px] me-4">
//               <img
//                 src={userProfile.profilePic}
//                 alt="student banner"
//                 style={{ width: "100px", height: "100px" }}
//               />
//             </div>
//           )}

//           <div className="info">
//             <span className="name">
//               {Capitalize(userProfile.firstName)}{" "}
//               {Capitalize(userProfile.lastName)}
//             </span>
//             {/* <span className="text-gray-600 text-base font-medium">Student</span> */}
//             <div className="address flex items-center">
//               <img
//                 src="/images/Profile/map.svg"
//                 alt="map icon"
//                 className="me-1"
//               />
//               <span>Location would be here</span>
//             </div>
//           </div>
//         </div>
//         <img
//           src="/images/Profile/pen.svg"
//           alt="edit icon"
//           onClick={handleEditModalOpen}
//         />
//       </div>
//       <div className="student-wrapper py-4">
//         <div className="flex flex-wrap -mx-3">
//           <div className="md:w-6/12 w-full px-3">
//             <div className="mb-3">
//               <span className="text-gray-600 text-lg font-normal">Email:</span>
//               <span className="text-gray-700 text-lg font-medium">
//                 {userProfile.email}
//               </span>
//             </div>
//             <div className="mb-3">
//               <span className="text-gray-600 text-lg font-normal">
//                 Phone Number:
//               </span>
//               <span className="text-gray-700 text-lg font-medium">
//                 {userProfile.phoneNum}
//               </span>
//             </div>
//             <div className="mb-3" style={{ alignItems: "flex-start" }}>
//               <span className="text-gray-600 text-lg font-normal">
//                 Change Password
//               </span>
//               <Switch
//                 checked={isAllowPasswordChange}
//                 size="small"
//                 onChange={switchHandler}
//               />
//             </div>
//           </div>
//           {/* <div className="right">
//   {userProfile.Stud_course_details.map((course, index) => (
//     <div mb-3={index} className="mb-3">
//       <span className="title">Course:</span>
//       <span className="value">{course.course}</span>
//       <div className="mb-3">
//         <span className="title">Start Date:</span>
//         <span className="value">{course.start_date}</span>
//       </div>
//       <div className="mb-3">
//         <span className="title">End Date:</span>
//         <span className="value">{course.end_date || "Ongoing"}</span>
//       </div>
//     </div>
//   ))}
// </div> */}
//           <div className="md:w-6/12 w-full px-3">
//             {userProfile.Stud_course_details.map((course, index) => (
//               <div mb-3={index} className="course-info">
//                 <div className="mb-3">
//                   <span className="text-gray-600 text-lg font-normal">
//                     Course:
//                   </span>
//                   <span className="value text-gray-700 text-lg font-medium">
//                     {course.course}
//                   </span>
//                 </div>
//                 <div className="mb-3">
//                   <span className="text-gray-600 text-lg font-normal">
//                     Start Date:
//                   </span>
//                   <span className="text-gray-700 text-lg font-medium">
//                     {course.start_date}
//                   </span>
//                 </div>
//                 <div className="mb-3">
//                   <span className="text-gray-600 text-lg font-normal">
//                     End Date:
//                   </span>
//                   <span className="text-gray-700 text-lg font-medium">
//                     {course.end_date || "Ongoing"}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {isAllowPasswordChange && (
//         <>
//           <div className="student-form">
//             <TextField
//               id="outlined-old-password-input"
//               label="Enter Current Password"
//               type="password"
//               autoComplete="current-password"
//               className="input-box w-full"
//               value={passwordFields.oldPassword}
//               onChange={(e) =>
//                 setPasswordFields({
//                   ...passwordFields,
//                   oldPassword: e.target.value,
//                 })
//               }
//             />
//           </div>
//           <div className="sm:w-4/12 w-full px-3">
//             <TextField
//               id="outlined-new-password-input"
//               label="Enter New Password"
//               type="password"
//               autoComplete="current-password"
//               className="input-box input-center w-full"
//               value={passwordFields.newPassword}
//               onChange={(e) =>
//                 setPasswordFields({
//                   ...passwordFields,
//                   newPassword: e.target.value,
//                 })
//               }
//             />
//           </div>
//           <div className="sm:w-4/12 w-full px-3">
//             <TextField
//               id="outlined-confirm-password-input"
//               label="Confirm New Password"
//               type="password"
//               autoComplete="current-password"
//               className="input-box w-full"
//               value={passwordFields.confirmNewPassword}
//               onChange={(e) =>
//                 setPasswordFields({
//                   ...passwordFields,
//                   confirmNewPassword: e.target.value,
//                 })
//               }
//             />
//           </div>
//           <div className="form-action">
//             <button onClick={handlePasswordChange}>Save & Update</button>
//           </div>
//           {/* {(passwordFields.oldPassword === "" ||
//             passwordFields.newPassword === "" ||
//             passwordFields.confirmNewPassword === "") && (
//             <Snackbar
//               open={true}
//               autoHideDuration={3000}
//               onClose={() => {}}
//               anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//               <MuiAlert severity="error" sx={{ width: "100%" }}>
//                 Please fill in all password fields.
//               </MuiAlert>
//             </Snackbar>
//           )} */}
//         </>
//       )}
//       <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <IconButton
//             sx={{
//               position: "absolute",
//               top: 0,
//               right: 0,
//               color: "action.active",
//             }}
//             onClick={handleEditModalClose}
//           >
//             <CloseIcon />
//           </IconButton>
//           {/* Use Grid for better alignment */}
//           <Grid
//             container
//             spacing={2}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Grid item xs={12}>
//               <TextField
//                 id="outlined-edited-firstName-input"
//                 label="First Name"
//                 type="text"
//                 fullWidth
//                 value={editedFirstName}
//                 onChange={(e) => setEditedFirstName(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 id="outlined-edited-lastName-input"
//                 label="Last Name"
//                 type="text"
//                 fullWidth
//                 value={editedLastName}
//                 onChange={(e) => setEditedLastName(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 id="outlined-edited-email-input"
//                 label="Email"
//                 type="email"
//                 fullWidth
//                 value={userProfile.email}
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 id="outlined-edited-phone-input"
//                 label="Edit Phone Number"
//                 type="text"
//                 fullWidth
//                 value={editedPhoneNum}
//                 // onChange={(e) => setEditedPhoneNum(e.target.value)}
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <label htmlFor="image-upload">
//                 <input
//                   accept="image/*"
//                   id="image-upload"
//                   type="file"
//                   style={{ display: "none" }}
//                   onChange={handleImageChange}
//                 />
//                 <Button
//                   component="span"
//                   fullWidth
//                   startIcon={<CloudUploadIcon />}
//                 >
//                   Upload Profile Picture
//                 </Button>
//               </label>
//             </Grid>
//             <Grid item xs={12}>
//               <Button fullWidth onClick={handleSaveEditedPhoneNum}>
//                 Edit
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Modal>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <MuiAlert
//           onClose={handleCloseSnackbar}
//           severity={snackbarSeverity} // Set the severity
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </MuiAlert>
//       </Snackbar>
//     </div>
//   );
// };

// export default ProfileCard;

import React, { useState, useEffect } from "react";
import { useCookie } from "react-use";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./index.css";
import DemoImage from "../../../assets/student-banner.svg";
import { formatDate } from "@fullcalendar/core";
import { ApiBaseURL } from "../../ApiConfig";

const ProfileCard = () => {
  const [loggedIn] = useCookie("maang");
  const [isAllowPasswordChange, setIsAllowPasswordChange] = useState(false);
  const [userProfile, setUserProfile] = useState({
    phoneNum: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePic: null,
    Stud_course_details: [],
  });
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedPhoneNum, setEditedPhoneNum] = useState("");
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const userData = JSON.parse(loggedIn);

  const switchHandler = (event) => {
    setIsAllowPasswordChange(event.target.checked);
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // useEffect(() => {
  //   if (loggedIn) {
  //     const student_Id = userData?.user?.student?.id || 0;
  //     fetch(
  //       `${ApiBaseURL}user-management/profile/${student_Id}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         const { user } = data || {
  //           user: {},
  //         };
  //         setUserProfile({
  //           phoneNum: data.phone_num,
  //           firstName: user?.first_name || "",
  //           lastName: user?.last_name || "",
  //           email: user?.email || "",
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, []);

  useEffect(() => {
    if (loggedIn) {
      fetch(
        `${ApiBaseURL}user-management/studentprofileinfo/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const {
            user,
            message,
            Student_f_nm,
            Student_l_nm,
            Student_email,
            Student_ph_no,
            Student_profile_pic,
            Stud_course_details,
          } = data || {};

          if (message === 1) {
            setUserProfile({
              firstName: Student_f_nm || "",
              lastName: Student_l_nm || "",
              email: Student_email || "",
              phoneNum: Student_ph_no || "",
              profilePic: Student_profile_pic || null,
              Stud_course_details: Stud_course_details || [],
            });
          } else {
            console.error("Invalid API response:", data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  // console.log("USER PROFILE", userProfile);

  const isStrongPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = () => {
    const { oldPassword, newPassword, confirmNewPassword } = passwordFields;

    if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
      openSnackbar("Please fill in all password fields.", "warning");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      openSnackbar(
        "New password and confirm password do not match.",
        "warning"
      );
      return;
    }
    if (!isStrongPassword(newPassword)) {
      openSnackbar(
        "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.",
        "warning"
      );
      return;
    }

    // console.log("Data to be sent:", {
    //   old_password: oldPassword,
    //   password1: newPassword,
    //   password2: confirmNewPassword,
    // });

    const requestData = {
      old_password: oldPassword,
      password1: newPassword,
      password2: confirmNewPassword,
    };

    const formDataString = new URLSearchParams(requestData).toString();
    fetch(
      `${ApiBaseURL}user-management/profilepasswordupdate/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
        body: formDataString,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.message);
        if (data.message === 1) {
          openSnackbar("Password updated successfully!");
          setPasswordFields({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        } else {
          // console.log("Password update failed:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEditModalOpen = () => {
    setEditedFirstName(userProfile.firstName);
    setEditedLastName(userProfile.lastName);
    setEditedPhoneNum(userProfile.phoneNum);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveEditedPhoneNum = (e) => {
    e.preventDefault();
    const updatedData = {
      first_name: editedFirstName,
      last_name: editedLastName,
      // phone_num: editedPhoneNum, // Remove phone_num from the data
    };

    const formData = new FormData();
    formData.append("first_name", updatedData.first_name);
    formData.append("last_name", updatedData.last_name);

    if (selectedImage) {
      formData.append("profile_pic", selectedImage);
    }

    // console.log("FORM DATA", formData);

    fetch(
      `${ApiBaseURL}user-management/profiledetailsupdate/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.message === 1) {
          openSnackbar("Profile details updated successfully!");
        } else {
          // console.log("Profile details update failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsEditModalOpen(false);
        window.location.reload();
      });
  };

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="card p-5 rounded-xl bg-white">
      <div className="student-card relative">
        <div className="student-info flex items-center pb-5 border-b border-solid border-[#A4C3C8">
          {/* {console.log("Profile Picture Path:", userProfile.profilePic)} */}
          {!userProfile?.profilePic ? (
            <img
              src={DemoImage}
              alt="default profile"
              style={{ width: "100px", height: "100px" }}
              className="me-4"
            />
          ) : (
            <div>
              <img
                src={userProfile.profilePic}
                alt="student banner"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )}

          <div className="info">
            <span className="name text-gray-700 text-xl font-semibold">
              {Capitalize(userProfile.firstName)}{" "}
              {Capitalize(userProfile.lastName)}
            </span>
            {/* <span className="title">Student</span> */}
            <div className="address flex">
              <img
                src="/images/Profile/map.svg"
                alt="map icon"
                className="me-1"
              />
              <span>Profile</span>
            </div>
          </div>
        </div>
        <img
          src="/images/Profile/pen.svg"
          alt="edit icon"
          onClick={handleEditModalOpen}
          className="absolute top-0 right-0"
        />
      </div>
      <div className="student-wrapper py-4">
        <div className="flex flex-wrap -mx-3">
          <div className="md:w-6/12 w-full px-3">
            <div className="mb-3">
              <span className="text-gray-600 text-base font-normal whitespace-nowrap">
                Email:
              </span>
              <span className="text-gray-700 text-base font-medium">
                {userProfile.email}
              </span>
            </div>
          </div>
          <div className="md:w-6/12 w-full px-3">
            <div className="mb-3">
              <span className="text-gray-600 text-base font-normal whitespace-nowrap">
                Phone Number:
              </span>
              <span className="text-gray-700 text-base font-medium">
                {userProfile.phoneNum}
              </span>
            </div>
          </div>
          <div className="w-full px-3">
            {userProfile.Stud_course_details.map((course, index) => (
              <div
                key={index}
                className="py-2 border-t border-1 border-solid border-gray-200"
              >
                <div className="flex flex-wrap -mx-3">
                  <div class="md:w-8/12 w-full px-3">
                    <div className="flex mb-2">
                      <span className="text-gray-600 text-base font-normal">
                        Course:
                      </span>
                      <span className="value text-gray-700 text-base font-medium ml-2">
                        {course.course}
                      </span>
                    </div>

                    <div className="flex mb-2">
                      <span className="text-gray-600 text-base font-normal whitespace-nowrap">
                        Project Title:
                      </span>
                      <span className="value text-gray-700 text-base font-medium ml-2">
                        {course.stud_project_assign[0].project_title &&
                        course.stud_project_assign[0].project_topic
                          ? `${course.stud_project_assign[0].project_topic} [${course.stud_project_assign[0].project_title}]`
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div class="md:w-4/12 w-full px-3">
                    <div>
                      <div className="flex mb-2">
                        <span className="text-gray-600 text-base font-normal whitespace-nowrap">
                          Start Date:
                        </span>
                        <span className="value text-gray-700 text-base font-medium ml-2 whitespace-nowrap">
                          {course.start_date}
                        </span>
                      </div>

                      <div className="flex mb-2">
                        <span className="text-gray-600 text-base font-normal whitespace-nowrap">
                          End Date:
                        </span>
                        <span className="value text-gray-700 text-base font-medium ml-2 whitespace-nowrap">
                          {course.end_date || "Ongoing"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mb-3 py-2 border-t border-1 border-solid border-gray-200">
              <span className="text-gray-600 text-base font-normal">
                Change Password
              </span>
              <Switch
                checked={isAllowPasswordChange}
                size="small"
                onChange={switchHandler}
              />
            </div>
          </div>
        </div>
      </div>
      {isAllowPasswordChange && (
        <>
          <div className="student-form">
            <div className="flex flex-wrap -mx-3 gap-y-3">
              <div className="sm:w-4/12 w-full px-3">
                <TextField
                  id="outlined-old-password-input"
                  label="Enter Current Password"
                  type="password"
                  autoComplete="current-password"
                  className="input-box w-full"
                  value={passwordFields.oldPassword}
                  onChange={(e) =>
                    setPasswordFields({
                      ...passwordFields,
                      oldPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sm:w-4/12 w-full px-3">
                <TextField
                  id="outlined-new-password-input"
                  label="Enter New Password"
                  type="password"
                  autoComplete="current-password"
                  className="input-box input-center w-full"
                  value={passwordFields.newPassword}
                  onChange={(e) =>
                    setPasswordFields({
                      ...passwordFields,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sm:w-4/12 w-full px-3">
                <TextField
                  id="outlined-confirm-password-input"
                  label="Confirm New Password"
                  type="password"
                  autoComplete="current-password"
                  className="input-box w-full"
                  value={passwordFields.confirmNewPassword}
                  onChange={(e) =>
                    setPasswordFields({
                      ...passwordFields,
                      confirmNewPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="form-action mt-4">
            <button
              onClick={handlePasswordChange}
              className="py-2 px-5 text-white text-base font-medium rounded-md bg-[#35C69D] hover:bg-till-950 duration-150"
            >
              Save & Update
            </button>
          </div>
          {/* {(passwordFields.oldPassword === "" ||
            passwordFields.newPassword === "" ||
            passwordFields.confirmNewPassword === "") && (
            <Snackbar
              open={true}
              autoHideDuration={3000}
              onClose={() => {}}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MuiAlert severity="error" sx={{ width: "100%" }}>
                Please fill in all password fields.
              </MuiAlert>
            </Snackbar>
          )} */}
        </>
      )}
      <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "action.active",
            }}
            onClick={handleEditModalClose}
          >
            <CloseIcon />
          </IconButton>
          {/* Use Grid for better alignment */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                id="outlined-edited-firstName-input"
                label="First Name"
                type="text"
                fullWidth
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-edited-lastName-input"
                label="Last Name"
                type="text"
                fullWidth
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-edited-email-input"
                label="Email"
                type="email"
                fullWidth
                value={userProfile.email}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-edited-phone-input"
                label="Edit Phone Number"
                type="text"
                fullWidth
                value={editedPhoneNum}
                // onChange={(e) => setEditedPhoneNum(e.target.value)}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="image-upload">
                <input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <Button
                  component="span"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Profile Picture
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth onClick={handleSaveEditedPhoneNum}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity} // Set the severity
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ProfileCard;
