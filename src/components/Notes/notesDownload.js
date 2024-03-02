import React from "react";
import { Button, Grid } from "@mui/material";
import { saveAs } from "file-saver"; // Import necessary library for file download (e.g., FileSaver.js)

const NotesDownload = ({ content, filename }) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };

  return (
    <Grid container justifyContent="center">
      <Button variant="contained" onClick={handleDownload}>
        Download Notes
      </Button>
    </Grid>
  );
};

export default NotesDownload;
