import { Group } from "@mui/icons-material";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
export default function OpenEaa() {
  const [eaaUrl, setEaaUrl] = useState();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setEaaUrl(
      "https://uidai.gov.in/images/commdoc/26_JAN_2023_Aadhaar_List_of_documents_English.pdf"
    );
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Eaaa Aggrement
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box>
            <Document file={eaaUrl}></Document>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button>Deny</Button>
            <Button>Approve</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
