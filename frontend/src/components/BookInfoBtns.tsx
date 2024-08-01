import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { NavigateFunction } from "react-router-dom";

interface bookInfoBtns {
  owner: boolean;
  deleteLogin: boolean;
  dispatchDelete: () => void;
  navigate: NavigateFunction;
  id: string;
  dispatchDrawer: (value: boolean) => void;
}

const BookInfoBtns: React.FC<bookInfoBtns> = ({
  owner,
  deleteLogin,
  dispatchDelete,
  navigate,
  id,
  dispatchDrawer,
}) => {
  const buttons1 = [
    <Button key="one" onClick={() => navigate(`/books/${id}/edit`)}>
      Edit
    </Button>,
    <Button key="two" onClick={() => dispatchDelete()}>
      Delete
    </Button>,
    <Button key="three" onClick={() => dispatchDrawer(true)}>
      View Review
    </Button>,
  ];

  const buttons2 = [
    <Button key="three" onClick={() => dispatchDrawer(true)}>
      View Review
    </Button>,
  ];
  return (
    <ThemeProvider theme={theme}>
      <>
        {!deleteLogin ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            {owner ? (
              <>
                <ButtonGroup size="small" aria-label="Small button group">
                  {buttons1}
                </ButtonGroup>
              </>
            ) : (
              <ButtonGroup size="small" aria-label="Large button group">
                {buttons2}
              </ButtonGroup>
            )}
          </Box>
        ) : (
          <LoadingButton
            size="small"
            loading={true}
            variant="contained"
            disabled
            style={{ marginTop: "10%", marginBottom: "1rem" }}
          >
            <span>disabled</span>
          </LoadingButton>
        )}
      </>
    </ThemeProvider>
  );
};

export default BookInfoBtns;
