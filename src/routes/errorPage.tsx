import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: unknown = useRouteError();
  document.title = "Error Page";

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h1">Error</Typography>
        <Typography>
          Sorry, an unexpected error has occurred.
          {error instanceof Error ? error.message : null}
        </Typography>

        <Link to="/">
          <Button variant="contained" startIcon={<ArrowBackIcon />}>
            Go to Home Page
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
