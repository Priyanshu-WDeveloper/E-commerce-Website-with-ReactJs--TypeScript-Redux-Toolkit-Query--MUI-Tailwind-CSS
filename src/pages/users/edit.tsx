import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { Cancel, Camera } from "@mui/icons-material";
import { useFormik } from "formik";
// import { showError, showToast } from "../../helpers/toast";
// import Loader from "../../helpers/Loader";
// import { CommonBody } from "../../types/General";
// import { generateEncryptedKeyBody } from "../../utils/crypto";
// import { UploadMedia } from "../../utils/mediaUpload";
import * as Yup from "yup";
import {
  useEditUserByIdMutation,
  useLazyGetUserByIdQuery,
} from "../../services/users";
// import { isEnglishString } from "../../utils/validations";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../utils/enums";
import { useErrorToast, useToast } from "../../helpers/toasts/useToast";
import LoadingBackdrop from "../../components/Backdrop";
import { isEnglishString } from "../../utils/validations";

interface HidePermission {
  label: string;
  isView: boolean;
  isAdd: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

const UsersForm = () => {
  const navigate = useNavigate();
  const showError = useErrorToast();
  const showToast = useToast();
  const [updateprofile]: any = useEditUserByIdMutation();
  const [error, setError] = useState(false);
  const [country_code, setPhoneCode] = useState("+91");
  const [profile_picture, setProfilePicture] = useState<any>(null);
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state }: { state: { hidePermission: HidePermission } } =
    useLocation();
  const { id } = useParams();
  const userData = useAuth();

  // const handleImageUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const files: any = event.target.files;
  //   const file = files?.length ? files[0] : null;

  //   try {
  //     if (!file) {
  //       formik.setFieldValue("profile_picture", "");
  //       setProfilePicture("");
  //       return;
  //     }
  //     const allowedExtensions = ["png", "jpg", "jpeg"];
  //     const fileExtension = file.name.split(".").pop()?.toLowerCase();
  //     if (!allowedExtensions.includes(fileExtension || "")) {
  //       setIsLoading(false);
  //       showError("Invalid file format: only png, jpg images are allowed");
  //       return;
  //     }
  //     setIsLoading(true);
  //     // const res = await UploadMedia(file);

  //     console.log(res);

  //     if (res?.statusCode === 200) {
  //       formik.setFieldValue("profile_picture", res?.data);
  //       setProfilePicture(res?.data || "");
  //     } else {
  //       showError(res?.message);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     showError("Error uploading image. Please try again.");
  //   }
  //   setIsLoading(false);
  // };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      phone_no: "",
      // profile_picture: "",
      address: "",
      country_code: "+91",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        // .required("Email is required!")
        .matches(
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
          "Please enter valid email address!"
        ),
      firstName: Yup.string()
        // .required("First Name is required")
        .min(2, "Minimum 2 characters are required")
        .max(80, "Maximum 60 characters are allowed"),
      lastName: Yup.string()
        // .required("Last Name is required")
        .min(2, "Minimum 2 characters are required")
        .max(80, "Maximum 60 characters are allowed"),
      username: Yup.string()
        // .required("User Name is required")
        .min(2, "Minimum 2 characters are required")
        .max(80, "Maximum 60 characters are allowed"),
      phone_no: Yup.string()
        // .required("Phone number is required")
        .min(6, "Phone number must be at least 6 digits")
        .max(16, "Phone number must be at least 16 digits"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (!formik.isValid) return;
      try {
        setSubmitting(true);
        const countryCode = country_code?.includes("+")
          ? country_code
          : `+${country_code}`;

        let body: any = {
          email: values.email,
          firstName: values?.firstName,
          lastName: values?.lastName,
          username: values?.username,
          nationalNumber: values?.phone_no,
          countryCode: countryCode,
          phone: `${countryCode}${values.phone_no}`,
        };

        // if (profile_picture?.length) {
        //   body = {
        //     ...body,
        //     image: profile_picture,
        //   };
        // }

        // const encryptedBody = generateEncryptedKeyBody(body) as CommonBody;
        const response = await updateprofile({
          id: id,
          body: body,
        }).unwrap();
        if (response?.statusCode === 200) {
          showToast("User details updated successfully.");
          navigate("/manage-users");
        }
      } catch (error: any) {
        console.error(error);
        showError(error?.data?.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [getDataById] = useLazyGetUserByIdQuery();
  const getDataByIdList = async () => {
    try {
      const response = await getDataById({ id }).unwrap();
      console.log(response);

      if (response.statusCode == 200) {
        formik.setFieldValue("firstName", response?.data?.firstName || "");
        formik.setFieldValue("lastName", response?.data?.lastName || "");
        formik.setFieldValue("username", response?.data?.username || "");
        formik.setFieldValue("email", response?.data?.email || "");
        formik.setFieldValue("phone_no", response?.data?.nationalNumber);
        // formik.setFieldValue("profile_picture", response?.data?.image || "");
        setPhoneCode(response?.data?.countryCode || "+91");
        setPhoneDisplay(
          (response?.data?.countryCode || "") +
            (response?.data?.nationalNumber || "")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getDataByIdList();
  }, [id]);

  const handleChangePhone = (phone_no: any, country: any) => {
    // const phoneStr = typeof phone_no === "string" ? phone_no : "";

    formik.setFieldValue("phone_no", phone_no.replace(country.dialCode, ""));
    setPhoneCode(country.dialCode);
    setPhoneDisplay(phone_no);
  };

  // useEffect(()=>{
  //   if(userData?.role === ROLES.SUB_ADMIN){
  //      if(!state.hidePermission.isAdd   ){
  //       navigate('permission-denied')
  //      }
  //     }
  // },[state])
  if (isLoading) {
    <LoadingBackdrop />;
  }
  return (
    <div className="main_layout">
      {/* <Loader isLoad={isLoading} /> */}
      <div
        className="dashboard"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          className="mn_hdng"
          style={{
            fontSize: "20px",
            fontWeight: "800",
            letterSpacing: "0.5px",
          }}
        >
          Edit User Profile
        </h1>
        <Button
          className="h-[43px] px-4 py-1.5 text-[14px] font-bold tracking-[0.3px] shadow-none capitalize gap-1 rounded text-white bg-[#1d1d1d] rounded-[30px] hover:bg-[#0000002e] hover:text-[#1d1d1d]"
          onClick={() => {
            // navigate(window.location.pathname.split("/")?.[1]);
            navigate("/manage-users");
          }}
        >
          Back
        </Button>
      </div>
      <Card className="cards">
        <form
          onSubmit={(e) => {
            // if(!selectedPurpose)
            //   return;
            formik.handleSubmit(e);
          }}
        >
          <CardContent sx={{ p: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className="text-[14px] font-semibold text-black mb-1 tracking-[0.3px] leading-[1.2]">
                  Image
                </Typography>
                {/* {formik.values.profile_picture ? (
                  <div className="upload_image_preview">
                    <CardMedia
                      component="img"
                      image={formik.values.profile_picture}
                      alt="photo"
                    />
                    <Cancel
                      onClick={(e) => {
                        e.preventDefault();
                        setProfilePicture("");
                        formik.setFieldValue("profile_picture", "");
                      }}
                    />
                  </div>
                ) : (
                  <Box className="upload_image">
                    <label htmlFor="icon-button-file">
                      <Input
                        sx={{ display: "none" }}
                        id="icon-button-file"
                        type="file"
                        inputProps={{
                          accept: "image/png,image/jpeg",
                        }}
                        onChange={handleImageUpload}
                      />
                      <Button component="span" className="upload_image_btn">
                        <img
                          loading="lazy"
                          src="/static/images/user_placeholder.png"
                          alt=""
                        />
                        <Camera />
                      </Button>
                    </label>
                  </Box>
                )} */}
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography className="text-[14px] font-semibold text-black mb-1 tracking-[0.3px] leading-[1.2]">
                  First name
                </Typography>
                <TextField
                  hiddenLabel
                  type="text"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={(e) => {
                    if (!isEnglishString(e.target.value)) {
                      showError("Only alphabets allowed");
                      return;
                    }
                    if (e.target.value.length <= 50) formik.handleChange(e);
                    else showError("First name can't exceed 50 characters");
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName &&
                    formik.errors.firstName &&
                    typeof formik.errors.firstName === "string" &&
                    formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography className="text-[14px] font-semibold text-black mb-1 tracking-[0.3px] leading-[1.2]">
                  Last name
                </Typography>
                <TextField
                  hiddenLabel
                  type="text"
                  name="lastName"
                  variant="outlined"
                  fullWidth
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={(e) => {
                    if (!isEnglishString(e.target.value)) {
                      showError("Only alphabets allowed");
                      return;
                    }
                    if (e.target.value.length <= 50) formik.handleChange(e);
                    else showError("Last name can't exceed 50 characters");
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={
                    formik.touched.lastName &&
                    formik.errors.lastName &&
                    typeof formik.errors.lastName === "string" &&
                    formik.errors.lastName
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography className="text-[14px] font-semibold text-black mb-1 tracking-[0.3px] leading-[1.2]">
                  User name
                </Typography>
                <TextField
                  hiddenLabel
                  type="text"
                  name="username"
                  variant="outlined"
                  fullWidth
                  placeholder="User Name"
                  value={formik.values.username}
                  onChange={(e) => {
                    // if (!isEnglishString(e.target.value)) {
                    //   showError("Only alphabets allowed");
                    //   return;
                    // }
                    if (e.target.value == " ") return;
                    if (e.target.value.length <= 50) formik.handleChange(e);
                    else showError("User name can't exceed 50 characters");
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={
                    formik.touched.username &&
                    formik.errors.username &&
                    typeof formik.errors.username === "string" &&
                    formik.errors.username
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography className="text-[14px] font-semibold text-black mb-1 tracking-[0.3px] leading-[1.2]">
                  Email
                </Typography>
                <TextField
                  hiddenLabel
                  type="email"
                  name="email"
                  // disabled
                  variant="outlined"
                  fullWidth
                  // onMouseOver={(e: any) => {
                  //   e.target.style.cursor = "not-allowed";
                  // }}
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={
                    formik.touched.email &&
                    formik.errors.email &&
                    typeof formik.errors.email === "string" &&
                    formik.errors.email
                  }
                />
              </Grid>
              {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography className="text-[14px] font-semibold text-black mb-1 tracking-[0.3px] leading-[1.2]">Select Purpose</Typography>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    fullWidth
                    sx={{ backgroundColor: "white", maxHeight: "53px" }}
                    // className="select_div"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedPurpose}
                    // multiple
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                    displayEmpty
                    onChange={(e) => setSelectedPurpose(e.target.value)}
                  >
                    <MenuItem value={0} disabled>
                      Select
                    </MenuItem>
                    {purpose?.map((data: PurposeResponse) => (
                      <MenuItem value={data.id}>{data.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {error && !selectedPurpose && (
                  <Typography variant="caption" color="error">
                    Purpose is required
                  </Typography>
                )}
              </Grid> */}
              {/* <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography className="text-[14px] font-semibold text-black mb-1 tracking-[0.3px] leading-[1.2]">Address</Typography>
              <TextField
                hiddenLabel
                type="text"
                name="address"
                variant="outlined"
                fullWidth
                placeholder="Address"
                value={formik.values.address}
                onChange={(e)=>{
                  if(e.target.value.length<=100)
                  formik.handleChange(e);
                else
                showError("Address cant exceed 100 characters")

                }}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={(formik.touched.address && formik.errors.address && typeof formik.errors.address === 'string') && formik.errors.address}
              /> */}
              {/* {formik.touched.address && formik.errors.address && (
                <Typography variant="caption" color="error">
                  {formik.errors.address}
                </Typography>
              )} */}
              {/* </Grid> */}
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography className="text-[14px] font-semibold text-black mb-1 tracking-[0.3px] leading-[1.2]">
                  Phone number
                </Typography>
                <PhoneInput
                  country={"us"}
                  placeholder="0 (000) 000-000"
                  enableSearch={true}
                  inputStyle={{ width: "100%" }}
                  value={phoneDisplay}
                  // disabled
                  // onChange={(value) => formik.setFieldValue("phone_no", value)}
                  onChange={(phone_no, country) =>
                    handleChangePhone(phone_no, country)
                  }
                  onBlur={formik.handleBlur}
                  // isValid={!(formik.touched.phone_no && formik.errors.phone_no)}
                />
                {formik.touched.phone_no && formik.errors.phone_no && (
                  <Typography variant="caption" color="error">
                    Phone number is required
                  </Typography>
                )}
              </Grid>
            </Grid>
            <div className="form_btn">
              <Button
                size="large"
                type="submit"
                className="h-[43px] px-4 py-1.5 text-[14px] font-bold tracking-[0.3px] shadow-none capitalize gap-1 rounded text-white bg-[#1d1d1d] rounded-[30px] hover:bg-[#0000002e] hover:text-[#1d1d1d]"
                onClick={() => {
                  setError(true);
                }}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );

  {
    /*<div className="min-h-screen px-4 py-6 sm:px-8 md:px-16 bg-gray-50">
  //  Header 
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-xl font-extrabold tracking-wide text-gray-800">
      Edit User Profile
    </h1>
    <Button
      className="btn btn_primary"
      onClick={() => navigate("/manage-users")}
    >
      Back
    </Button>
  </div>

  // {/* Card Wrapper
  <Card className="rounded-xl shadow-md p-6">
    <form onSubmit={formik.handleSubmit}>
      <CardContent className="p-0">
        <Grid container spacing={2}>
          {/* First Name 
          <Grid item xs={12} md={6}>
            <Typography className="custom_label">First name</Typography>
            <TextField
              fullWidth
              hiddenLabel
              name="firstName"
              type="text"
              placeholder="First Name"
              variant="outlined"
              value={formik.values.firstName}
              onChange={(e) => {
                if (!isEnglishString(e.target.value)) {
                  showError("Only alphabets allowed");
                  return;
                }
                if (e.target.value.length <= 50) formik.handleChange(e);
                else showError("First name can't exceed 50 characters");
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={
                formik.touched.firstName &&
                typeof formik.errors.firstName === "string" &&
                formik.errors.firstName
              }
            />
          </Grid>

          {/* Last Name 
          <Grid item xs={12} md={6}>
            <Typography className="custom_label">Last name</Typography>
            <TextField
              fullWidth
              hiddenLabel
              name="lastName"
              type="text"
              placeholder="Last Name"
              variant="outlined"
              value={formik.values.lastName}
              onChange={(e) => {
                if (!isEnglishString(e.target.value)) {
                  showError("Only alphabets allowed");
                  return;
                }
                if (e.target.value.length <= 50) formik.handleChange(e);
                else showError("Last name can't exceed 50 characters");
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lastName && Boolean(formik.errors.lastName)
              }
              helperText={
                formik.touched.lastName &&
                typeof formik.errors.lastName === "string" &&
                formik.errors.lastName
              }
            />
          </Grid>

          {/* Username 
          <Grid item xs={12} md={6}>
            <Typography className="custom_label">Username</Typography>
            <TextField
              fullWidth
              hiddenLabel
              name="username"
              type="text"
              placeholder="User Name"
              variant="outlined"
              value={formik.values.username}
              onChange={(e) => {
                if (e.target.value === " ") return;
                if (e.target.value.length <= 50) formik.handleChange(e);
                else showError("Username can't exceed 50 characters");
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.username && Boolean(formik.errors.username)
              }
              helperText={
                formik.touched.username &&
                typeof formik.errors.username === "string" &&
                formik.errors.username
              }
            />
          </Grid>

          {/* Email 
          <Grid item xs={12} md={6}>
            <Typography className="custom_label">Email</Typography>
            <TextField
              fullWidth
              hiddenLabel
              name="email"
              type="email"
              placeholder="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email &&
                typeof formik.errors.email === "string" &&
                formik.errors.email
              }
            />
          </Grid>

          {/* Phone 
          <Grid item xs={12} md={6}>
            <Typography className="custom_label">Phone number</Typography>
            <PhoneInput
              country="us"
              enableSearch={true}
              inputStyle={{ width: "100%" }}
              value={phoneDisplay}
              onChange={(phone, country) =>
                handleChangePhone(phone, country)
              }
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone_no && formik.errors.phone_no && (
              <Typography className="text-sm text-red-600 mt-1">
                Phone number is required
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Submit Button 
        <div className="pt-6 flex justify-end">
          <Button
            type="submit"
            className="btn btn_primary"
            onClick={() => setError(true)}
          >
            Save
          </Button>
        </div>
      </CardContent>
    </form>
  </Card>
</div> 
*/
  }
};
export default UsersForm;
