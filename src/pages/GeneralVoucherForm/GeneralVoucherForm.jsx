import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  makeStyles,
  Box,
  Typography,
  InputBase,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import {} from "@material-ui/core";
import UploadtoCloud from "../../assets/UploadtoCloud.svg";

const formData = [
  {
    type: "option",
    label: "Select Option",
    name: "option",
    options: ["Option 1", "Option 2", "Option 3"],
    required: true,
  },
  {
    type: "text",
    label: "Name",
    name: "name",
    required: true,
  },
  {
    type: "textarea",
    label: "Description",
    name: "description",
    required: true,
  },
  {
    type: "radio",
    label: "Gender",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    required: true,
  },
  {
    type: "file",
    label: "Upload File",
    name: "file",
    required: true,
  },
  {
    type: "text",
    label: "Upload File",
    name: "filedrop",
    required: true,
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 100, // Set the minimum width of the table
    border: "0px",
  },
  form: {
    width: "40%",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
  },
});

const GeneralVoucherForm = () => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      ["filedrop"]: file,
    }));
    formValidation();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: files[0],
      }));
    } else {
      setFormValues((prevFormValues) =>
        Object.assign({}, prevFormValues, { [name]: value })
      );
    }
    formValidation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidation();
  };

  const formValidation = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    formData.forEach((field) => {
      if (field.required) {
        if (field.type === "option" && !formValues[field.name]) {
          errors[field.name] = "This field is required";
        } else if (field.type === "text" && !formValues[field.name]) {
          errors[field.name] = "This field is required";
        } else if (field.type === "textarea" && !formValues[field.name]) {
          errors[field.name] = "This field is required";
        } else if (field.type === "file" && (!formValues[field.name] || !files)) {
          errors[field.name] = "Please select a file";
        } else if (field.name === "filedrop" &&
        field.type === "text" &&
        (!formValues[field.name] || !file)) {
          errors[field.name] = "Please select a file";
        } else if (!formValues[field.name]) {
          errors[field.name] = "Please select an option";
        }
      }
    });

    return errors;
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>
            {formData.map((field) => (
              <TableRow>
                <TableCell>
                  <label className={classes.label}>{field.label}:</label>
                </TableCell>
                <TableCell>
                  {field.type === "option" && (
                    <Select
                      //   label={field.label}
                      name={field.name}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      //   error={!!errors[field.name]}
                      helperText={errors[field.name]}
                    >
                      <MenuItem value="">Select an option</MenuItem>
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  {field.type === "text" && (
                    <TextField
                      type="text"
                      //   label={field.label}
                      name={field.name}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      //   error={!!errors[field.name]}
                      //   helperText={errors[field.name]}
                    />
                  )}
                  {field.type === "textarea" && (
                    <TextField
                      multiline
                      rows={4}
                      //   label={field.label}
                      name={field.name}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      //   error={!!errors[field.name]}
                      //   helperText={errors[field.name]}
                    />
                  )}
                  {field.type === "radio" &&
                    field.options.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        name={field.name}
                        checked={formValues[field.name] === option.value}
                        onChange={handleChange}
                        // error={!!errors[field.name]}
                      />
                    ))}
                  {field.type === "file" && (
                    <TextField
                      //   label={field.label}
                      name={field.name}
                      type={field.type}
                      onChange={handleChange}
                      //   error={!!errors[field.name]}
                      //   helperText={errors[field.name]}
                      InputLabelProps={
                        field.type === "file" ? { shrink: true } : {}
                      }
                      InputProps={
                        field.type === "file" ? { accept: "image/*" } : {}
                      }
                    />
                  )}
                  {field.type === "text" && field.name === "filedrop" && (
                    <Box
                      {...getRootProps({
                        className: "dropzone",
                      })}
                      border={
                        isDragActive
                          ? "2px dashed #2d8ae0"
                          : "2px dashed transparent"
                      }
                      sx={{
                        padding: "3rem",
                        marginTop: "1rem",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <input {...getInputProps()} />
                      <Box
                        border={"2px dashed "}
                        sx={{
                          padding: "3rem",
                          marginTop: "1rem",
                          textAlign: "center",
                          "&:hover": { cursor: "pointer" },
                          borderColor: "#2d8ae0",
                        }}
                      >
                        <Box
                          component="img"
                          src={UploadtoCloud}
                          sx={{
                            position: "absolute",
                            left: "15%",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "10px",
                            color: "#6B7A99",
                            cursor: "pointer",
                            "&:hover": {
                              color: "blue",
                            },
                          }}
                        >
                          Drag & Drop upload or browse to choose a file
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "8px",
                            color: "#676767",
                            textAlign: "center",
                          }}
                        >
                          Supported format: JPEG, PNG, XLSX
                        </Typography>
                      </Box>
                      <Box sx={{ marginBottom: "2rem" }}>
                        <InputBase
                          placeholder={
                            file?.path ? file?.path : "No file selected"
                          }
                          name={field.name}
                          type={field.type}
                          sx={{
                            border: "1px solid #2d8ae0",
                            borderRadius: "4px",
                            padding: "0.5rem",
                            width: "70%",
                          }}
                          inputProps={{
                            style: {
                              color: "#2d8ae0",
                            },
                          }}
                          endAdornment={
                            <IconButton
                              aria-label="clear input"
                              onClick={() => {
                                setFile([]);
                                formValidation();
                              }}
                              style={{ color: "#2d8ae0" }}
                            >
                              <Delete />
                            </IconButton>
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  {errors[field.name] && (
                    <span style={{ color: "red" }}>{errors[field.name]}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default GeneralVoucherForm;
